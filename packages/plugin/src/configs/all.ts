/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

import { recommendedConfig } from './recommended';

export const allConfig = {
  ...recommendedConfig,
  rules: {
    ...recommendedConfig.rules,
    '@graphql-eslint/alphabetize': [
      'error',
      {
        fields: ['ObjectTypeDefinition', 'InterfaceTypeDefinition', 'InputObjectTypeDefinition'],
        values: ['EnumTypeDefinition'],
        selections: ['OperationDefinition', 'FragmentDefinition'],
        variables: ['OperationDefinition'],
        arguments: ['FieldDefinition', 'Field', 'DirectiveDefinition', 'Directive'],
      },
    ],
    '@graphql-eslint/description-style': 'error',
    '@graphql-eslint/input-name': 'error',
    '@graphql-eslint/match-document-filename': 'error',
    '@graphql-eslint/no-deprecated': 'error',
    '@graphql-eslint/no-duplicate-fields': 'error',
    '@graphql-eslint/no-hashtag-description': 'error',
    '@graphql-eslint/no-root-type': ['error', { disallow: ['subscription'] }],
    '@graphql-eslint/no-scalar-result-type-on-mutation': 'error',
    '@graphql-eslint/no-unreachable-types': 'error',
    '@graphql-eslint/no-unused-fields': 'error',
    '@graphql-eslint/require-deprecation-date': 'error',
    '@graphql-eslint/require-description': ['error', { types: true, overrides: { DirectiveDefinition: true } }],
    '@graphql-eslint/require-field-of-type-query-in-mutation-result': 'error',
    '@graphql-eslint/require-id-when-available': 'error',
    '@graphql-eslint/selection-set-depth': 'error',
    '@graphql-eslint/unique-fragment-name': 'error',
    '@graphql-eslint/unique-operation-name': 'error',
  },
};
