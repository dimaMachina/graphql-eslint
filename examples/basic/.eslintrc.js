module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      extends: ['eslint:recommended'],
      env: {
        node: true,
      },
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      parserOptions: {
        operations: ['query.graphql', 'fragment.graphql', 'fragment2.graphql'],
        schema: 'schema.graphql',
      },
      rules: {
        '@graphql-eslint/require-id-when-available': ['error', { fieldName: '_id' }],
        '@graphql-eslint/unique-fragment-name': 'error',
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/no-operation-name-suffix': 'error',
        '@graphql-eslint/avoid-operation-name-prefix': ['error', { keywords: ['get'] }],
        '@graphql-eslint/no-case-insensitive-enum-values-duplicates': ['error'],
        '@graphql-eslint/require-description': ['error', { overrides: { FieldDefinition: true } }],
      },
    },
  ],
};
