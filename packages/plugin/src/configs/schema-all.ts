/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

export default {
  extends: ['plugin:@graphql-eslint/base', 'plugin:@graphql-eslint/schema-recommended'],
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
    '@graphql-eslint/no-root-type': 'off',
    '@graphql-eslint/no-scalar-result-type-on-mutation': 'error',
    '@graphql-eslint/no-unused-fields': 'off',
    '@graphql-eslint/require-deprecation-date': 'error',
    '@graphql-eslint/require-field-of-type-query-in-mutation-result': 'error',
  },
};
