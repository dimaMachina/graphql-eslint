import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    processor: graphqlPlugin.processor,
    rules: js.configs.recommended.rules,
  },
  {
    // Setup GraphQL Parser
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': {
        rules: graphqlPlugin.rules,
      },
    },
  },
  {
    files: ['schema.*.graphql'],
    rules: {
      ...graphqlPlugin.configs['flat/schema-recommended'].rules,
      '@graphql-eslint/require-description': 'off',
    },
  },
  {
    files: ['**/*.js/*.graphql'],
    rules: graphqlPlugin.configs['flat/operations-recommended'].rules,
  },
];
