import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'vite.config.ts', 'eslint.config.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      boundaries,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/App.tsx', mode: 'file' },
        { type: 'entry', pattern: 'src/main.tsx', mode: 'file' },
        { type: 'env', pattern: 'src/vite-env.d.ts', mode: 'file' },
        { type: 'types', pattern: 'src/types/**' },
        { type: 'views', pattern: 'src/views/**' },
        { type: 'components', pattern: 'src/components/**' },
        { type: 'controllers', pattern: 'src/controllers/**' },
        { type: 'hooks', pattern: 'src/hooks/**' },
        { type: 'services', pattern: 'src/services/**' },
        { type: 'models', pattern: 'src/models/**' },
        { type: 'validations', pattern: 'src/validations/**' },
        { type: 'config', pattern: 'src/config/**' },
        { type: 'assets', pattern: 'src/assets/**' },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      eqeqeq: ['error', 'always'],
      curly: 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',

      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['views', 'components', 'controllers', 'hooks', 'models', 'types', 'validations', 'assets', 'services', 'config'] },
            { from: 'entry', allow: ['app', 'assets'] },
            { from: 'env', allow: [] },
            { from: 'views', allow: ['components', 'controllers', 'types', 'assets'] },
            { from: 'components', allow: ['components', 'hooks', 'models', 'types', 'assets'] },
            { from: 'controllers', allow: ['services', 'hooks', 'models', 'types', 'validations', 'config'] },
            { from: 'hooks', allow: ['services', 'models', 'types', 'validations', 'config'] },
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
]);