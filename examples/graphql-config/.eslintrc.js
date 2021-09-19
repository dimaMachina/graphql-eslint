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
      rules: {
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/avoid-duplicate-fields': 'error',
      },
    },
  ],
};
