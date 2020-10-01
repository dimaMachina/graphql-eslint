import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/no-anonymous-operations';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('test-directives', rule, {
  valid: [
    {
      code: /* GraphQL */ `
        # eslint-disable-next-line
        query {
          a
        }
      `,
    },
    {
      code: /* GraphQL */ `
        # eslint-disable-next-line test-directives
        query {
          a
        }
      `,
    },
    {
      code: `
        query { # eslint-disable-line test-directives
          a
        }
      `,
    },
    {
      code: `
        query { # eslint-disable-line
          a
        }
      `,
    },
    {
      code: /* GraphQL */ `
        # eslint-disable
        query {
          a
        }
      `,
    },
    {
      code: /* GraphQL */ `
        # eslint-disable
        query {
          a
        }
      `,
    },
  ],
  invalid: [
    {
      errors: 2,
      code: /* GraphQL */ `
        # eslint-disable-next-line non-existing-rule
        query {
          a
        }
      `,
    },
    {
      code: /* GraphQL */ `
        query {
          a
        }
      `,
      errors: 1,
    },
  ],
});
