This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

shopify-store/
│
├── .github/                      # Configuración de GitHub
├── .next/                        # Carpeta generada por Next.js para el build
├── .storybook/                   # Configuración de Storybook
│   ├── main.ts                   # Configuración principal de Storybook
│   ├── preview.ts                 # Configuración del preview de Storybook
│
├── _templates/                    # Plantillas de generación automática de componentes
│   ├── component/
│   │   ├── new/
│   │   │   ├── index.ejs.t        # Plantilla de nuevo componente
│   │   │   ├── index.test.ejs.t   # Prueba unitaria para el nuevo componente
│   │   │   ├── stories.ejs.t      # Storybook asociado al componente
│   │   │   ├── styles.module.scss.ejs.t  # Estilos SCSS para el componente
│   │   │   ├── test.ejs.t         # Prueba del componente
│   │   │
│   ├── generator/
│   │   ├── help/
│   │   ├── new/
│   │   │   ├── prompt.js
│   │   │   ├── with-prompt
│   │   │   ├── hello.ejs.t
│   │   │   ├── prompt.ejs.t
│   │   │   ├── prompt.js
│
├── app/                           # Aplicación principal
│   ├── hello.js                   # Archivo de prueba
│
├── components/                     # Componentes reutilizables
│   ├── Cart.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│
├── config/                         # Configuración dinámica del proyecto
│   ├── clients/
│   │   ├── client1.ts
│   │   ├── client2.ts
│   │   ├── client3.ts
│   ├── config.ts
│   ├── default.js
│   ├── development.js
│   ├── production.js
│
├── coverage/                        # Reportes de cobertura de tests
│   ├── lcov-report/
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov.info
│
├── modules/                         # Módulos reutilizables del sistema
│   ├── analytics.js
│   ├── notifications.js
│   ├── shopify-api.js
│
├── public/                          # Archivos públicos estáticos
│
├── src/                             # Código fuente
│   ├── __tests__/                   # Pruebas unitarias
│   ├── api/                         # API de conexión
│   │   ├── analytics.ts
│   │   ├── shopify.ts
│   ├── app/                         # Configuración de la aplicación
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── page.module.css
│   ├── pages/                       # Páginas principales del sistema
│   │   ├── index.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── stories/                     # Configuración de Storybook
│   │   ├── assets/
│   │   ├── button.css
│   │   ├── Configure.mdx
│   │   ├── header.css
│   │   ├── page.css
│   ├── styles/                      # Estilos globales
│   │   ├── global.css
│   ├── themes/                      # Configuración de temas por cliente
│   │   ├── client1.tsx
│   │   ├── client2.tsx
│   │   ├── default.tsx
│   ├── utils/                       # Utilidades y helpers
│   │   ├── helpers.ts
│
├── .env.local                       # Variables de entorno local
├── .eslintrc.json                    # Configuración de ESLint
├── .gitignore                        # Archivos ignorados en Git
├── .prettierrc                       # Configuración de Prettier
├── eslint.config.mjs                 # Configuración de ESLint extendida
├── jest.config.js                    # Configuración de Jest
├── next-env.d.ts                     # Configuración de Tipos de Next.js
├── next.config.ts                     # Configuración de Next.js
├── package-lock.json                  # Archivo de lock de dependencias
├── package.json                        # Configuración de paquetes y scripts
├── README.md                           # Documentación del proyecto
├── setupTests.js                        # Configuración de Jest
├── sonar-project.js                     # Configuración de Sonarqube
├── sonar-project.properties             # Archivo de configuración de Sonarqube
├── storybook.log                        # Log de Storybook
├── tsconfig.json                         # Configuración de TypeScript


📌 Resumen de la Configuración
Este sistema se ha diseñado para ser modular, reutilizable y escalable con las siguientes características:

✅ Uso de Storybook:

Cada componente tiene su propia documentación visual en Storybook.
Los estilos están separados en SCSS Modules.
✅ Configuración Modular de Clientes:

En la carpeta config/clients/, cada cliente tiene su propio archivo de configuración en TypeScript.
Se define un config.ts para manejar todas las configuraciones dinámicamente.
✅ Estructura de Testing:

Pruebas con Jest y Testing Library.
Reportes de cobertura en la carpeta coverage/.
✅ Estilos y Theming:

Uso de Bootstrap para estilos.
Temas personalizados en themes/ para cada cliente.
✅ Automatización de Creación de Componentes:

Uso de Hygen para generar nuevos componentes con estructura predefinida.
✅ Integración con Shopify y LiquidJS:

Shopify se maneja en shopify-api.js.
Soporte para LiquidJS en caso de requerir plantillas dinámicas.
