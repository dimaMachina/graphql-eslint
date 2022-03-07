import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/relay-page-info';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: ParserOptions } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests('relay-page-info', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      type PageInfo {
        hasPreviousPage: Boolean!
        hasNextPage: Boolean!
        startCursor: String!
        endCursor: String!
      }
    `),
  ],
  invalid: [
    {
      ...useSchema('scalar PageInfo'),
      errors: 1,
    },
    {
      name: 'when union',
      ...useSchema(/* GraphQL */ `
        union PageInfo = UserConnection | Post
        extend union PageInfo = Comment
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo!
        }
        type Post
        type Comment
        type UserEdge
      `),
      errors: 2,
    },
    {
      name: 'when input',
      ...useSchema(/* GraphQL */ `
        input PageInfo
        extend input PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String!
          endCursor: String!
        }
      `),
      errors: 2,
    },
    {
      name: 'when enum',
      ...useSchema(/* GraphQL */ `
        enum PageInfo
        extend enum PageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      `),
      errors: 2,
    },
    {
      name: 'when interface',
      ...useSchema(/* GraphQL */ `
        interface PageInfo
        extend interface PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String!
          endCursor: String!
        }
      `),
      errors: 2,
    },
    {
      name: 'when extend type',
      ...useSchema(/* GraphQL */ `
        type PageInfo
        extend type PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String!
          endCursor: String!
        }
      `),
      errors: 4,
    },
    {
      name: 'when fields is missing or incorrect return type',
      ...useSchema(/* GraphQL */ `
        type PageInfo {
          hasPreviousPage: Boolean
          startCursor: String
        }
      `),
      errors: 4,
    },
    {
      name: 'when `PageInfo` is missing',
      ...useSchema('type Query'),
      errors: 1,
    },
  ],
});
