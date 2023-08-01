import { rule } from '../src/rules/no-typename-prefix';
import { ruleTester } from './test-utils';

ruleTester.run('no-typename-prefix', rule, {
  valid: [
    /* GraphQL */ `
      type User {
        id: ID!
      }
    `,
    /* GraphQL */ `
      interface Node {
        id: ID!
      }
    `,
    /* GraphQL */ `
      type User {
        # eslint-disable-next-line
        userId: ID!
      }
    `,
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
