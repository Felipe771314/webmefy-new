// generate-shopify-schema.js
const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

// Mapea tipos TypeScript a campos de Shopify
function mapTsTypeToShopifyType(tsType) {
  if (tsType.includes('boolean')) return 'checkbox';
  if (tsType.includes('number')) return 'number';
  if (tsType.includes('string[]')) return 'blockArray';
  return 'text';
}

// Convierte nombres a formato legible para Shopify
function formatLabel(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

// Extrae props desde archivo .tsx
function parsePropsFromFile(tsxPath, interfaceName) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(tsxPath);
  const interfaceDec = sourceFile.getInterface(interfaceName);
  if (!interfaceDec) return [];

  return interfaceDec.getProperties().map((prop) => {
    const tsType = prop.getType().getText();
    return {
      name: prop.getName(),
      type: tsType,
      shopifyType: mapTsTypeToShopifyType(tsType),
    };
  });
}

// Crea el schema Shopify a partir de props
function mapPropsToShopifySchema(componentName, props) {
  const settings = [];
  const blocks = [];

  props.forEach((prop) => {
    const label = formatLabel(prop.name);
    if (prop.shopifyType === 'blockArray') {
      blocks.push({
        type: prop.name,
        name: label,
        settings: [
          {
            type: 'text',
            id: 'value',
            label: 'Value',
            default: ''
          }
        ]
      });
    } else {
      settings.push({
        type: prop.shopifyType,
        id: prop.name,
        label,
        default: ''
      });
    }
  });

  return {
    name: formatLabel(componentName),
    tag: 'section',
    class: `section-${componentName.toLowerCase()}`,
    settings,
    blocks,
    presets: [
      {
        name: formatLabel(componentName),
        category: 'Custom',
        blocks: blocks.map((b) => ({ type: b.type }))
      }
    ]
  };
}

// Crea el contenido del archivo .liquid
function createLiquidFile(componentName, schemaObj, isSection) {
  const lower = componentName.toLowerCase();
  const scssAsset = `${lower}.scss`;

  const cssInclude = `{{ '${scssAsset}' | asset_url | stylesheet_tag }}`;

  const blockLoop = schemaObj.blocks.length > 0
    ? `
  {% for block in section.blocks %}
    <p>{{ block.settings.value }}</p>
  {% endfor %}`
    : '';

  const styleBlock = `
{%- style -%}
.${lower} {
  padding: 20px;
}
{%- endstyle -%}`;

  const logic = `
{%- liquid
  assign title = section.settings.title
-%}`;

  const html = `
<!-- ${componentName} -->
<div class="${lower} section-{{ section.id }}">
  {{ title }}${blockLoop}
</div>`;

  const schema = `
{% schema %}
${JSON.stringify(schemaObj, null, 2)}
{% endschema %}`;

  return `${cssInclude}
${styleBlock}
${logic}
${html}
${schema}`;
}

// Crea los archivos físicos del componente
function generateComponentFiles(category, componentName, props) {
  const isSection = category !== 'atoms';
  const folder = isSection ? 'sections' : 'snippets';
  const lower = componentName.toLowerCase();

  const schema = mapPropsToShopifySchema(componentName, props);
  const liquid = createLiquidFile(componentName, schema, isSection);

  const liquidPath = path.resolve(__dirname, `../${folder}/${lower}.liquid`);
  const scssPath = path.resolve(__dirname, `../assets/${lower}.scss`);
  const sourceScss = path.resolve(__dirname, `../components/${category}/${componentName}/${componentName}.module.scss`);

  fs.writeFileSync(liquidPath, liquid, 'utf8');

  if (!fs.existsSync(scssPath)) {
    const fallbackStyle = fs.existsSync(sourceScss)
      ? fs.readFileSync(sourceScss, 'utf8')
      : `.${lower} {
  // styles for ${componentName}
}
`;
    fs.writeFileSync(scssPath, fallbackStyle, 'utf8');
  }

  console.log(`✅ ${componentName} generado correctamente en ${folder}/`);
}

// Procesa cada categoría
function processCategory(categoryDir) {
  const category = path.basename(categoryDir);
  const components = fs.readdirSync(categoryDir).filter(f =>
    fs.lstatSync(path.join(categoryDir, f)).isDirectory()
  );

  components.forEach((componentName) => {
    const tsxPath = path.join(categoryDir, componentName, `${componentName}.tsx`);
    const interfaceName = `${componentName}Props`;

    if (fs.existsSync(tsxPath)) {
      try {
        const props = parsePropsFromFile(tsxPath, interfaceName);
        generateComponentFiles(category, componentName, props);
      } catch (err) {
        console.error(`❌ Error en ${componentName}:`, err.message);
      }
    } else {
      console.warn(`⚠️ No se encontró archivo: ${tsxPath}`);
    }
  });
}

// MAIN
const componentsDir = path.resolve(__dirname, '../components');
['atoms', 'molecules', 'organisms'].forEach((cat) => {
  const dir = path.join(componentsDir, cat);
  if (fs.existsSync(dir)) processCategory(dir);
});