import { rule } from '../src/rules/no-unreachable-types';
import { ruleTester, withSchema } from './test-utils';

ruleTester.run('no-unreachable-types', rule, {
  valid: [
    withSchema({
      code: /* GraphQL */ `
        scalar A
        scalar B

        # UnionTypeDefinition
        union Response = A | B

        type Query {
          foo: Response
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        type Query {
          me: User
        }

        # ObjectTypeDefinition
        type User {
          id: ID
          name: String
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        type Query {
          me: User
        }

        # InterfaceTypeDefinition
        interface Address {
          city: String
        }

        type User implements Address {
          city: String
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        # ScalarTypeDefinition
        scalar DateTime

        type Query {
          now: DateTime
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        # EnumTypeDefinition
        enum Role {
          ADMIN
          USER
        }

        type Query {
          role: Role
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        input UserInput {
          id: ID
        }

        type Query {
          # InputValueDefinition
          user(input: UserInput!): Boolean
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        # DirectiveDefinition
        directive @auth(role: [Role!]!) on FIELD_DEFINITION

        enum Role {
          ADMIN
          USER
        }

        type Query {
          # Directive
          user: ID @auth(role: [ADMIN])
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        type RootQuery
        type RootMutation
        type RootSubscription

        schema {
          query: RootQuery
          mutation: RootMutation
          subscription: RootSubscription
        }
      `,
    }),
    withSchema({
      code: /* GraphQL */ `
        interface User {
          id: ID!
        }

        interface Manager implements User {
          id: ID!
        }

        type TopManager implements Manager {
          id: ID!
          name: String
        }

        type Query {
          me: User
        }
      `,
    }),
    withSchema({
      name: 'directive on schema',
      code: /* GraphQL */ `
        type Query

        schema @good {
          query: Query
        }

        directive @good on SCHEMA
      `,
    }),
    withSchema({
      name: 'should ignore directive with request locations',
      code: /* GraphQL */ `
        directive @q on QUERY
        directive @w on MUTATION
        directive @e on SUBSCRIPTION
        directive @r on FIELD
        directive @t on FRAGMENT_DEFINITION
        directive @y on FRAGMENT_SPREAD
        directive @u on INLINE_FRAGMENT
        directive @i on VARIABLE_DEFINITION
        type Query
      `,
    }),
    withSchema({
      name: 'should ignore types from directive arguments with request locations',
      code: /* GraphQL */ `
        enum Enum {
          A
          B
        }
        directive @q(arg: Enum = A) on QUERY
        type Query
      `,
    }),
  ],
  invalid: [
    withSchema({
      code: /* GraphQL */ `
        type Query {
          node(id: ID!): AnotherNode!
        }

        interface Node {
          id: ID!
        }

        interface AnotherNode {
          createdAt: String
        }

        interface User implements Node {
          id: ID!
          name: String
        }

        type SuperUser implements User & Node {
          id: ID!
          name: String
          address: String
        }
      `,
      errors: [
        { message: 'Interface type `Node` is unreachable.' },
        { message: 'Interface type `User` is unreachable.' },
        { message: 'Object type `SuperUser` is unreachable.' },
      ],
    }),
    withSchema({
      code: /* GraphQL */ `
        # ScalarTypeDefinition
        scalar DateTime

        # EnumTypeDefinition
        enum Role {
          ADMIN
          USER
        }

        # DirectiveDefinition
        directive @auth(role: [String!]!) on FIELD_DEFINITION

        # UnionTypeDefinition
        union Union = String | Boolean

        # InputObjectTypeDefinition
        input UsersFilter {
          limit: Int
        }

        # InterfaceTypeDefinition
        interface Address {
          city: String
        }

        # ObjectTypeDefinition
        type User implements Address {
          city: String
        }
      `,
      errors: [
        { message: 'Scalar type `DateTime` is unreachable.' },
        { message: 'Enum type `Role` is unreachable.' },
        { message: 'Directive `auth` is unreachable.' },
        { message: 'Union type `Union` is unreachable.' },
        { message: 'Input object type `UsersFilter` is unreachable.' },
        { message: 'Interface type `Address` is unreachable.' },
        { message: 'Object type `User` is unreachable.' },
      ],
    }),
    withSchema({
      code: /* GraphQL */ `
        interface User {
          id: String
        }

        type SuperUser implements User {
          id: String
          superDetail: SuperDetail
        }

        type SuperDetail {
          detail: String
        }

        type Query {
          user: User!
        }

        scalar DateTime
      `,
      errors: [{ message: 'Scalar type `DateTime` is unreachable.' }],
    }),
    withSchema({
      code: /* GraphQL */ `
        interface User {
          id: String
        }

        interface AnotherUser {
          createdAt: String
        }

        type SuperUser implements User {
          id: String
        }

        # ObjectTypeExtension
        extend type SuperUser {
          detail: String
        }

        type Query {
          user: AnotherUser!
        }
      `,
      errors: [
        { message: 'Interface type `User` is unreachable.' },
        { message: 'Object type `SuperUser` is unreachable.' },
        { message: 'Object type `SuperUser` is unreachable.' },
      ],
    }),
    withSchema({
      code: /* GraphQL */ `
        type Query {
          node(id: ID!): Node!
        }

        interface Node {
          id: ID!
        }

        interface User implements Node {
          id: ID!
          name: String
        }

        type SuperUser implements User & Node {
          id: ID!
          name: String
          address: String
        }

        scalar DateTime
      `,
      errors: [{ message: 'Scalar type `DateTime` is unreachable.' }],
    }),
  ],
});
