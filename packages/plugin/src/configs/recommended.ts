/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

export const recommendedConfig = {
  parser: '@graphql-eslint/eslint-plugin',
  plugins: ['@graphql-eslint'],
  rules: {
    '@graphql-eslint/executable-definitions': 'error',
    '@graphql-eslint/fields-on-correct-type': 'error',
    '@graphql-eslint/fragments-on-composite-type': 'error',
    '@graphql-eslint/known-argument-names': 'error',
    '@graphql-eslint/known-directives': 'error',
    '@graphql-eslint/known-fragment-names': 'error',
    '@graphql-eslint/known-type-names': 'error',
    '@graphql-eslint/lone-anonymous-operation': 'error',
    '@graphql-eslint/lone-schema-definition': 'error',
    '@graphql-eslint/naming-convention': [
      'error',
      {
        types: 'PascalCase',
        fields: 'camelCase',
        overrides: {
          EnumValueDefinition: 'UPPER_CASE',
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
          },
          FragmentDefinition: { style: 'PascalCase', forbiddenPrefixes: ['Fragment'], forbiddenSuffixes: ['Fragment'] },
          'FieldDefinition[parent.name.value=Query]': {
            forbiddenPrefixes: ['query', 'get'],
            forbiddenSuffixes: ['Query'],
          },
          'FieldDefinition[parent.name.value=Mutation]': {
            forbiddenPrefixes: ['mutation'],
            forbiddenSuffixes: ['Mutation'],
          },
          'FieldDefinition[parent.name.value=Subscription]': {
            forbiddenPrefixes: ['subscription'],
            forbiddenSuffixes: ['Subscription'],
          },
        },
      },
    ],
    '@graphql-eslint/no-anonymous-operations': 'error',
    '@graphql-eslint/no-case-insensitive-enum-values-duplicates': 'error',
    '@graphql-eslint/no-fragment-cycles': 'error',
    '@graphql-eslint/no-typename-prefix': 'error',
    '@graphql-eslint/no-undefined-variables': 'error',
    '@graphql-eslint/no-unused-fragments': 'error',
    '@graphql-eslint/no-unused-variables': 'error',
    '@graphql-eslint/one-field-subscriptions': 'error',
    '@graphql-eslint/overlapping-fields-can-be-merged': 'error',
    '@graphql-eslint/possible-fragment-spread': 'error',
    '@graphql-eslint/possible-type-extension': 'error',
    '@graphql-eslint/provided-required-arguments': 'error',
    '@graphql-eslint/require-deprecation-reason': 'error',
    '@graphql-eslint/scalar-leafs': 'error',
    '@graphql-eslint/strict-id-in-types': 'error',
    '@graphql-eslint/unique-argument-names': 'error',
    '@graphql-eslint/unique-directive-names': 'error',
    '@graphql-eslint/unique-directive-names-per-location': 'error',
    '@graphql-eslint/unique-enum-value-names': 'error',
    '@graphql-eslint/unique-field-definition-names': 'error',
    '@graphql-eslint/unique-input-field-names': 'error',
    '@graphql-eslint/unique-operation-types': 'error',
    '@graphql-eslint/unique-type-names': 'error',
    '@graphql-eslint/unique-variable-names': 'error',
    '@graphql-eslint/value-literals-of-correct-type': 'error',
    '@graphql-eslint/variables-are-input-types': 'error',
    '@graphql-eslint/variables-in-allowed-position': 'error',
  },
};
