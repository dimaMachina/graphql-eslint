import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/no-hashtag-description';
import { Kind } from 'graphql';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-hashtag-description', rule, {
  valid: [
    {
      code: /* GraphQL */ `
        " test "
        type Query {
          foo: String
        }
      `,
    },
    {
      code: /* GraphQL */ `
        # Test

        type Query {
          foo: String
        }
      `,
    },
    {
      code: `#import t

        type Query {
          foo: String
        }
      `,
    },
    {
      code: /* GraphQL */ `
        # multiline
        # multiline
        # multiline
        # multiline

        type Query {
          foo: String
        }
      `,
    },
    {
      code: /* GraphQL */ `
        type Query {
          foo: String
        }

        # Test
      `,
    },
    {
      code: /* GraphQL */ `
        type Query {
          foo: String # this is also fine, comes after the definition
        }
      `,
    },
    {
      code: /* GraphQL */ `
        type Query { # this is also fine, comes after the definition
          foo: String
        } # this is also fine, comes after the definition
      `,
    },
    {
      code: /* GraphQL */ `
        type Query {
          foo: String
        }

        # Test
      `,
    },
    {
      code: /* GraphQL */ `
        # eslint-disable @graphql-eslint/no-unreachable-types

        "Types of 'unlessContainsTypes' omit"
        enum OmitTypes {
          "Scalar fields"
          scalar
          "Complex type fields"
          nonScalar
        }
      `,
    },
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        # Test
        type Query {
          foo: String
        }
      `,
      errors: [{ messageId: 'HASHTAG_COMMENT' }],
    },
    {
      code: /* GraphQL */ `
        type Query {
          # Test
          foo: String
        }
      `,
      errors: [{ messageId: 'HASHTAG_COMMENT' }],
    },
  ],
});
