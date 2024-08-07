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
      parserOptions: {
        graphQLConfig: {
          schema: 'schema.graphql',
          documents: ['query.graphql', 'fragment.graphql', 'fragment2.graphql'],
        },
      },
    },
    plugins: {
      '@graphql-eslint': { rules: graphql.rules },
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
