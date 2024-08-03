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
    plugins: {
      '@graphql-eslint': { rules: graphql.rules },
    },
    languageOptions: {
      parser: graphql.parser,
    },
  },
  {
    files: ['schema.*.graphql'],
    rules: {
      ...graphql.flatConfigs['schema-recommended'].rules,
      '@graphql-eslint/require-description': 'off',
    },
  },
  {
    files: ['**/*.js/*.graphql'],
    rules: graphql.flatConfigs['operations-recommended'].rules,
  },
];
