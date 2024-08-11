import js from '@eslint/js';
import * as graphql from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    rules: js.configs.recommended.rules,
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
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/no-duplicate-fields': 'error',
    },
  },
];
