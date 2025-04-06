const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

// Shopify Types
function mapTsTypeToShopifyType(tsType) {
  if (tsType.includes('boolean')) return 'checkbox';
  if (tsType.includes('number')) return 'number';
  if (tsType.includes('string[]')) return 'blockArray';
  return 'text';
}

// Detecta props
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

// Mapea props a schema de Shopify
function mapPropsToShopifySchema(componentName, props) {
  const settings = [];
  const blocks = [];

  props.forEach((prop) => {
    if (prop.shopifyType === 'blockArray') {
      blocks.push({
        type: prop.name,
        name: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        settings: [
          {
            type: 'text',
            id: 'value',
            label: 'Value',
          },
        ],
      });
    } else {
      settings.push({
        type: prop.shopifyType,
        id: prop.name,
        label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        default: '',
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
        blocks: blocks.map((b) => ({ type: b.type })),
      },
    ],
  };
}

// Estructura Liquid con SCSS, lógica y loop
function createLiquidFile(componentName, schemaObj, isSection) {
  const lower = componentName.toLowerCase();
  const scssAsset = `${lower}.scss`;

  const conditionalCSS = `
{{ '${scssAsset}' | asset_url | stylesheet_tag }}`;

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

  const logicLiquid = `
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

  return `${conditionalCSS}
${styleBlock}
${logicLiquid}
${html}
${schema}`;
}

// Genera archivos de componente
function generateComponentFiles(category, name, props) {
  const isSection = category !== 'atoms';
  const folder = isSection ? 'sections' : 'snippets';
  const lower = name.toLowerCase();

  const schema = mapPropsToShopifySchema(name, props);
  const liquid = createLiquidFile(name, schema, isSection);

  const liquidPath = path.resolve(__dirname, `../${folder}/${lower}.liquid`);
  const scssPath = path.resolve(__dirname, `../assets/${lower}.scss`);
  const sourceScss = path.resolve(__dirname, `../components/${category}/${name}/${name}.module.scss`);

  fs.writeFileSync(liquidPath, liquid, 'utf8');

  if (!fs.existsSync(scssPath)) {
    const fallbackStyle = fs.existsSync(sourceScss)
      ? fs.readFileSync(sourceScss, 'utf8')
      : `.${lower} { }\n`;
    fs.writeFileSync(scssPath, fallbackStyle, 'utf8');
  }

  console.log(`✅ ${name} generado como ${folder}`);
}

// Procesa componentes
function processCategory(categoryDir) {
  const category = path.basename(categoryDir);
  const components = fs
    .readdirSync(categoryDir)
    .filter((f) => fs.lstatSync(path.join(categoryDir, f)).isDirectory());

  components.forEach((name) => {
    const tsxPath = path.join(categoryDir, name, `${name}.tsx`);
    const interfaceName = `${name}Props`;

    if (fs.existsSync(tsxPath)) {
      const props = parsePropsFromFile(tsxPath, interfaceName);
      generateComponentFiles(category, name, props);
    } else {
      console.warn(`⚠️ No se encontró archivo TSX para ${name}`);
    }
  });
}

// MAIN
const componentsDir = path.resolve(__dirname, '../components');
['atoms', 'molecules', 'organisms'].forEach((cat) => {
  const dir = path.join(componentsDir, cat);
  if (fs.existsSync(dir)) processCategory(dir);
});
