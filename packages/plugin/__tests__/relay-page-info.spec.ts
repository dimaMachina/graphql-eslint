import { rule } from '../src/rules/relay-page-info';
import { ruleTester, withSchema } from './test-utils';

ruleTester.run('relay-page-info', rule, {
  valid: [
    withSchema({
      code: /* GraphQL */ `
        type PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String
          endCursor: String
        }
      `,
    }),
    withSchema({
      name: 'startCursor/endCursor can be Scalar',
      code: /* GraphQL */ `
        type PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: Int
          endCursor: Float
        }
      `,
    }),
  ],
  invalid: [
    withSchema({
      code: 'scalar PageInfo',
      errors: 1,
    }),
    withSchema({
      name: 'when union',
      code: /* GraphQL */ `
        union PageInfo = UserConnection | Post
        extend union PageInfo = Comment
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo!
        }
        type Post
        type Comment
        type UserEdge
      `,
      errors: 2,
    }),
    withSchema({
      name: 'when input',
      code: /* GraphQL */ `
        input PageInfo
        extend input PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String
          endCursor: String
        }
      `,
      errors: 2,
    }),
    withSchema({
      name: 'when enum',
      code: /* GraphQL */ `
        enum PageInfo
        extend enum PageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      `,
      errors: 2,
    }),
    withSchema({
      name: 'when interface',
      code: /* GraphQL */ `
        interface PageInfo
        extend interface PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String
          endCursor: String
        }
      `,
      errors: 2,
    }),
    withSchema({
      name: 'when extend type',
      code: /* GraphQL */ `
        type PageInfo
        extend type PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String
          endCursor: String
        }
      `,
      errors: 4,
    }),
    withSchema({
      name: 'when fields is missing or incorrect return type',
      code: /* GraphQL */ `
        type PageInfo {
          hasPreviousPage: [Boolean!]!
          startCursor: [String]
        }
      `,
      errors: 4,
    }),
    withSchema({
      name: 'when `PageInfo` is missing',
      code: 'type Query',
      errors: 1,
    }),
  ],
});
