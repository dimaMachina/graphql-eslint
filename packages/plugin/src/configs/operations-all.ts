/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

export = {
  extends: './configs/operations-recommended',
  rules: {
    '@graphql-eslint/alphabetize': [
      'error',
      {
        definitions: true,
        selections: ['OperationDefinition', 'FragmentDefinition'],
        variables: true,
        arguments: ['Field', 'Directive'],
        groups: ['id', '*', 'createdAt', 'updatedAt'],
      },
    ],
    '@graphql-eslint/lone-executable-definition': 'error',
    '@graphql-eslint/match-document-filename': [
      'error',
      {
        query: 'kebab-case',
        mutation: 'kebab-case',
        subscription: 'kebab-case',
        fragment: 'kebab-case',
      },
    ],
    '@graphql-eslint/no-one-place-fragments': 'error',
    '@graphql-eslint/require-import-fragment': 'error',
  },
};
