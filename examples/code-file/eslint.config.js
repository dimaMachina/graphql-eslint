import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

export default [
  'eslint:recommended',
  {
    files: ['**/*.js'],
    processor: graphqlESLint.processors.graphql,
    rules: {
      'no-console': 'error',
    },
  },
  {
    files: ['**/*.graphql'],
    plugins: {
      '@graphql-eslint': graphqlESLint,
    },
    languageOptions: {
      parser: graphqlESLint,
      parserOptions: {
        schema: 'schema.graphql',
      },
    },
    rules: {
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
    },
  },
];
