import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/relay-arguments';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: ParserOptions } {
  return {
    code,
    parserOptions: {
      schema: /* GraphQL */ `
        ${code}
        type PostConnection
        type Query
      `,
    },
  };
}

ruleTester.runGraphQLTests('relay-arguments', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      type User {
        posts(
          after: String!
          first: Int!
          before: Float # should be fine as it's Scalar
          last: Int
        ): PostConnection
      }
    `),
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
        type User {
          posts: PostConnection
          comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        }
      `),
      errors: 1,
    },
    {
      ...useSchema(/* GraphQL */ `
        type User {
          posts(after: String, first: Int): PostConnection
        }
      `),
      errors: 1,
    },
  ],
});
