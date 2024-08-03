import js from '@eslint/js';
import * as graphql from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    processor: graphql.processors.graphql,
    rules: js.configs.recommended.rules,
  },
  {
    // Setup GraphQL Parser
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphql.parser,
    },
    plugins: {
      '@graphql-eslint': { rules: graphql.rules },
    },
  },
  {
    files: ['schema.*.graphql'],
    rules: {
      ...graphql.configs['flat/schema-recommended'].rules,
      '@graphql-eslint/require-description': 'off',
    },
  },
  {
    files: ['**/*.js/*.graphql'],
    rules: graphql.configs['flat/operations-recommended'].rules,
  },
];
