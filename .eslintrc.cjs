module.exports = {
  ignorePatterns: ['examples'],
  extends: ['@theguild'],
  rules: {
    'no-restricted-globals': ['error', { name: 'isNaN', message: 'Use Number.isNaN instead' }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'unicorn/prefer-array-some': 'error',
    'unicorn/better-regex': 'error',
    'prefer-destructuring': ['error', { object: true }],
    quotes: ['error', 'single', { avoidEscape: true }], // Matches Prettier, but also replaces backticks
  },
  overrides: [
    {
      files: ['**/rules/*.ts'],
      extends: ['plugin:eslint-plugin/rules-recommended'],
      rules: {
        'eslint-plugin/require-meta-docs-description': ['error', { pattern: '.+\\.$' }], // force to put a point at the end
        'eslint-plugin/require-meta-docs-url': [
          'error',
          { pattern: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/{{name}}.md' },
        ],
        'eslint-plugin/prefer-message-ids': 'off',
      },
    },
    {
      files: ['*.{spec,test}.ts'],
      env: {
        jest: true,
      },
      extends: ['plugin:eslint-plugin/tests-recommended'],
      rules: {
        'eslint-plugin/test-case-shorthand-strings': 'error',
      },
    },
    {
      files: ['**/tests/mocks/**/*.{ts,js}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['scripts/**'],
      rules: {
        'no-console': 'off',
      },
      env: {
        node: true,
      },
    },
    {
      files: ['packages/plugin/src/**'],
      rules: {
        // remove in v4 major
        'unicorn/prefer-node-protocol': 'off',
      },
    },
    {
      files: ['packages/plugin/src/rules/index.ts'],
      rules: {
        // file is generated
        'simple-import-sort/imports': 'off',
      },
    },
    {
      files: ['packages/plugin/src/configs/*.ts'],
      rules: {
        // eslint looks for export default
        'import/no-default-export': 'off',
      },
    },
  ],
};
