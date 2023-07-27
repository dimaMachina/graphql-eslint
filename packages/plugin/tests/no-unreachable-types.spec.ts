import { ParserOptions } from '../src';
import { RuleTester } from '../src/testkit';
import { rule } from '../src/rules/no-unreachable-types';

const useSchema = (
  schema: string,
): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } => {
  return {
    parserOptions: { schema },
    code: schema,
  };
};

const ruleTester = new RuleTester();

ruleTester.run('no-unreachable-types', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      scalar A
      scalar B

      # UnionTypeDefinition
      union Response = A | B

      type Query {
        foo: Response
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        me: User
      }

      # ObjectTypeDefinition
      type User {
        id: ID
        name: String
      }
    `),
    useSchema(/* GraphQL */ `
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
    `),
    useSchema(/* GraphQL */ `
      # ScalarTypeDefinition
      scalar DateTime

      type Query {
        now: DateTime
      }
    `),
    useSchema(/* GraphQL */ `
      # EnumTypeDefinition
      enum Role {
        ADMIN
        USER
      }

      type Query {
        role: Role
      }
    `),
    useSchema(/* GraphQL */ `
      input UserInput {
        id: ID
      }

      type Query {
        # InputValueDefinition
        user(input: UserInput!): Boolean
      }
    `),
    useSchema(/* GraphQL */ `
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
    `),
    useSchema(/* GraphQL */ `
      type RootQuery
      type RootMutation
      type RootSubscription

      schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
      }
    `),
    useSchema(/* GraphQL */ `
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
    `),
    {
      name: 'directive on schema',
      ...useSchema(/* GraphQL */ `
        type Query

        schema @good {
          query: Query
        }

        directive @good on SCHEMA
      `),
    },
    {
      name: 'should ignore directive with request locations',
      ...useSchema(/* GraphQL */ `
        directive @q on QUERY
        directive @w on MUTATION
        directive @e on SUBSCRIPTION
        directive @r on FIELD
        directive @t on FRAGMENT_DEFINITION
        directive @y on FRAGMENT_SPREAD
        directive @u on INLINE_FRAGMENT
        directive @i on VARIABLE_DEFINITION
        type Query
      `),
    },
    {
      name: 'should ignore types from directive arguments with request locations',
      ...useSchema(/* GraphQL */ `
        enum Enum {
          A
          B
        }
        directive @q(arg: Enum = A) on QUERY
        type Query
      `),
    },
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
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
      `),
      errors: [
        { message: 'Interface type `Node` is unreachable.' },
        { message: 'Interface type `User` is unreachable.' },
        { message: 'Object type `SuperUser` is unreachable.' },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
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
      `),
      errors: [
        { message: 'Scalar type `DateTime` is unreachable.' },
        { message: 'Enum type `Role` is unreachable.' },
        { message: 'Directive `auth` is unreachable.' },
        { message: 'Union type `Union` is unreachable.' },
        { message: 'Input object type `UsersFilter` is unreachable.' },
        { message: 'Interface type `Address` is unreachable.' },
        { message: 'Object type `User` is unreachable.' },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
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
      `),
      errors: [{ message: 'Scalar type `DateTime` is unreachable.' }],
    },
    {
      ...useSchema(/* GraphQL */ `
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
      `),
      errors: [
        { message: 'Interface type `User` is unreachable.' },
        { message: 'Object type `SuperUser` is unreachable.' },
        { message: 'Object type `SuperUser` is unreachable.' },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
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
      `),
      errors: [{ message: 'Scalar type `DateTime` is unreachable.' }],
    },
  ],
});
