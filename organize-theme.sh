#!/bin/bash

echo "🧹 Organizando archivos del tema Shopify..."

# Carpetas base
mkdir -p assets config layout locales sections snippets templates

# Mover SCSS a assets
find . -type f -name "*.scss" ! -path "./assets/*" -exec mv {} assets/ \;

# Mover JSON de configuración
find . -type f -name "settings_*.json" -exec mv {} config/ \;

# Mover JSON de templates
find . -type f -name "*.json" ! -name "settings_*.json" -exec mv {} templates/ \;

# Mover LIQUID: snippets
find . -type f -name "*.liquid" -path "*/snippets/*" -exec mv {} snippets/ \;

# Mover LIQUID: sections
find . -type f -name "*.liquid" -path "*/sections/*" -exec mv {} sections/ \;

# Mover LIQUID: layouts
find . -type f -name "*layout.liquid" -exec mv {} layout/ \;

# Mover otros LIQUIDs que parecen plantillas
find . -type f -name "*.liquid" ! -path "*/snippets/*" ! -path "*/sections/*" ! -path "*/layout/*" -exec mv {} templates/ \;

echo "✅ Archivos organizados. Revisa la estructura antes de volver a ejecutar el theme check."
