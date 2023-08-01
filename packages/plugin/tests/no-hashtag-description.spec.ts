import { rule, RULE_ID } from '../src/rules/no-hashtag-description';
import { ruleTester } from './test-utils';

ruleTester.run('no-hashtag-description', rule, {
  valid: [
    /* GraphQL */ `
      " Good "
      type Query {
        foo: String
      }
    `,
    /* GraphQL */ `
      # Good

      type Query {
        foo: String
      }
      # Good
    `,
    /* GraphQL */ `
      #import t

      type Query {
        foo: String
      }
    `,
    /* GraphQL */ `
      # multiline
      # multiline
      # multiline

      type Query {
        foo: String
      }
    `,
    /* GraphQL */ `
      type Query { # Good
        foo: String # Good
      } # Good
    `,
    /* GraphQL */ `
      # eslint-disable-next-line
      type Query {
        foo: String
      }
    `,
    /* GraphQL */ `
      type Query {
        # Good

        foo: ID
      }
    `,
    /* GraphQL */ `
      type Query {
        foo: ID
        # Good

        bar: ID
      }
    `,
    /* GraphQL */ `
      type Query {
        user(
          # Good

          id: Int
        ): User
      }
    `,
    /* GraphQL */ `
      # ok
      query {
        test
      }
    `,
    /* GraphQL */ `
      # ok
      mutation {
        test
      }
    `,
    /* GraphQL */ `
      # ok
      subscription {
        test
      }
    `,
    /* GraphQL */ `
      # ok
      fragment UserFields on User {
        id
      }
    `,
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        # Bad
        type Query {
          foo: String
        }
      `,
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: /* GraphQL */ `
        # multiline
        # multiline
        type Query {
          foo: String
        }
      `,
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: /* GraphQL */ `
        type Query {
          # Bad
          foo: String
        }
      `,
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: /* GraphQL */ `
        type Query {
          bar: ID
          # Bad
          foo: ID
          # Good
        }
      `,
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: /* GraphQL */ `
        type Query {
          user(
            # Bad
            id: Int!
          ): User
        }
      `,
      errors: [{ messageId: RULE_ID }],
    },
  ],
});
