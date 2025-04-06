const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

// Mapea tipos TypeScript a tipos de campos Shopify
function mapTsTypeToShopifyType(tsType) {
  if (tsType.includes('boolean')) return 'checkbox';
  if (tsType.includes('number')) return 'number';
  if (tsType.includes('string')) return 'text';
  return 'text';
}

// Extrae las props de una interfaz
function parsePropsFromFile(tsxPath, interfaceName) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(tsxPath);
  const interfaceDec = sourceFile.getInterface(interfaceName);
  if (!interfaceDec) return [];

  return interfaceDec.getProperties().map((prop) => ({
    name: prop.getName(),
    type: prop.getType().getText(),
    shopifyType: mapTsTypeToShopifyType(prop.getType().getText()),
    defaultValue: '',
  }));
}

// Estructura Shopify schema
function mapPropsToShopifySchema(componentName, propsArray) {
  return {
    name: componentName,
    settings: propsArray.map((prop) => ({
      type: prop.shopifyType,
      id: prop.name,
      label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
      default: prop.defaultValue,
    })),
    blocks: [],
    presets: [
      {
        name: componentName,
        category: 'Custom',
        blocks: [],
      },
    ],
  };
}

// Genera contenido Liquid + schema
function createLiquidFile(componentName, schemaObj, isSection) {
  const cssFile = `${componentName.toLowerCase()}.css`;

  const styleBlock = `
{%- style -%}
.${componentName.toLowerCase()} {
  padding: 20px;
}
{%- endstyle -%}`;

  const liquidLogic = isSection
    ? `{%- liquid
  assign title = section.settings.title
-%}`
    : '';

  const html = `
<!-- ${componentName} -->
${isSection ? `<div class="${componentName.toLowerCase()} section-{{ section.id }}">` : `<div class="${componentName.toLowerCase()}">`}
  ${isSection ? '{{ title }}' : ''}
</div>`;

  return `
{{ '${cssFile}' | asset_url | stylesheet_tag }}
${styleBlock}
${liquidLogic}
${html}

{% schema %}
${JSON.stringify(schemaObj, null, 2)}
{% endschema %}
`;
}

// Crea archivos para un componente
function generateComponentFiles(category, componentName, propsArray) {
  const isSection = category !== 'atoms';
  const shopifyFolder = isSection ? 'sections' : 'snippets';
  const componentLower = componentName.toLowerCase();
  const schemaObj = mapPropsToShopifySchema(componentName, propsArray);

  const liquidContent = createLiquidFile(componentName, schemaObj, isSection);

  const liquidPath = path.resolve(__dirname, `../${shopifyFolder}/${componentLower}.liquid`);
  const scssPath = path.resolve(__dirname, `../assets/${componentLower}.css`);

  // Liquid
  fs.writeFileSync(liquidPath, liquidContent, 'utf8');

  // CSS
  if (!fs.existsSync(scssPath)) {
    fs.writeFileSync(
      scssPath,
      `.${componentLower} {\n  /* estilos base para ${componentName} */\n}\n`,
      'utf8'
    );
  }

  console.log(`✅ ${componentName} generado en ${shopifyFolder}`);
}

// Recorre cada categoría (atoms, molecules, organisms)
function processCategory(categoryDir) {
  const category = path.basename(categoryDir);
  const components = fs
    .readdirSync(categoryDir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((dir) => dir.name);

  components.forEach((componentName) => {
    const tsxPath = path.join(categoryDir, componentName, `${componentName}.tsx`);
    const interfaceName = `${componentName}Props`;

    if (fs.existsSync(tsxPath)) {
      try {
        const propsArray = parsePropsFromFile(tsxPath, interfaceName);
        generateComponentFiles(category, componentName, propsArray);
      } catch (error) {
        console.error(`❌ Error en ${componentName}: ${error.message}`);
      }
    } else {
      console.warn(`⚠️ No se encontró ${componentName}.tsx en ${categoryDir}`);
    }
  });
}

// MAIN
const componentsDir = path.resolve(__dirname, '../components');
const categoriesToProcess = ['atoms', 'molecules', 'organisms'];

categoriesToProcess.forEach((category) => {
  const categoryDir = path.join(componentsDir, category);
  if (fs.existsSync(categoryDir)) {
    processCategory(categoryDir);
  } else {
    console.warn(`⚠️ No existe la categoría: ${category}`);
  }
});
