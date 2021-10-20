import { GraphQLRuleTester } from '../src';
import rule from '../src/rules/alphabetize';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('alphabetize', rule, {
  valid: [
    {
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        type User {
          age: Int
          firstName: String!
          lastName: String!
          password: String
        }
      `,
    },
    {
      options: [{ fields: ['InputObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        input UserInput {
          age: Int
          firstName: String!
          lastName: String!
          password: String
          zip: String
        }
      `,
    },
    {
      options: [{ values: ['EnumTypeDefinition'] }],
      code: /* GraphQL */ `
        enum Role {
          ADMIN
          GOD
          SUPER_ADMIN
          USER
        }
      `,
    },
    {
      options: [{ selections: ['OperationDefinition'] }],
      // should not report error if selection is duplicated
      code: /* GraphQL */ `
        query {
          test {
            a
            a
            b
          }
        }
      `,
    },
  ],
  invalid: [
    {
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        type User {
          password: String
          firstName: String!
          age: Int
          lastName: String!
        }
      `,
      errors: [
        { message: '"firstName" should be before "password".' },
        { message: '"age" should be before "firstName".' },
      ],
    },
    {
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        extend type User {
          age: Int
          firstName: String!
          password: String
          lastName: String!
        }
      `,
      errors: [{ message: '"lastName" should be before "password".' }],
    },
    {
      options: [{ fields: ['InterfaceTypeDefinition'] }],
      code: /* GraphQL */ `
        interface Test {
          c: Int
          b: Int
          a: Int
        }
      `,
      errors: [{ message: '"b" should be before "c".' }, { message: '"a" should be before "b".' }],
    },
    {
      options: [{ fields: ['InputObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        input UserInput {
          password: String
          firstName: String!
          age: Int
          lastName: String!
        }
      `,
      errors: [
        { message: '"firstName" should be before "password".' },
        { message: '"age" should be before "firstName".' },
      ],
    },
    {
      options: [{ fields: ['InputObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        extend input UserInput {
          age: Int
          firstName: String!
          password: String
          lastName: String!
        }
      `,
      errors: [{ message: '"lastName" should be before "password".' }],
    },
    {
      options: [{ values: ['EnumTypeDefinition'] }],
      code: /* GraphQL */ `
        enum Role {
          SUPER_ADMIN
          ADMIN
          USER
          GOD
        }
      `,
      errors: [{ message: '"ADMIN" should be before "SUPER_ADMIN".' }, { message: '"GOD" should be before "USER".' }],
    },
    {
      options: [{ values: ['EnumTypeDefinition'] }],
      code: /* GraphQL */ `
        extend enum Role {
          ADMIN
          SUPER_ADMIN
          GOD
          USER
        }
      `,
      errors: [{ message: '"GOD" should be before "SUPER_ADMIN".' }],
    },
    {
      options: [{ arguments: ['DirectiveDefinition'] }],
      code: /* GraphQL */ `
        directive @test(c: Int, b: Int, a: Int) on FIELD_DEFINITION
      `,
      errors: [{ message: '"b" should be before "c".' }, { message: '"a" should be before "b".' }],
    },
    {
      options: [{ arguments: ['FieldDefinition'] }],
      code: /* GraphQL */ `
        type Query {
          test(c: Int, b: Int, a: Int): Int
        }
      `,
      errors: [{ message: '"b" should be before "c".' }, { message: '"a" should be before "b".' }],
    },
    {
      options: [{ selections: ['FragmentDefinition'] }],
      code: /* GraphQL */ `
        fragment TestFields on Test {
          c
          b
          a
        }
      `,
      errors: [{ message: '"b" should be before "c".' }, { message: '"a" should be before "b".' }],
    },
    {
      options: [{ selections: ['OperationDefinition'] }],
      code: /* GraphQL */ `
        query {
          test {
            c
            b
            a
            ... on Test {
              cc
              bb
              aa
            }
          }
        }
      `,
      errors: [
        { message: '"b" should be before "c".' },
        { message: '"a" should be before "b".' },
        { message: '"bb" should be before "cc".' },
        { message: '"aa" should be before "bb".' },
      ],
    },
    {
      options: [{ variables: ['OperationDefinition'], arguments: ['Field'] }],
      code: /* GraphQL */ `
        mutation ($c: Int, $b: Int, $a: Int) {
          test(cc: $c, bb: $b, aa: $a) {
            something
          }
        }
      `,
      errors: [
        { message: '"$b" should be before "$c".' },
        { message: '"$a" should be before "$b".' },
        { message: '"bb" should be before "cc".' },
        { message: '"aa" should be before "bb".' },
      ],
    },
  ],
});
