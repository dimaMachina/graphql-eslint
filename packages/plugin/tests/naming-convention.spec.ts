import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/naming-convention';

const ruleTester = new GraphQLRuleTester();

ruleTester.run('naming-convention', rule, {
  valid: [
    {
      code: `query GetUser($userId:      ID!) {
        user(id: $userId) {
             id,
        name,
          isViewerFriend,
          profilePicture(size: 50)  {
            ...PictureFragment
          }
        }
      }
      
      fragment PictureFragment on Picture {
        uri,
        width,
        height
      }`,
      options: [
        {
          ObjectTypeDefinition: 'PascalCase',
          FieldDefinition: 'camelCase',
          EnumValueDefinition: 'UPPER_CASE',
          InputValueDefinition: 'camelCase',
          FragmentDefinition: 'PascalCase',
        },
      ],
    },
    {
      code: 'type B { test: String }',
      options: [{ ObjectTypeDefinition: 'PascalCase' }],
    },
    {
      code: 'type B { test: String }',
      options: [{ leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' }],
    },
    {
      code: 'type __B { __test__: String }',
      options: [
        {
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
          TypeDefinition: 'PascalCase',
          FieldDefinition: 'camelCase',
        },
      ],
    },
    {
      code: 'scalar BSONDecimal',
      options: [
        {
          ScalarTypeDefinition: 'PascalCase',
        },
      ],
    },
    {
      code: 'interface B { test: String }',
      options: [{ InterfaceTypeDefinition: 'PascalCase' }],
    },
    {
      code: 'enum B { TEST }',
      options: [{ EnumTypeDefinition: 'PascalCase', EnumValueDefinition: 'UPPER_CASE' }],
    },
    {
      code: 'input Test { item: String }',
      options: [{ InputObjectTypeDefinition: 'PascalCase', InputValueDefinition: 'camelCase' }],
    },
    {
      code:
        'input test { item: String } enum B { Test } interface A { i: String } fragment PictureFragment on Picture { uri } scalar Hello',
    },
  ],
  invalid: [
    {
      code: 'type b { test: String }',
      options: [{ ObjectTypeDefinition: 'PascalCase', FieldDefinition: 'PascalCase' }],
      errors: [
        { message: 'Type name "b" should be in PascalCase format' },
        { message: 'Field name "test" should be in PascalCase format' },
      ],
    },
    {
      code: 'type __b { test__: String }',
      options: [{ leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' }],
      errors: [{ message: 'Leading underscores are not allowed' }, { message: 'Trailing underscores are not allowed' }],
    },
    {
      code: 'scalar BSONDecimal',
      options: [
        {
          ScalarTypeDefinition: 'snake_case',
        },
      ],
      errors: [{ message: 'Scalar name "BSONDecimal" should be in snake_case format' }],
    },
    {
      code: ruleTester.fromMockFile('large.graphql'),
      options: [
        {
          ObjectTypeDefinition: 'PascalCase',
          InputObjectTypeDefinition: 'PascalCase',
          InterfaceTypeDefinition: 'PascalCase',
          EnumTypeDefinition: 'PascalCase',
          FieldDefinition: 'camelCase',
          EnumValueDefinition: 'UPPER_CASE',
          InputValueDefinition: 'camelCase',
          FragmentDefinition: 'PascalCase',
          ScalarTypeDefinition: 'PascalCase',
          leadingUnderscore: 'allow',
        },
      ],
      errors: 27,
    },
    {
      code: 'enum B { test }',
      options: [{ EnumTypeDefinition: 'camelCase', EnumValueDefinition: 'UPPER_CASE' }],
      errors: [
        { message: 'Enumerator name "B" should be in camelCase format' },
        { message: 'Enumeration value name "test" should be in UPPER_CASE format' },
      ],
    },
    {
      code: 'input test { _Value: String }',
      options: [
        {
          ObjectTypeDefinition: 'PascalCase',
          InputObjectTypeDefinition: 'PascalCase',
          InputValueDefinition: 'snake_case',
        },
      ],
      errors: [
        { message: 'Input type name "test" should be in PascalCase format' },
        { message: 'Input property name "_Value" should be in snake_case format' },
        { message: 'Leading underscores are not allowed' },
      ],
    },
  ],
});
