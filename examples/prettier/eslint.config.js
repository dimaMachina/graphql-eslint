import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import js from '@eslint/js';
import * as graphql from '@graphql-eslint/eslint-plugin';

export default [
  {
    plugins: {
      prettier: { rules: prettierPlugin.rules },
    },
  },
  {
    files: ['**/*.js'],
    processor: graphql.processors.graphql,
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphql.parser,
    },
    plugins: {
      '@graphql-eslint': {
        rules: graphql.rules,
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
