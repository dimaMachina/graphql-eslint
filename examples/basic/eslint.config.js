import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

export default [
  'eslint:recommended',
  {
    files: ['*.graphql'],
    plugins: {
      '@graphql-eslint': graphqlESLint,
    },
    languageOptions: {
      parser: graphqlESLint,
      parserOptions: {
        operations: ['query.graphql', 'fragment.graphql', 'fragment2.graphql'],
        schema: 'schema.graphql',
      },
    },
    rules: {
      '@graphql-eslint/require-id-when-available': ['error', { fieldName: '_id' }],
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
      '@graphql-eslint/no-case-insensitive-enum-values-duplicates': ['error'],
      '@graphql-eslint/require-description': ['error', { FieldDefinition: true }],
    },
  },
];
