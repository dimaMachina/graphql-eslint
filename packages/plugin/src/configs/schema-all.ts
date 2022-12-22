/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

export default {
  extends: ['./configs/base', './configs/schema-recommended'],
  rules: {
    '@graphql-eslint/alphabetize': [
      'error',
      {
        fields: ['ObjectTypeDefinition', 'InterfaceTypeDefinition', 'InputObjectTypeDefinition'],
        values: ['EnumTypeDefinition'],
        arguments: ['FieldDefinition', 'Field', 'DirectiveDefinition', 'Directive'],
      },
    ],
    '@graphql-eslint/input-name': 'error',
    '@graphql-eslint/no-scalar-result-type-on-mutation': 'error',
    '@graphql-eslint/require-deprecation-date': 'error',
    '@graphql-eslint/require-field-of-type-query-in-mutation-result': 'error',
    '@graphql-eslint/require-nullable-fields-with-oneof': 'error',
    '@graphql-eslint/require-type-pattern-with-oneof': 'error',
  },
};
