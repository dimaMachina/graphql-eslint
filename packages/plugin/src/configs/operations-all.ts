/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

export default {
  extends: ['./configs/base', './configs/operations-recommended'],
  rules: {
    '@graphql-eslint/alphabetize': [
      'error',
      {
        selections: ['OperationDefinition', 'FragmentDefinition'],
        variables: ['OperationDefinition'],
        arguments: ['Field', 'Directive'],
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
    '@graphql-eslint/unique-fragment-name': 'error',
    '@graphql-eslint/unique-operation-name': 'error',
  },
};
