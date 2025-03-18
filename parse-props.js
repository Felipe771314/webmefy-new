// parse-props.js
const { Project } = require('ts-morph');

function parsePropsFromFile(tsxPath, interfaceName) {
  const project = new Project();
  project.addSourceFileAtPath(tsxPath);
  const sourceFile = project.getSourceFileOrThrow(tsxPath);

  // Busca la interface con el nombre que nos interesa (BadgeProps, etc.)
  const interfaceDec = sourceFile.getInterface(interfaceName);
  if (!interfaceDec) return [];

  // Recorre las propiedades
  const propsInfo = interfaceDec.getProperties().map(prop => {
    const propName = prop.getName();
    const propType = prop.getType().getText();
    let defaultValue = null;

    // Podrías buscar si hay un "initializer" o un "JSDoc" que indique valor por defecto
    // (Para simplificar, asumimos que no)

    return {
      name: propName,
      type: propType,
      defaultValue
    };
  });

  return propsInfo;
}

module.exports = {
  parsePropsFromFile
};
