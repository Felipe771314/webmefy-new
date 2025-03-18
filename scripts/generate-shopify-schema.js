// generate-all-shopify-schema.js
const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

// Función para mapear tipos TypeScript a tipos de Shopify
function mapTsTypeToShopifyType(tsType) {
  if (tsType.includes('boolean')) return 'checkbox';
  if (tsType.includes('number')) return 'number';
  // Puedes extender con más reglas según convenga
  return 'text';
}

// Función para parsear las props desde un archivo TSX, dada la interfaz de props
function parsePropsFromFile(tsxPath, interfaceName) {
  const project = new Project();
  project.addSourceFileAtPath(tsxPath);
  const sourceFile = project.getSourceFileOrThrow(tsxPath);

  const interfaceDec = sourceFile.getInterface(interfaceName);
  if (!interfaceDec) return [];

  return interfaceDec.getProperties().map(prop => {
    const propName = prop.getName();
    const propType = prop.getType().getText();
    return {
      name: propName,
      type: propType,
      shopifyType: mapTsTypeToShopifyType(propType),
      defaultValue: '', // Aquí podrías implementar lógica para detectar valores por defecto
    };
  });
}

// Función para mapear las props a un schema de Shopify
function mapPropsToShopifySchema(componentName, propsArray) {
  return {
    name: componentName,
    settings: propsArray.map(prop => ({
      type: prop.shopifyType,
      id: prop.name,
      label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
      default: prop.defaultValue,
    })),
  };
}

// Directorios base
const componentsDir = path.resolve(__dirname, '../components');
const shopifyDir = path.resolve(__dirname, '../shopify');
// Define en qué carpeta de Shopify quieres colocar los schemas (puede ser "snippets" o "sections")
const shopifyTypeFolder = 'snippets';

// Función que recorre un directorio de categoría (atoms, molecules, organisms, etc.)
function processCategory(categoryDir) {
  const components = fs.readdirSync(categoryDir, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(dir => dir.name);

  components.forEach(componentName => {
    // Ruta esperada del componente (por ejemplo: components/atoms/Badge/Badge.tsx)
    const tsxPath = path.join(categoryDir, componentName, `${componentName}.tsx`);
    if (fs.existsSync(tsxPath)) {
      const interfaceName = `${componentName}Props`;
      try {
        const propsArray = parsePropsFromFile(tsxPath, interfaceName);
        const schemaObj = mapPropsToShopifySchema(componentName, propsArray);

        // Ruta de salida en Shopify para este componente
        const shopifyComponentDir = path.join(shopifyDir, shopifyTypeFolder, componentName.toLowerCase());
        if (!fs.existsSync(shopifyComponentDir)) {
          fs.mkdirSync(shopifyComponentDir, { recursive: true });
        }

        // Genera el archivo JSON
        const jsonPath = path.join(shopifyComponentDir, `${componentName.toLowerCase()}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(schemaObj, null, 2), 'utf-8');

        // Genera un archivo Liquid básico usando el schema
        const liquidTemplate = `
{% schema %}
${JSON.stringify(schemaObj, null, 2)}
{% endschema %}

<!-- Plantilla Liquid para ${componentName} -->
<div class="${componentName.toLowerCase()}">
  {%- for setting in section.settings -%}
    <p>{{ setting.id }}: {{ section.settings[setting.id] }}</p>
  {%- endfor -%}
</div>
`;
        const liquidPath = path.join(shopifyComponentDir, `${componentName.toLowerCase()}.liquid`);
        fs.writeFileSync(liquidPath, liquidTemplate, 'utf-8');

        console.log(`Shopify schema generated for ${componentName} in ${shopifyTypeFolder}`);
      } catch (error) {
        console.error(`Error processing ${componentName}: ${error}`);
      }
    } else {
      console.warn(`No se encontró archivo TSX para ${componentName} en ${categoryDir}`);
    }
  });
}

// Procesar todas las categorías (atoms, molecules, organisms)
// Puedes definir las carpetas que quieras procesar.
const categoriesToProcess = ['atoms', 'molecules', 'organisms'];

categoriesToProcess.forEach(category => {
  const categoryDir = path.join(componentsDir, category);
  if (fs.existsSync(categoryDir)) {
    processCategory(categoryDir);
  } else {
    console.warn(`No se encontró la carpeta de la categoría: ${category}`);
  }
});
