import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule, RuleOptions } from '../src/rules/relay-arguments';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } {
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

ruleTester.runGraphQLTests<RuleOptions, true>('relay-arguments', rule, {
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
    {
      name: '`includeBoth` should not report about missing opposite pagination arguments',
      options: [{ includeBoth: false }],
      ...useSchema(/* GraphQL */ `
        type User {
          posts(after: String!, first: Int!): PostConnection
          comments(before: Float, last: Int): PostConnection
        }
      `),
    },
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
        type User {
          posts: PostConnection
          comments(
            after: [String!]!
            first: Float
            before: Query
            last: [PostConnection]
          ): PostConnection
        }
      `),
      errors: 5,
    },
    {
      ...useSchema(/* GraphQL */ `
        type User {
          posts(after: String, first: Int): PostConnection
        }
      `),
      errors: 2,
    },
    {
      name: 'should report about 2nd required argument if 1st was provided',
      options: [{ includeBoth: false }],
      ...useSchema(/* GraphQL */ `
        type User {
          posts(after: String, first: Int, before: Float): PostConnection
        }
      `),
      errors: 1,
    },
  ],
});
