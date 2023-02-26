import * as graphqlESLint from '@graphql-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    files: ['**/*.js'],
    processor: graphqlESLint.processors.graphql,
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlESLint,
    },
    plugins: {
      '@graphql-eslint': graphqlESLint,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
