#!/bin/bash

echo "🚀 Publicando carpeta 'shopify-theme' como rama 'shopify-theme-branch'..."
git subtree split --prefix=shopify-theme -b shopify-theme-branch
git push -f origin shopify-theme-branch
echo "✅ Listo. Shopify puede usar 'shopify-theme-branch'."
