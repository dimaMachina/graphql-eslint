import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

const SCHEMA_PATH = 'server/**/*.gql';
const OPERATIONS_PATH = 'client/**/*.{tsx,gql}';

export default [
  'eslint:recommended',
  {
    files: ['client/**/*.tsx'],
    // Setup processor for operations/fragments definitions on code-files
    processor: graphqlESLint.processors.graphql,
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    // Setup GraphQL Parser
    files: ['**/*.{graphql,gql}'],
    plugins: {
      '@graphql-eslint': graphqlESLint,
    },
    languageOptions: {
      parser: graphqlESLint,
      parserOptions: {
        schema: SCHEMA_PATH,
        operations: OPERATIONS_PATH,
      },
    },
  },
  {
    // Setup recommended config for schema files
    files: [SCHEMA_PATH],
    ...graphqlESLint.flatConfigs['schema-recommended'],
  },
  {
    // Setup recommended config for operations files
    files: ['client/**/*.{graphql,gql}'],
    ...graphqlESLint.flatConfigs['operations-recommended'],
  },
];
