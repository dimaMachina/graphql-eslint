module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      processor: '@graphql-eslint/graphql',
      extends: ['eslint:recommended'],
      env: {
        node: true,
        es6: true,
      },
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/require-id-when-available': 'error',
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/no-operation-name-suffix': 'error',
      },
    },
  ],
};
