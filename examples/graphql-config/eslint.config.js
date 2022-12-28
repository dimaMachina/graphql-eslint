import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

export default [
  'eslint:recommended',
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
      '@graphql-eslint/no-duplicate-fields': 'error',
    },
  },
];
