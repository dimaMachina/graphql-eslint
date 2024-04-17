import {
  objectWithIdHasToBeNullable,
  rule,
  unionTypesWithIdHasToBeNullable,
} from './index.js';
import { ruleTester, withSchema } from '../../../__tests__/test-utils.js';

ruleTester.run('nullable-records', rule, {
  valid: [
    withSchema({
      name: 'should allow nullability on type with ID',
      code: /* GraphQL */ `
        type Config {
          id: ID!
        }
        type Query {
          config: Config
        }
      `,
    }),
    withSchema({
      name: 'should allow nullability on type with ID in a list',
      code: /* GraphQL */ `
        type Config {
          id: ID!
        }
        type Query {
          configs: [Config]!
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability on type without ID which is in a list',
      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type Query {
          configs: [Config!]!
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability on union of types without ID, inside of a list',
      code: `
        type Config {
          name: String!
        }
        type Environment {
          name: String!
        }
        union ConfigOrEnvironment = Config | Environment
        type Query {
          configs: [ConfigOrEnvironment!]!
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability on union of types without ID',
      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type Environment {
          name: String!
        }
        union ConfigOrEnvironment = Config | Environment
        type Query {
          config: ConfigOrEnvironment!
        }
      `,
    }),
    withSchema({
      name: 'should enforce non-nullability on union inside of a list when one of types has ID',
      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type User {
          id: ID!
        }
        union ConfigOrUser = Config | User
        type Query {
          configs: [ConfigOrUser]!
        }
      `,
    }),
    withSchema({
      name: 'should enforce non-nullability on union when one of types has ID',
      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type User {
          id: ID!
        }
        union ConfigOrUser = Config | User
        type Query {
          config: ConfigOrUser
        }
      `,
    }),
    withSchema({
      name: 'should enforce non-nullability on nested type which has an ID',
      code: /* GraphQL */ `
        type Value {
          id: ID!
        }
        type Config {
          id: ID!
          value: Value
        }
        type Query {
          config: Config
        }
      `,
    }),
    withSchema({
      name: "should allow non-nullability on nested type which doesn't have an ID",
      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type User {
          id: ID!
          config: Config!
        }
        type Query {
          user: User
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability for input types that have ID',
      code: /* GraphQL */ `
        input Config {
          name: String!
        }
        input ConfigFilter {
          id: ID!
        }
        type Query {
          config(filter: ConfigFilter!): Config!
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability for list input types that have ID',
      code: /* GraphQL */ `
        input Config {
          name: String!
        }
        input ConfigFilter {
          id: ID!
        }
        type Query {
          config(filters: [ConfigFilter!]!): Config!
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability on interface without ID',
      code: /* GraphQL */ `
        interface User {
          name: String!
        }
        type Query {
          user: User!
        }
      `,
    }),
    withSchema({
      name: 'should enforce non-nullability on Node interface',
      code: /* GraphQL */ `
        interface Node {
          id: ID!
        }
        type Query {
          user: Node
        }
      `,
    }),
    withSchema({
      name: 'should allow non-nullability on types reachable only via mutation',
      code: /* GraphQL */ `
      interface Node {
        id: ID!
      }
      type Query {
        user: Node
      }
      type User {
        id: ID!
      }
      type Mutation {
        createUser: User!
      }
    `,
    }),
    withSchema({
      options: [{ whitelistPatterns: ['CreateUserSuccess'] }],
      name: 'should allow non-nullability with "success" suffix configuration',
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
        type CreateUserSuccess {
          user: User!
          users: [User!]!
        }
        union CreateUserPayload = CreateUserSuccess
        type Query {
          user: User
        }
        type Mutation {
          createUser: CreateUserPayload!
        }
      `,
    }),
  ],
  invalid: [
    withSchema({
      name: 'should disallow non-nullability on type with ID',
      errors: [{ message: objectWithIdHasToBeNullable('User') }],
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
        type Query {
          user: User!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on type with ID in a list and the list itself',
      errors: [{ message: objectWithIdHasToBeNullable('User') }],
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
        type Query {
          users: [User!]!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on type with ID in a nullable list',
      errors: [{ message: objectWithIdHasToBeNullable('User') }],
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
        type Query {
          users: [User!]
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on type with ID in nested non-nullable lists',
      errors: [{ message: objectWithIdHasToBeNullable('User') }],
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
        type Query {
          users: [[User!]!]!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on list of unions of types where at least one type has ID',
      errors: [
        {
          message: unionTypesWithIdHasToBeNullable('ConfigOrUser', ['User']),
        },
      ],

      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type User {
          id: ID!
        }
        union ConfigOrUser = Config | User
        type Query {
          configs: [ConfigOrUser!]!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on a union of types where at least one type has ID',
      errors: [
        {
          message: unionTypesWithIdHasToBeNullable('ConfigOrUser', ['User']),
        },
      ],
      code: /* GraphQL */ `
        type Config {
          name: String!
        }
        type User {
          id: ID!
        }
        union ConfigOrUser = Config | User
        type Query {
          config: ConfigOrUser!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on type that has ID',
      errors: [{ message: objectWithIdHasToBeNullable('User') }],
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
        type Query {
          user: User!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on type that references type with ID',
      errors: [
        {
          message: objectWithIdHasToBeNullable('Config'),
        },
        {
          message: objectWithIdHasToBeNullable('User'),
        },
      ],
      code: /* GraphQL */ `
        type Config {
          id: ID!
        }
        type User {
          id: ID!
          config: Config!
        }
        type Query {
          user: User!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on Node interface',
      errors: [
        {
          message: objectWithIdHasToBeNullable('Node'),
        },
      ],
      code: /* GraphQL */ `
        interface Node {
          id: ID!
        }
        type Query {
          user: Node!
        }
      `,
    }),
    withSchema({
      name: 'should disallow non-nullability on non-nullable list of Node interfaces',
      errors: [
        {
          message: objectWithIdHasToBeNullable('Node'),
        },
      ],

      code: /* GraphQL */ `
        interface Node {
          id: ID!
        }
        type Query {
          users: [Node!]!
        }
      `,
    }),
    withSchema({
      name: 'should disallow nullability on Node interface field',
      errors: [
        {
          message: objectWithIdHasToBeNullable('Config'),
        },
      ],
      code: /* GraphQL */ `
        interface Node {
          id: ID!
        }
        type Config implements Node {
          id: ID!
        }
        type User implements Node {
          id: ID!
          configs: [Config!]!
        }
        type Query {
          node(id: ID!): Node
        }
      `,
    }),
  ],
});
