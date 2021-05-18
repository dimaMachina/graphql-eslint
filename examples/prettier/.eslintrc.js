module.exports = {
  extends: ['plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      // the following is required for `eslint-plugin-prettier@<=3.4.0` temporarily
      // after https://github.com/prettier/eslint-plugin-prettier/pull/413
      // been merged and released, it can be deleted safely
      rules: {
        'prettier/prettier': [
          2,
          {
            parser: 'graphql',
          },
        ],
      },
    },
    // the following is required for `eslint-plugin-prettier@<=3.4.0` temporarily
    // after https://github.com/prettier/eslint-plugin-prettier/pull/415
    // been merged and released, it can be deleted safely
    {
      files: ['*.js/*.graphql'],
      rules: {
        'prettier/prettier': 0,
      },
    },
  ],
};
