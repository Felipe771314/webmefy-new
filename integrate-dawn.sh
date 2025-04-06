#!/bin/bash

set -e

echo "🚀 Clonando el theme Dawn más reciente..."
rm -rf /tmp/dawn
git clone --depth=1 https://github.com/Shopify/dawn.git /tmp/dawn

echo "📦 Creando carpeta base: shopify-theme/"
rm -rf shopify-theme
mkdir -p shopify-theme

echo "📁 Copiando archivos base de Dawn..."
cp -r /tmp/dawn/{assets,layout,locales,sections,snippets,templates,config} shopify-theme/

echo "🧹 Limpiando archivos no deseados..."
rm -rf shopify-theme/{.git,package.json,README.md,.*,.github,node_modules}

echo "✅ Dawn se integró correctamente en ./shopify-theme/"
tree -L 2 shopify-theme
