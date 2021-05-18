import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/avoid-typename-prefix';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('avoid-typename-prefix', rule, {
  valid: [
    {
      code: /* GraphQL */ `
        type User {
          id: ID!
        }
      `,
    },
    {
      code: /* GraphQL */ `
        interface Node {
          id: ID!
        }
      `,
    },
    {
      code: /* GraphQL */ `
        type User {
          # eslint-disable-next-line
          userId: ID!
        }
      `,
    },
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        type User {
          userId: ID!
        }
      `,
      errors: [{ message: 'Field "userId" starts with the name of the parent type "User"' }],
    },
    {
      code: /* GraphQL */ `
        type User {
          userId: ID!
          userName: String!
        }
      `,
      errors: [
        { message: 'Field "userId" starts with the name of the parent type "User"' },
        { message: 'Field "userName" starts with the name of the parent type "User"' },
      ],
    },
    {
      code: /* GraphQL */ `
        interface Node {
          nodeId: ID!
        }
      `,
      errors: [{ message: 'Field "nodeId" starts with the name of the parent type "Node"' }],
    },
  ],
});
