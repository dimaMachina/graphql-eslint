import { GraphQLRuleTester, ParserOptions } from '../src';
import rule, { EdgeTypesConfig } from '../src/rules/relay-edge-types';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: ParserOptions } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests<[EdgeTypesConfig], true>('relay-edge-types', rule, {
  valid: [
    {
      name: 'when cursor returns string',
      options: [{ shouldImplementNode: false }],
      ...useSchema(/* GraphQL */ `
        type AEdge {
          node: Int!
          cursor: String!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
    {
      name: 'cursor returns scalar',
      ...useSchema(/* GraphQL */ `
        scalar Email
        type AEdge {
          node: Email!
          cursor: Email!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
    {
      name: 'with Edge suffix',
      options: [{ withEdgeSuffix: true }],
      ...useSchema(/* GraphQL */ `
        scalar Email
        type AEdge {
          node: Email!
          cursor: Email!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
    {
      name: 'should implements Node',
      options: [{ shouldImplementNode: true }],
      ...useSchema(/* GraphQL */ `
        interface Node {
          id: ID!
        }
        type User implements Node {
          id: ID!
        }
        type AEdge {
          node: User!
          cursor: String!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
    {
      name: 'should not throw when not Object type is used',
      ...useSchema(/* GraphQL */ `
        type AEdge {
          node: Int!
          cursor: String!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
  ],
  invalid: [
    {
      name: 'Edge type must be Object type',
      options: [{ shouldImplementNode: false, listTypeCanWrapOnlyEdgeType: false }],
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type BConnection
        type DConnection
        scalar AEdge
        union BEdge = PageInfo
        enum CEdge
        interface DEdge
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
        }
        extend type BConnection {
          edges: [BEdge!]
          pageInfo: PageInfo!
        }
        type CConnection {
          edges: [CEdge]!
          pageInfo: PageInfo!
        }
        extend type DConnection {
          edges: [DEdge!]!
          pageInfo: PageInfo!
        }
      `),
      errors: 4,
    },
    {
      name: 'should report when fields is missing',
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type AEdge
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
        }
      `),
      errors: 2,
    },
    {
      name: 'should report cursor when list is used',
      options: [{ shouldImplementNode: false, listTypeCanWrapOnlyEdgeType: false }],
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type AEdge {
          node: [PageInfo!]!
          cursor: [PageInfo!]!
        }
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
        }
      `),
      errors: 2,
    },
    {
      name: 'should report when without Edge suffix',
      options: [{ withEdgeSuffix: true }],
      ...useSchema(/* GraphQL */ `
        scalar Email
        type Aedge {
          node: Email!
          cursor: Email!
        }
        type AConnection {
          edges: [Aedge]
        }
      `),
      errors: 1,
    },
    {
      name: 'list type',
      options: [{ listTypeCanWrapOnlyEdgeType: true }],
      ...useSchema(/* GraphQL */ `
        type AEdge {
          node: Int!
          cursor: String!
        }
        type AConnection {
          edges: [AEdge]
        }
        type User {
          comments: [Int]
          likes: [Int!]
          messages: [Int]!
          posts: [Int!]!
        }
      `),
      errors: 4,
    },
    {
      name: 'should implements Node',
      options: [{ shouldImplementNode: true }],
      ...useSchema(/* GraphQL */ `
        type User {
          id: ID!
        }
        type AEdge {
          node: User!
          cursor: String!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
      errors: 1,
    },
  ],
});
