import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  next,
  prettier,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': ['error'],
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
];
