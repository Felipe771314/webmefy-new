#!/bin/bash

echo "🧹 Eliminando estructura heredada del tema Shopify..."

# Eliminar carpetas heredadas
rm -rf \
  sections \
  snippets \
  templates \
  layout \
  locales \
  assets \
  coverage \
  config/settings_schema.json \
  shopify \
  themes \
  *.log \
  *.liquid

# Eliminar archivos liquid dentro de /src si los hay
find ./src -name "*.liquid" -type f -delete

echo "✅ Estructura limpia y funcional conservada."

echo "📁 Estructura actual:"
tree -L 2 -I "node_modules|.git|.next"
