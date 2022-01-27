import { GraphQLRuleTester } from '../src';
import rule, { AlphabetizeConfig } from '../src/rules/alphabetize';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests<[AlphabetizeConfig]>('alphabetize', rule, {
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
      name: 'should not report error if selection is duplicated',
      options: [{ selections: ['OperationDefinition'] }],
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
        { message: '"firstName" should be before "password"' },
        { message: '"age" should be before "firstName"' },
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
      errors: [{ message: '"lastName" should be before "password"' }],
    },
    {
      options: [{ fields: ['InterfaceTypeDefinition'] }],
      code: /* GraphQL */ `
        interface Test {
          cc: Int
          bb: Int
          aa: Int
        }
      `,
      errors: [{ message: '"bb" should be before "cc"' }, { message: '"aa" should be before "bb"' }],
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
        { message: '"firstName" should be before "password"' },
        { message: '"age" should be before "firstName"' },
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
      errors: [{ message: '"lastName" should be before "password"' }],
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
      errors: [{ message: '"ADMIN" should be before "SUPER_ADMIN"' }, { message: '"GOD" should be before "USER"' }],
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
      errors: [{ message: '"GOD" should be before "SUPER_ADMIN"' }],
    },
    {
      options: [{ arguments: ['DirectiveDefinition'] }],
      code: /* GraphQL */ `
        directive @test(cc: Int, bb: Int, aa: Int) on FIELD_DEFINITION
      `,
      errors: [{ message: '"bb" should be before "cc"' }, { message: '"aa" should be before "bb"' }],
    },
    {
      options: [{ arguments: ['FieldDefinition'] }],
      code: /* GraphQL */ `
        type Query {
          test(cc: Int, bb: Int, aa: Int): Int
        }
      `,
      errors: [{ message: '"bb" should be before "cc"' }, { message: '"aa" should be before "bb"' }],
    },
    {
      options: [{ selections: ['FragmentDefinition'] }],
      code: /* GraphQL */ `
        fragment TestFields on Test {
          cc
          bb
          aa
        }
      `,
      errors: [{ message: '"bb" should be before "cc"' }, { message: '"aa" should be before "bb"' }],
    },
    {
      options: [{ selections: ['OperationDefinition'] }],
      code: /* GraphQL */ `
        query {
          test {
            cc
            bb
            aa
            ... on Test {
              ccc
              bbb
              aaa
            }
          }
        }
      `,
      errors: [
        { message: '"bb" should be before "cc"' },
        { message: '"aa" should be before "bb"' },
        { message: '"bbb" should be before "ccc"' },
        { message: '"aaa" should be before "bbb"' },
      ],
    },
    {
      options: [{ variables: ['OperationDefinition'], arguments: ['Field'] }],
      code: /* GraphQL */ `
        mutation ($cc: Int, $bb: Int, $aa: Int) {
          test(ccc: $cc, bbb: $bb, aaa: $aa) {
            something
          }
        }
      `,
      errors: [
        { message: '"$bb" should be before "$cc"' },
        { message: '"$aa" should be before "$bb"' },
        { message: '"bbb" should be before "ccc"' },
        { message: '"aaa" should be before "bbb"' },
      ],
    },
    {
      name: 'should not autofix for fields with comment between',
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        type Test {
          cc: Int
          # between 'cc' and 'c'
          c: Float
          bb: String
          aa: Int
        }
      `,
      errors: [{ message: '"c" should be before "cc"' },{ message: '"bb" should be before "c"' }, { message: '"aa" should be before "bb"' }],
    },
    {
      name: 'should autofix if after comment is not on same line',
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        type Test {
          cc: Int
          c: Float
          # ok for 'cc' and 'c' but not for 'bb' and 'aa'
          bb: String
          aa: Int
        }
      `,
      errors: [{ message: '"c" should be before "cc"' },{ message: '"bb" should be before "c"' }, { message: '"aa" should be before "bb"' }],
    },
    {
      name: 'should autofix if before comment is not on same line',
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        type Test {
          cc: Int
          c: Float # ok for 'bb' and 'aa' but not for 'cc' and 'c'
          bb: String
          aa: Int
        }
      `,
      errors: [{ message: '"c" should be before "cc"' },{ message: '"bb" should be before "c"' }, { message: '"aa" should be before "bb"' }],
    },
  ],
});
