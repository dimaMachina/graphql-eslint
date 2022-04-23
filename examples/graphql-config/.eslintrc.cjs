module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      extends: ['eslint:recommended'],
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/no-duplicate-fields': 'error',
      },
    },
  ],
};
