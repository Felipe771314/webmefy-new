/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@next/next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/react-in-jsx-scope': 'off',
    'no-debugger': 'error',
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@next/next/google-font-display': 'off',
    'google-font-display': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    // Desactiva la regla de variables no usadas en archivos de Storybook
    {
      files: ['**/*.stories.{js,jsx,ts,tsx}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    // Desactiva el uso de require() en archivos que usan CommonJS
    {
      files: [
        '**/plopfile.js',
        '**/parse-props.js',
        '**/scripts/generate-shopify-schema.js',
        '**/setupTests.js',
      ],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};

module.exports = config;
