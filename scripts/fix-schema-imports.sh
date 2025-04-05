#!/bin/bash

echo "🔧 Reparando imports en ./src/schemas/**/*.schema.js..."

FILES=$(find ./src/schemas -name "*.schema.js")

for FILE in $FILES; do
  echo "🛠 Procesando $FILE"

  # Temporal: renombramos el archivo para evitar errores de import
  TMP_FILE="${FILE}.tmp"

  node <<EOF > "$TMP_FILE"
const fs = require('fs');
const content = fs.readFileSync('$FILE', 'utf-8');

// Reemplazar require() simples
let newContent = content.replace(
  /const (\w+) = require\(['"]([^'"]+)['"]\);?/g,
  'import \$1 from "\$2";'
);

// Reemplazar destructuring
newContent = newContent.replace(
  /const \{([^}]+)\} = require\(['"]([^'"]+)['"]\);?/g,
  'import { \$1 } from "\$2";'
);

fs.writeFileSync('$TMP_FILE', newContent, 'utf-8');
EOF

  # Reemplazar el archivo original
  mv "$TMP_FILE" "$FILE"
done

echo "✅ Todos los imports convertidos correctamente."
