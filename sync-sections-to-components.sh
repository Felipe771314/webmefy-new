#!/bin/bash

SECTIONS_DIR="./shopify-theme/sections"
DEST_DIR="./components/organisms"

mkdir -p "$DEST_DIR"

function kebab_to_pascal() {
  echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g'
}

echo "🔄 Sincronizando secciones de Shopify a componentes..."

for file in "$SECTIONS_DIR"/*.liquid; do
  filename=$(basename -- "$file")
  name="${filename%.liquid}"
  pascal_name=$(kebab_to_pascal "$name")
  component_dir="$DEST_DIR/$pascal_name"
  test_dir="$component_dir/test"

  mkdir -p "$component_dir"
  mkdir -p "$test_dir"

  # TSX
  cat <<EOF > "$component_dir/$pascal_name.tsx"
import styles from './$pascal_name.module.scss';

interface ${pascal_name}Props {}

export const $pascal_name = ({}: ${pascal_name}Props) => {
  return <div className={styles.$pascal_name}>$pascal_name works!</div>;
};
EOF

  # SCSS
  cat <<EOF > "$component_dir/$pascal_name.module.scss"
.$pascal_name {
  // Styles for $pascal_name
}
EOF

  # Storybook
  cat <<EOF > "$component_dir/$pascal_name.stories.tsx"
import { $pascal_name } from './$pascal_name';

export default {
  title: 'Organisms/$pascal_name',
  component: $pascal_name,
};

export const Default = () => <$pascal_name />;
EOF

  # Test → carpeta /test
  cat <<EOF > "$test_dir/$pascal_name.test.tsx"
import { render, screen } from '@testing-library/react';
import { $pascal_name } from '../$pascal_name';

test('$pascal_name renders', () => {
  render(<$pascal_name />);
  expect(screen.getByText('$pascal_name works!')).toBeInTheDocument();
});
EOF

  # Mock
  cat <<EOF > "$component_dir/$pascal_name.mock.ts"
export const ${pascal_name}Mock = {
  // mock props here
};
EOF

  echo "✅ Componente creado: $pascal_name"
done

echo "🎉 Sincronización completa. ¡Listo para desarrollar!"
