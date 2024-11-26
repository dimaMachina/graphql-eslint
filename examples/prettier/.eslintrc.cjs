/**
 * Legacy config example, should be run with `ESLINT_USE_FLAT_CONFIG=false` environment variable in ESLint 9
 */

module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      processor: '@graphql-eslint/graphql',
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      env: {
        es2022: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ],
};
