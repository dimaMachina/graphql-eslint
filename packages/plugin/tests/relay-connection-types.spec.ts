import { GraphQLRuleTester } from '../src';
import rule from '../src/rules/relay-connection-types';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('relay-connection-types', rule, {
  valid: [
    {
      name: 'follow Relay spec',
      code: /* GraphQL */ `
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo!
        }
      `,
    },
    {
      name: '`edges` field should return a list type that wraps an edge type',
      code: /* GraphQL */ `
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo!
        }
        type PostConnection {
          edges: [PostEdge!]
          pageInfo: PageInfo!
        }
        type CommentConnection {
          edges: [CommentEdge]!
          pageInfo: PageInfo!
        }
        type AddressConnection {
          edges: [AddressEdge!]!
          pageInfo: PageInfo!
        }
      `,
    },
    /* GraphQL */ `
      type UserConnection {
        edges: [UserEdge]
        pageInfo: PageInfo!
      }
    `,
    /* GraphQL */ `
      extend type UserConnection {
        edges: [UserEdge]
        pageInfo: PageInfo!
      }
    `,
  ],
  invalid: [
    {
      name: 'should report about non connection types with `Connection` suffix',
      code: /* GraphQL */ `
        scalar DateTimeConnection
        union DataConnection = Post
        extend union DataConnection = Comment
        input CreateUserConnection
        extend input CreateUserConnection {
          firstName: String
        }
        enum RoleConnection
        extend enum RoleConnection {
          ADMIN
        }
        interface NodeConnection
        extend interface NodeConnection {
          id: ID!
        }
        type Post
        type Comment
      `,
      errors: 9,
    },
    {
      name: 'should report about missing `Connection` suffix',
      code: /* GraphQL */ `
        type User {
          edges: UserEdge
          pageInfo: PageInfo
        }
      `,
      errors: 1,
    },
    {
      name: 'should report about missing `edges` field',
      code: 'type UserConnection { pageInfo: PageInfo! }',
      errors: 1,
    },
    {
      name: 'should report about missing `pageInfo` field',
      code: 'type UserConnection { edges: [UserEdge] }',
      errors: 1,
    },
    {
      name: '`edges` field should return a list type that wraps an edge type',
      code: /* GraphQL */ `
        type AConnection {
          edges: AEdge
          pageInfo: PageInfo!
        }
        type BConnection {
          edges: BEdge!
          pageInfo: PageInfo!
        }
      `,
      errors: 2,
    },
    {
      name: '`pageInfo` field must return a non-null `PageInfo` object',
      code: /* GraphQL */ `
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo
        }
        type BConnection {
          edges: [BEdge]
          pageInfo: [PageInfo]
        }
        type CConnection {
          edges: [CEdge]
          pageInfo: [PageInfo!]
        }
        type DConnection {
          edges: [DEdge]
          pageInfo: [PageInfo]!
        }
        type EConnection {
          edges: [EEdge]
          pageInfo: [PageInfo!]!
        }
      `,
      errors: 5,
    },
  ],
});
