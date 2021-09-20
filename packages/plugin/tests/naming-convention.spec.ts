import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/naming-convention';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('naming-convention', rule, {
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
          OperationDefinition: 'PascalCase',
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
      code: 'type my_test_6_t { test: String }',
      options: [{ ObjectTypeDefinition: 'snake_case' }],
    },
    {
      code: 'type MY_TEST_6_T { test: String }',
      options: [{ ObjectTypeDefinition: 'UPPER_CASE' }],
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
          ObjectTypeDefinition: 'PascalCase',
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
    'input test { item: String } enum B { Test } interface A { i: String } fragment PictureFragment on Picture { uri } scalar Hello',
    {
      code: 'type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }',
      options: [
        {
          ObjectTypeDefinition: { style: 'PascalCase' },
          FieldDefinition: { style: 'camelCase', suffix: 'Field' },
          EnumValueDefinition: { style: 'UPPER_CASE', suffix: '' },
        },
      ],
    },
    {
      code: 'type One { fieldA: String } enum Z { ENUM_VALUE_ONE ENUM_VALUE_TWO }',
      options: [
        {
          ObjectTypeDefinition: { style: 'PascalCase' },
          FieldDefinition: { style: 'camelCase', prefix: 'field' },
          EnumValueDefinition: { style: 'UPPER_CASE', prefix: '' },
        },
      ],
    },
    {
      code: 'type One { fieldA: String } type Query { QUERY_A(id: ID!): String }',
      options: [
        {
          FieldDefinition: { style: 'camelCase', prefix: 'field' },
          QueryDefinition: { style: 'UPPER_CASE', prefix: 'QUERY' },
        },
      ],
    },
    {
      code: 'query { foo }',
      options: [{ OperationDefinition: { style: 'PascalCase' } }],
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
    {
      code: 'type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }',
      options: [
        {
          ObjectTypeDefinition: { style: 'camelCase' },
          FieldDefinition: { style: 'camelCase', suffix: 'AAA' },
          EnumValueDefinition: { style: 'camelCase', suffix: 'ENUM' },
        },
      ],
      errors: [
        { message: 'Type name "TypeOne" should be in camelCase format' },
        { message: 'Field name "aField" should have "AAA" suffix' },
        { message: 'Enumeration value name "VALUE_ONE" should have "ENUM" suffix' },
        { message: 'Enumeration value name "VALUE_TWO" should have "ENUM" suffix' },
      ],
    },
    {
      code: 'type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }',
      options: [
        {
          ObjectTypeDefinition: { style: 'PascalCase' },
          FieldDefinition: { style: 'camelCase', prefix: 'Field' },
          EnumValueDefinition: { style: 'UPPER_CASE', prefix: 'ENUM' },
        },
      ],
      errors: [
        { message: 'Field name "aField" should have "Field" prefix' },
        { message: 'Enumeration value name "A_ENUM_VALUE_ONE" should have "ENUM" prefix' },
        { message: 'Enumeration value name "VALUE_TWO" should have "ENUM" prefix' },
      ],
    },
    {
      code: 'type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }',
      options: [
        {
          ObjectTypeDefinition: { style: 'PascalCase', forbiddenPrefixes: ['On'] },
          FieldDefinition: {
            style: 'camelCase',
            forbiddenPrefixes: ['foo', 'bar'],
            forbiddenSuffixes: ['Foo'],
          },
          QueryDefinition: { style: 'camelCase', forbiddenPrefixes: ['get', 'query'] },
        },
      ],
      errors: [
        { message: 'Type "One" should not have one of the following prefix(es): On' },
        { message: 'Field "getFoo" should not have one of the following suffix(es): Foo' },
        { message: 'Query "getA" should not have one of the following prefix(es): get, query' },
        { message: 'Query "queryB" should not have one of the following prefix(es): get, query' },
        { message: 'Query "getC" should not have one of the following prefix(es): get, query' },
      ],
    },
    {
      code: 'query Foo { foo } query getBar { bar }',
      options: [
        {
          OperationDefinition: { style: 'camelCase', forbiddenPrefixes: ['get'] },
        },
      ],
      errors: [
        { message: 'Operation name "Foo" should be in camelCase format' },
        { message: 'Operation "getBar" should not have one of the following prefix(es): get' },
      ],
    },
  ],
});
