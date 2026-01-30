import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import boundaries from 'eslint-plugin-boundaries';

export default [
  { ignores: ['dist', 'vite.config.ts', 'eslint.config.ts'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'App.tsx', mode: 'file' },
        { type: 'entry', pattern: 'main.tsx', mode: 'file' },
        { type: 'env', pattern: 'vite-env.d.ts', mode: 'file' },
        { type: 'types', pattern: 'types/**' },
        { type: 'views', pattern: 'views/**' },
        { type: 'components', pattern: 'components/**' },
        { type: 'controllers', pattern: 'controllers/**' },
        { type: 'hooks', pattern: 'hooks/**' },
        { type: 'handlers', pattern: 'handlers/**' },
        { type: 'services', pattern: 'services/**' },
        { type: 'models', pattern: 'models/**' },
        { type: 'validations', pattern: 'validations/**' },
        { type: 'config', pattern: 'config/**' },
        { type: 'assets', pattern: 'assets/**' },
      ],
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['views', 'components', 'controllers', 'hooks', 'models', 'types', 'validations', 'assets', 'services', 'handlers', 'config'] },
            { from: 'entry', allow: ['app', 'assets'] },
            { from: 'env', allow: [] },
            { from: 'views', allow: ['components', 'controllers', 'types', 'assets'] },
            { from: 'components', allow: ['components', 'hooks', 'models', 'types', 'assets'] },
            { from: 'controllers', allow: ['services', 'handlers', 'hooks', 'models', 'types', 'validations', 'config'] },
            { from: 'hooks', allow: ['services', 'models', 'types', 'validations', 'config'] },
            { from: 'handlers', allow: ['services', 'models', 'types', 'config'] },
            { from: 'services', allow: ['models', 'types', 'config'] },
            { from: 'models', allow: ['types'] },
            { from: 'validations', allow: ['types'] },
            { from: 'config', allow: ['types'] },
            { from: 'types', allow: [] },
            { from: 'assets', allow: [] },
          ],
        },
      ],
    },
  },
];