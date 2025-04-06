// generate-shopify-sections.js
const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

// 1. Mapeo de tipos TypeScript a tipos de campos Shopify
function mapTsTypeToShopifyType(tsType, comment = '') {
  if (comment.includes('@color') || tsType === 'Color') return 'color';
  if (comment.includes('@range')) return 'range';
  if (comment.includes('@select')) return 'select';
  if (tsType.includes('boolean')) return 'checkbox';
  if (tsType.includes('number')) return 'number';
  if (tsType.includes('string[]')) return 'blockArray';
  if (tsType.includes('string')) return 'text';
  return 'text';
}

// 2. Parsear las props desde una interfaz .tsx
function parsePropsFromFile(tsxPath, interfaceName) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(tsxPath);
  const interfaceDec = sourceFile.getInterface(interfaceName);
  if (!interfaceDec) return [];

  return interfaceDec.getProperties().map((prop) => {
    const name = prop.getName();
    const tsType = prop.getType().getText();
    const comment = prop.getJsDocs().map((doc) => doc.getComment()).join(' ') || '';
    return {
      name,
      type: tsType,
      shopifyType: mapTsTypeToShopifyType(tsType, comment),
      label: name.charAt(0).toUpperCase() + name.slice(1),
      default: '',
      comment
    };
  });
}

// 3. Construir el schema de Shopify completo
function mapPropsToShopifySchema(componentName, props) {
  const settings = [];
  const blocks = [];

  props.forEach((prop) => {
    if (prop.shopifyType === 'blockArray') {
      blocks.push({
        type: prop.name,
        name: prop.label,
        settings: [
          {
            type: 'text',
            id: 'value',
            label: 'Value'
          }
        ]
      });
    } else {
      settings.push({
        type: prop.shopifyType,
        id: prop.name,
        label: prop.label,
        default: prop.default
      });
    }
  });

  return {
    name: componentName,
    class: `section-${componentName.toLowerCase()}`,
    tag: 'section',
    settings,
    blocks,
    presets: [
      {
        name: componentName,
        category: 'Custom',
        blocks: blocks.map(b => ({ type: b.type }))
      }
    ]
  };
}

// 4. Crear el archivo Liquid con estructura válida
function createLiquidFile(componentName, schemaObj, isSection) {
  const lower = componentName.toLowerCase();
  const scssFile = `${lower}.scss`;

  const assets = `{{ '${scssFile}' | asset_url | stylesheet_tag }}`;

  const styleBlock = `
{%- style -%}
.${lower} {
  padding: 20px;
}
{%- endstyle -%}`;

  const logicBlock = `
{%- liquid
  assign title = section.settings.title
-%}`;

  const blocksHTML = schemaObj.blocks.length > 0
    ? `{% for block in section.blocks %}
  <p>{{ block.settings.value }}</p>
{% endfor %}`
    : '';

  const html = `
<!-- ${componentName} -->
<div class="${lower} section-{{ section.id }}">
  {{ title }}
  ${blocksHTML}
</div>`;

  return `
${assets}
${styleBlock}
${isSection ? logicBlock : ''}

${html}

{% schema %}
${JSON.stringify(schemaObj, null, 2)}
{% endschema %}
`;
}

// 5. Generar archivos necesarios (Liquid + SCSS)
function generateComponentFiles(category, name, props) {
  const isSection = category !== 'atoms';
  const folder = isSection ? 'sections' : 'snippets';
  const lower = name.toLowerCase();

  const schema = mapPropsToShopifySchema(name, props);
  const liquid = createLiquidFile(name, schema, isSection);

  const liquidPath = path.resolve(__dirname, `../${folder}/${lower}.liquid`);
  const scssSource = path.resolve(__dirname, `../components/${category}/${name}/${name}.module.scss`);
  const scssTarget = path.resolve(__dirname, `../assets/${lower}.scss`);

  fs.writeFileSync(liquidPath, liquid, 'utf8');

  if (!fs.existsSync(scssTarget)) {
    const base = fs.existsSync(scssSource) ? fs.readFileSync(scssSource, 'utf8') : '';
    fs.writeFileSync(scssTarget, base || `.${lower} {\n  /* estilos para ${name} */\n}\n`, 'utf8');
  }

  console.log(`✅ ${name} generado como ${folder}`);
}

// 6. Procesar categoría (atoms, molecules, organisms)
function processCategory(categoryDir) {
  const category = path.basename(categoryDir);
  const components = fs.readdirSync(categoryDir).filter(c =>
    fs.lstatSync(path.join(categoryDir, c)).isDirectory()
  );

  components.forEach((name) => {
    const tsxPath = path.join(categoryDir, name, `${name}.tsx`);
    const interfaceName = `${name}Props`;

    if (fs.existsSync(tsxPath)) {
      const props = parsePropsFromFile(tsxPath, interfaceName);
      generateComponentFiles(category, name, props);
    } else {
      console.warn(`⚠️ No se encontró ${tsxPath}`);
    }
  });
}

// 7. Ejecutar script
const componentsDir = path.resolve(__dirname, '../components');
['atoms', 'molecules', 'organisms'].forEach((cat) => {
  const dir = path.join(componentsDir, cat);
  if (fs.existsSync(dir)) processCategory(dir);
});
