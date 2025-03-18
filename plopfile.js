const { pascalCase, kebabCase } = require("change-case");

module.exports = function (plop) {
  // 📌 Generador de Componentes para Shopify y React
  plop.setGenerator("component", {
    description: "Crear un nuevo componente para Shopify y React",
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
        type: "list",
        name: "shopifyType",
        message: "Tipo de elemento en Shopify:",
        choices: ["section", "snippet", "none"],
        default: "none",
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

      // ✅ 1️⃣ Generación de archivo React (TSX)
      actions.push({
        type: "add",
        path: `${basePath}/{{pascalCase name}}.tsx`,
        templateFile: "plop-templates/component.hbs",
      });

      // ✅ 2️⃣ Generación de archivo SCSS modular
      actions.push({
        type: "add",
        path: `${basePath}/{{pascalCase name}}.module.scss`,
        templateFile: "plop-templates/styles.hbs",
      });

      // ✅ 3️⃣ Generación de archivo de test unitario
      actions.push({
        type: "add",
        path: `${basePath}/test/{{pascalCase name}}.test.tsx`,
        templateFile: "plop-templates/test.hbs",
      });

      // ✅ 4️⃣ Generación de archivo Storybook (opcional)
      if (data.withStorybook) {
        actions.push({
          type: "add",
          path: `${basePath}/{{pascalCase name}}.stories.tsx`,
          templateFile: "plop-templates/storybook.hbs",
        });
      }

      // ✅ 5️⃣ Generación de Shopify Liquid y configuración JSON (si aplica)
      if (data.shopifyType !== "none") {
        const shopifyFolder = data.shopifyType === "section" ? "sections" : "snippets";
        const shopifyBasePath = `shopify/${shopifyFolder}/{{kebabCase name}}`;

        // 🔹 Crear carpeta para la sección/snippet
        actions.push({
          type: "add",
          path: `${shopifyBasePath}/.gitkeep`,
          template: "", // Para asegurar que la carpeta se cree
        });

        // 🔹 Genera un archivo `.json` para Theme Editor
        actions.push({
          type: "add",
          path: `${shopifyBasePath}/{{kebabCase name}}.json`,
          templateFile: "plop-templates/shopify-config.hbs",
        });

        // 🔹 Genera un archivo `.liquid`
        actions.push({
          type: "add",
          path: `${shopifyBasePath}/{{kebabCase name}}.liquid`,
          templateFile: "plop-templates/shopify-liquid.hbs",
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
