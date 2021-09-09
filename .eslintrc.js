module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: ['examples'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:eslint-plugin/recommended',
    'prettier',
  ],
  plugins: ['unicorn'],
  rules: {
    'no-empty': 'off',
    'no-console': 'error',
    'no-prototype-builtins': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off', // disable base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-includes': 'error',
    'eslint-plugin/test-case-shorthand-strings': 'error',
    'eslint-plugin/no-only-tests': 'error',
    'eslint-plugin/require-meta-docs-url': [
      'error',
      { pattern: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/{{name}}.md' },
    ],
  },
  overrides: [
    {
      files: ['*.{spec,test}.{ts,js}'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/tests/mocks/*.{ts,js}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
