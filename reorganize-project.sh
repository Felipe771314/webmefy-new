#!/bin/bash

echo "📦 Reorganizando estructura del proyecto..."

mkdir -p shopify/{sections,snippets,templates,locales,themes,config}
mkdir -p src/{modules,schemas,utils,styles,assets,stories}

# Mover contenido de nivel raíz
mv sections/*.liquid shopify/sections/
mv snippets/*.liquid shopify/snippets/
mv templates/* shopify/templates/
mv locales/* shopify/locales/
mv themes/* shopify/themes/
mv shopify-api.js modules/ 2>/dev/null

# Mover schemas
find src/schemas -type f -name "*.js" -exec mv {} src/schemas/ \;

# Mover estilos
mv styles/* src/styles/

# Mover módulos internos
mv modules/*.js src/modules/

# Mover helpers
mv utils/helpers.ts src/utils/

echo "✅ Proyecto reestructurado correctamente."
