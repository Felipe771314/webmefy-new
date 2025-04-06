#!/bin/bash

# Abort on errors
set -e

# Nombre de tu tienda
STORE="felipe-tienda-1"

# Directorio del theme
THEME_DIR="shopify-theme"

# Deploy usando Shopify CLI (asegúrate de estar logueado)
echo "🚀 Haciendo deploy de $THEME_DIR a la tienda $STORE..."
shopify theme push $THEME_DIR --store $STORE --allow-live --nodelete
