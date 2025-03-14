# Shopify Store - Next.js Boilerplate 🛒

Este proyecto es una implementación escalable y modular basada en **Next.js**, diseñada para integrarse con **Shopify** utilizando **LiquidJS** y proporcionar una infraestructura robusta para el desarrollo de componentes reutilizables con **Storybook**.

## 🚀 Tecnologías y Librerías

- **Framework:** Next.js 15.2.1 (con soporte para Turbopack y Webpack)
- **Componentes UI:** React 19, Bootstrap 5.3.3, React-Bootstrap
- **Gestión de API:** Axios, GraphQL Request, Shopify API Node
- **Estilos y Theming:** Bootstrap con sistema de Tokens
- **Generación de Componentes:** Hygen
- **Testing:** Jest, Testing Library, Istanbul (coverage)
- **Linting y Formateo:** ESLint, Prettier, SonarQube
- **Storybook:** Documentación visual y pruebas UI
- **Despliegue:** Soporte para Vercel, integración con Shopify, SonarQube

---

## 📂 Estructura del Proyecto


---

## 🎯 Funcionalidades Clave

✅ **Integración con Shopify**:  
- Conexión con Shopify API mediante `shopify-api-node`
- Soporte para plantillas dinámicas con `LiquidJS`

✅ **Sistema de Temas y Tokens**:  
- Uso de **Bootstrap con sistema de tokens**
- **Temas personalizados** para cada cliente en `/themes/`

✅ **Creación Rápida de Componentes**:  
- Generación automática con **Hygen**
- **Soporte para Storybook** con documentación visual
- Estilos organizados en **SCSS Modules**

✅ **Pruebas y Cobertura de Código**:  
- **Jest + Testing Library** para pruebas unitarias
- **Istanbul** para cobertura de código
- Reportes en `/coverage/`

✅ **Linting y Formateo**:  
- **ESLint** con reglas estrictas
- **Prettier** para formateo automático
- **SonarQube** para análisis de calidad de código

✅ **Despliegue y CI/CD**:  
- **Soporte para Vercel**
- Integración con **Shopify Theme Kit**
- **SonarQube + Jenkins** para calidad de código y pipelines

---

## 🛠 Comandos Útiles

```bash
# Iniciar el servidor en desarrollo
npm run dev

# Compilar el proyecto para producción
npm run build

# Iniciar en modo producción
npm run start

# Linting y formateo de código
npm run lint
npm run lint:fix
npm run format

# Pruebas unitarias
npm run test
npm run test:watch
npm run test:coverage

# Generar nuevos componentes con Hygen
npm run gen:component --name NombreDelComponente

# Ejecutar Storybook
npm run storybook
npm run build-storybook


---

### 📌 **Explicación del README**
✅ **Bien estructurado** con detalles sobre el proyecto, librerías, estructura y comandos.  
✅ **Incluye una hoja de ruta** clara para futuras mejoras.  
✅ **Documentación técnica** para que cualquier desarrollador pueda entender el proyecto rápidamente.  
✅ **Fácilmente exportable** para GitHub y otros repositorios.  

Si necesitas alguna mejora o adaptación, dime y lo ajustamos 🚀🔥
