import { GraphQLRuleTester } from '../src';
import { rule, RuleOptions } from '../src/rules/alphabetize';

const ruleTester = new GraphQLRuleTester();

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

ruleTester.runGraphQLTests<RuleOptions>('alphabetize', rule, {
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
        { message: '`firstName` should be before `password`.' },
        { message: '`age` should be before `firstName`.' },
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
      errors: [{ message: '`lastName` should be before `password`.' }],
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
        { message: '`bb` should be before `cc`.' },
        { message: '`aa` should be before `bb`.' },
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
        { message: '`firstName` should be before `password`.' },
        { message: '`age` should be before `firstName`.' },
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
      errors: [{ message: '`lastName` should be before `password`.' }],
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
      errors: [
        { message: '`ADMIN` should be before `SUPER_ADMIN`.' },
        { message: '`GOD` should be before `USER`.' },
      ],
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
      errors: [{ message: '`GOD` should be before `SUPER_ADMIN`.' }],
    },
    {
      options: [{ arguments: ['DirectiveDefinition'] }],
      code: /* GraphQL */ `
        directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
      `,
      errors: [
        { message: '`bb` should be before `cc`.' },
        { message: '`aa` should be before `bb`.' },
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
        { message: '`bb` should be before `cc`.' },
        { message: '`aa` should be before `bb`.' },
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
        { message: '`bb` should be before `cc`.' },
        { message: '`aa` should be before `bb`.' },
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
        { message: '`bbb` should be before `ccc`.' },
        { message: '`aaa` should be before `bbb`.' },
        { message: '`bb` should be before inline fragment.' },
        { message: '`aa` should be before `bb`.' },
      ],
    },
    {
      options: [{ variables: ['OperationDefinition'], arguments: ['Field'] }],
      code: /* GraphQL */ `
        mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
          test(ccc: $cc, bbb: $bb, aaa: $aa) {
            something
          }
        }
      `,
      errors: [
        { message: '`bb` should be before `cc`.' },
        { message: '`aa` should be before `bb`.' },
        { message: '`bbb` should be before `ccc`.' },
        { message: '`aaa` should be before `bbb`.' },
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
        { message: '`c` should be before `d`.' },
        { message: '`b` should be before `c`.' },
        { message: '`a` should be before `b`.' },
      ],
    },
    {
      name: 'should compare with lexicographic order',
      options: [{ values: ['EnumTypeDefinition'] }],
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
        { message: '`foo` should be before `qux`.' },
        { message: '`Bar` should be before `foo`.' },
        { message: '`bar` should be before `Bar`.' },
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
        { message: '`UserFields` should be before `UserInput`.' },
        { message: '`User` should be before `UserFields`.' },
        { message: '`Role` should be before `User`.' },
        { message: '`CreateUser` should be before operation definition.' },
        { message: '`Node` should be before `RootQuery`.' },
        { message: '`Email` should be before `Role`.' },
        { message: '`User` should be before `UserInput`.' },
        { message: '`Data` should be before schema definition.' },
        { message: '`auth` should be before `Data`.' },
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
        { message: '`fullName` should be before `lastName`.' },
        { message: '`firsName` should be before `fullName`.' },
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
        { message: '`author` should be before `createdAt`.' },
        { message: '`id` should be before `wagon`.' },
        { message: '`bar` should be before `updatedAt`.' },
        { message: '`guild` should be before `nachos`.' },
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
        { message: '`createdAt` should be before `firstName`.' },
        { message: '`id` should be before `wagon`.' },
        { message: '`updatedAt` should be before `foo`.' },
        { message: '`guild` should be before `nachos`.' },
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
        { message: '`author` should be before `createdAt`.' },
        { message: '`foo` should be before `id`.' },
        { message: '`bar` should be before `updatedAt`.' },
        { message: '`guild` should be before `nachos`.' },
      ],
    },
  ],
});
