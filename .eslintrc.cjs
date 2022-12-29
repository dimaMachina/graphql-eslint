module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: ['examples'],
  extends: ['@theguild'],
  rules: {
    'no-empty': 'off',
    'no-console': 'error',
    'no-prototype-builtins': 'off',
    'no-restricted-globals': ['error', { name: 'isNaN', message: 'Use Number.isNaN instead' }],
    'no-useless-constructor': 'off',
    'object-shorthand': ['error', 'always'],
    'no-unused-vars': 'off', // disable base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/no-useless-fallback-in-spread': 'error',
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
      files: ['*.{spec,test}.{ts,js}'],
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
    },
    {
      files: ['packages/plugin/src/**'],
      rules: {
        'import/extensions': ['error', 'ignorePackages'],
      },
    },
    {
      files: ['packages/plugin/src/**'],
      rules: {
        // remove in v4 major
        'unicorn/prefer-node-protocol': 'off'
      }
    }
  ],
};
