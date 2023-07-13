export = {
  parser: '@graphql-eslint/eslint-plugin',
  plugins: ['@graphql-eslint'],
  rules: {
    '@graphql-eslint/relay-arguments': 'error',
    '@graphql-eslint/relay-connection-types': 'error',
    '@graphql-eslint/relay-edge-types': 'error',
    '@graphql-eslint/relay-page-info': 'error',
  },
};
