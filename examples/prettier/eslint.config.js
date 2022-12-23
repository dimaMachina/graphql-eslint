import * as graphqlESLint from '@graphql-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  'eslint:recommended',
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    files: ['**/*.js'],
    processor: graphqlESLint.processors.graphql,
    rules: {
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
