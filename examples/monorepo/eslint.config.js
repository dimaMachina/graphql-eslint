import js from '@eslint/js';
import * as graphql from '@graphql-eslint/eslint-plugin';

const SCHEMA_PATH = 'server/**/*.gql';

export default [
  {
    files: ['**/*.{js,tsx}'],
    rules: js.configs.recommended.rules,
  },
  {
    files: ['client/**/*.tsx'],
    // Setup processor for operations/fragments definitions on code-files
    processor: graphql.processors.graphql,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    // Setup GraphQL Parser
    files: ['**/*.{graphql,gql}'],
    languageOptions: {
      parser: graphql.parser,
    },
    plugins: {
      '@graphql-eslint': { rules: graphql.rules },
    },
  },
  {
    // Setup recommended config for schema files
    files: [SCHEMA_PATH],
    rules: graphql.configs['flat/schema-recommended'],
  },
  {
    // Setup recommended config for operations files
    files: ['client/**/*.{graphql,gql}'],
    rules: graphql.configs['flat/operations-recommended'],
  },
];
