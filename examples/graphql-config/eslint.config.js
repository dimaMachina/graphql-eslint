import js from '@eslint/js';
import * as graphql from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    rules: js.configs.recommended.rules,
  },
  {
    files: ['**/*.graphql'],
    plugins: {
      '@graphql-eslint': { rules: graphql.rules },
    },
    languageOptions: {
      parser: graphql.parser,
    },
    rules: {
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/no-duplicate-fields': 'error',
    },
  },
];
