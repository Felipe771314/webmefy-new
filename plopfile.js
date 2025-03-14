const { pascalCase } = require("change-case");

module.exports = function (plop) {
  // 📌 Generador de Componentes
  plop.setGenerator("component", {
    description: "Crear un nuevo componente",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nombre del componente:",
      },
      {
        type: "list",
        name: "category",
        message: "Selecciona la categoría:",
        choices: ["atoms", "molecules", "organisms", "templates", "pages"],
      },
      {
        type: "confirm",
        name: "withStorybook",
        message: "¿Incluir Storybook?",
        default: true,
        when: (answers) => answers.category !== "templates" && answers.category !== "pages",
      },
    ],
    actions: (data) => {
      const actions = [];
      const basePath = `components/${data.category}/{{pascalCase name}}`;

      actions.push({
        type: "add",
        path: `${basePath}/{{pascalCase name}}.tsx`,
        templateFile: "plop-templates/component.hbs",
      });

      actions.push({
        type: "add",
        path: `${basePath}/{{pascalCase name}}.module.scss`,
        templateFile: "plop-templates/styles.hbs",
      });

      actions.push({
        type: "add",
        path: `${basePath}/test/{{pascalCase name}}.test.tsx`,
        templateFile: "plop-templates/test.hbs",
      });

      if (data.withStorybook) {
        actions.push({
          type: "add",
          path: `${basePath}/{{pascalCase name}}.stories.tsx`,
          templateFile: "plop-templates/storybook.hbs",
        });
      }

      return actions;
    },
  });

  // 📌 Generador de Páginas
  plop.setGenerator("page", {
    description: "Crear una nueva página",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nombre de la página:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{kebabCase name}}.tsx",
        templateFile: "plop-templates/page.hbs",
      },
    ],
  });

  // 📌 Generador de Plantillas
  plop.setGenerator("template", {
    description: "Crear una nueva plantilla",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nombre de la plantilla:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/templates/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/template.hbs",
      },
    ],
  });
};
