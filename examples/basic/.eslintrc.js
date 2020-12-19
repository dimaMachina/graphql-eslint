/* eslint-disable */

module.exports = {
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        operations: ['query.graphql', 'fragment.graphql', 'fragment2.graphql'],
        schema: __dirname + '/schema.graphql',
      },
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/require-id-when-available': [
          'error',
          {
            fieldName: '_id',
          },
        ],
        '@graphql-eslint/unique-fragment-name': 'warn',
        '@graphql-eslint/validate-against-schema': 'error',
        '@graphql-eslint/no-anonymous-operations': 'warn',
        '@graphql-eslint/no-operation-name-suffix': 'error',
        '@graphql-eslint/avoid-operation-name-prefix': [
          'error',
          {
            keywords: ['get'],
          },
        ],
        '@graphql-eslint/no-case-insensitive-enum-values-duplicates': ['error'],
        '@graphql-eslint/require-description': [
          'warn',
          {
            on: ['SchemaDefinition', 'FieldDefinition'],
          },
        ],
      },
    },
  ],
};
