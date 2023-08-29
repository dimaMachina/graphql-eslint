import js from '@eslint/js';
import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    processor: graphqlESLint.processors.graphql,
    rules: {
      ...js.configs.recommended.rules,
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
