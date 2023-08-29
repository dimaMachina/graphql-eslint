import { rule, RuleOptions } from '../src/rules/alphabetize';
import { ruleTester } from './test-utils';

const GROUP_ORDER_TEST = /* GraphQL */ `
  type User {
    firstName: Int
    createdAt: DateTime
    author: Int
    wagon: Int
    id: ID
    foo: Int
    updatedAt: DateTime
    bar: Int
    nachos: Int
    guild: Int
  }
`;

ruleTester.run<RuleOptions>('alphabetize', rule, {
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
      options: [{ values: true }],
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
        { message: 'field "firstName" should be before field "password"' },
        { message: 'field "age" should be before field "firstName"' },
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
      errors: [{ message: 'field "lastName" should be before field "password"' }],
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
      errors: [
        { message: 'field "bb" should be before field "cc"' },
        { message: 'field "aa" should be before field "bb"' },
      ],
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
        { message: 'input value "firstName" should be before input value "password"' },
        { message: 'input value "age" should be before input value "firstName"' },
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
      errors: [{ message: 'input value "lastName" should be before input value "password"' }],
    },
    {
      options: [{ values: true }],
      code: /* GraphQL */ `
        enum Role {
          SUPER_ADMIN
          ADMIN
          USER
          GOD
        }
      `,
      errors: [
        { message: 'enum value "ADMIN" should be before enum value "SUPER_ADMIN"' },
        { message: 'enum value "GOD" should be before enum value "USER"' },
      ],
    },
    {
      options: [{ values: true }],
      code: /* GraphQL */ `
        extend enum Role {
          ADMIN
          SUPER_ADMIN
          GOD
          USER
        }
      `,
      errors: [{ message: 'enum value "GOD" should be before enum value "SUPER_ADMIN"' }],
    },
    {
      options: [{ arguments: ['DirectiveDefinition'] }],
      code: /* GraphQL */ `
        directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
      `,
      errors: [
        { message: 'input value "bb" should be before input value "cc"' },
        { message: 'input value "aa" should be before input value "bb"' },
      ],
    },
    {
      options: [{ arguments: ['FieldDefinition'] }],
      code: /* GraphQL */ `
        type Query {
          test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
        }
      `,
      errors: [
        { message: 'input value "bb" should be before input value "cc"' },
        { message: 'input value "aa" should be before input value "bb"' },
      ],
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
      errors: [
        { message: 'field "bb" should be before field "cc"' },
        { message: 'field "aa" should be before field "bb"' },
      ],
    },
    {
      options: [{ selections: ['OperationDefinition'] }],
      code: /* GraphQL */ `
        query {
          test {
            cc
            ... on Test {
              ccc
              bbb
              aaa
            }
            bb
            aa
          }
        }
      `,
      errors: [
        { message: 'field "bbb" should be before field "ccc"' },
        { message: 'field "aaa" should be before field "bbb"' },
        { message: 'field "bb" should be before inline fragment' },
        { message: 'field "aa" should be before field "bb"' },
      ],
    },
    {
      options: [{ variables: true, arguments: ['Field'] }],
      code: /* GraphQL */ `
        mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
          test(ccc: $cc, bbb: $bb, aaa: $aa) {
            something
          }
        }
      `,
      errors: [
        { message: 'variable "bb" should be before variable "cc"' },
        { message: 'variable "aa" should be before variable "bb"' },
        { message: 'argument "bbb" should be before argument "ccc"' },
        { message: 'argument "aaa" should be before argument "bbb"' },
      ],
    },
    {
      name: 'should move comment',
      options: [{ fields: ['ObjectTypeDefinition'] }],
      code: /* GraphQL */ `
        type Test { # { character
          # before d 1

          # before d 2
          d: Int # same d
          # before c
          c: Float!
          # before b 1
          # before b 2
          b: [String] # same b
          # before a
          a: [Int!]! # same a
          # end
        } # } character
      `,
      errors: [
        { message: 'field "c" should be before field "d"' },
        { message: 'field "b" should be before field "c"' },
        { message: 'field "a" should be before field "b"' },
      ],
    },
    {
      name: 'should compare with lexicographic order',
      options: [{ values: true }],
      code: /* GraphQL */ `
        enum Test {
          "qux"
          qux
          foo
          "Bar"
          Bar
          """
          bar
          """
          bar
        }
      `,
      errors: [
        { message: 'enum value "foo" should be before enum value "qux"' },
        { message: 'enum value "Bar" should be before enum value "foo"' },
        { message: 'enum value "bar" should be before enum value "Bar"' },
      ],
    },
    {
      name: 'should sort definitions',
      options: [{ definitions: true }],
      code: /* GraphQL */ `
        # START

        # before1 extend union Data
        # before2 extend union Data
        extend union Data = Role # same extend union Data
        # before extend input UserInput
        extend input UserInput {
          email: Email!
        } # same extend input UserInput
        # before fragment UserFields
        fragment UserFields on User {
          id
        } # same fragment UserFields
        # before type User
        type User # same type User
        # before extend enum Role
        extend enum Role {
          SUPERMAN
        } # same extend enum Role
        # before anonymous operation
        query {
          foo
        } # same anonymous operation
        # before mutation CreateUser
        mutation CreateUser {
          createUser
        } # same mutation CreateUser
        # before extend interface Node
        extend interface Node {
          createdAt: String!
        } # same extend interface Node
        # before extend interface Node
        extend interface Node {
          updatedAt: String!
        } # same extend interface Node
        # before type RootQuery
        type RootQuery # same type RootQuery
        # before interface Node
        interface Node # same interface Node
        # before enum Role
        enum Role # same enum Role
        # before scalar Email
        scalar Email # same scalar Email
        # before input UserInput
        input UserInput # same input UserInput
        # before extend type User
        extend type User {
          firstName: String!
        } # same extend type User
        # before schema definition
        schema {
          query: RootQuery
        } # same schema definition
        # before union Data
        union Data = User | Node # same union Data
        # before directive @auth
        directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth

        # END
      `,
      errors: [
        { message: 'fragment "UserFields" should be before input "UserInput"' },
        { message: 'type "User" should be before fragment "UserFields"' },
        { message: 'enum "Role" should be before type "User"' },
        { message: 'mutation "CreateUser" should be before operation definition' },
        { message: 'interface "Node" should be before type "RootQuery"' },
        { message: 'scalar "Email" should be before enum "Role"' },
        { message: 'type "User" should be before input "UserInput"' },
        { message: 'union "Data" should be before schema definition' },
        { message: 'directive "auth" should be before union "Data"' },
      ],
    },
    {
      name: 'should sort when selection is aliased',
      options: [{ selections: ['OperationDefinition'] }],
      code: /* GraphQL */ `
        {
          # start
          lastName: lastname # lastName comment
          fullName: fullname # fullName comment
          firsName: firstname # firsName comment
          # end
        }
      `,
      errors: [
        { message: 'field "fullName" should be before field "lastName"' },
        { message: 'field "firsName" should be before field "fullName"' },
      ],
    },
    {
      name: 'should sort by group when `*` is between',
      options: [
        {
          fields: ['ObjectTypeDefinition'],
          groups: ['id', '*', 'createdAt', 'updatedAt'],
        },
      ],
      code: GROUP_ORDER_TEST,
      errors: [
        { message: 'field "author" should be before field "createdAt"' },
        { message: 'field "id" should be before field "wagon"' },
        { message: 'field "bar" should be before field "updatedAt"' },
        { message: 'field "guild" should be before field "nachos"' },
      ],
    },
    {
      name: 'should sort by group when `*` is at the end',
      options: [
        {
          fields: ['ObjectTypeDefinition'],
          groups: ['updatedAt', 'id', 'createdAt', '*'],
        },
      ],
      code: GROUP_ORDER_TEST,
      errors: [
        { message: 'field "createdAt" should be before field "firstName"' },
        { message: 'field "id" should be before field "wagon"' },
        { message: 'field "updatedAt" should be before field "foo"' },
        { message: 'field "guild" should be before field "nachos"' },
      ],
    },
    {
      name: 'should sort by group when `*` at the start',
      options: [
        {
          fields: ['ObjectTypeDefinition'],
          groups: ['*', 'updatedAt', 'id', 'createdAt'],
        },
      ],
      code: GROUP_ORDER_TEST,
      errors: [
        { message: 'field "author" should be before field "createdAt"' },
        { message: 'field "foo" should be before field "id"' },
        { message: 'field "bar" should be before field "updatedAt"' },
        { message: 'field "guild" should be before field "nachos"' },
      ],
    },
    {
      name: 'should sort selections by group when `*` is between',
      options: [
        {
          selections: ['OperationDefinition'],
          groups: ['id', '*', 'createdAt', 'updatedAt'],
        },
      ],
      code: /* GraphQL */ `
        {
          zz
          updatedAt
          createdAt
          aa
          id
        }
      `,
      errors: 3,
    },
  ],
});
