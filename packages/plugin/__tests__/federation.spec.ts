import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation.js';
import { ruleTester, withSchema } from './test-utils.js';

ruleTester.run('federation', GRAPHQL_JS_VALIDATIONS['known-directives'], {
  valid: [
    withSchema({
      name: 'should parse federation directive without errors',
      code: /* GraphQL */ `
        scalar DateTime

        type Post @key(fields: "id") {
          id: ID!
          title: String
          createdAt: DateTime
          modifiedAt: DateTime
        }

        type Query {
          post: Post!
          posts: [Post!]
        }

        extend schema @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])
      `,
    }),
  ],
  invalid: [],
});
