import js from '@eslint/js';
import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    rules: js.configs.recommended.rules,
  },
  {
    files: ['**/*.graphql'],
    plugins: {
      '@graphql-eslint': graphqlESLint,
    },
    languageOptions: {
      parser: graphqlESLint,
      parserOptions: {
        graphQLConfig: {
          schema: 'schema.graphql',
          documents: ['query.graphql', 'fragment.graphql', 'fragment2.graphql'],
        },
      },
    },
    rules: {
      '@graphql-eslint/require-selections': ['error', { fieldName: '_id' }],
      '@graphql-eslint/unique-fragment-name': 'error',
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
          },
        },
      ],
      '@graphql-eslint/unique-enum-value-names': 'error',
      '@graphql-eslint/require-description': ['error', { FieldDefinition: true }],
    },
  },
];
