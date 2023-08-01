import { rules } from '../src';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { DEFAULT_CONFIG } from './test-utils';

const ruleTester = new RuleTester({
  ...DEFAULT_CONFIG,
  schema: /* GraphQL */ `
    type User {
      id: ID!
    }

    type Query {
      user: User
    }
  `,
});

ruleTester.run<[{ ignoreClientDirectives: string[] }]>(
  'known-directives',
  rules['known-directives'],
  {
    valid: [
      {
        code: /* GraphQL */ `
          {
            user {
              firstName @client
            }
          }
        `,
        options: [{ ignoreClientDirectives: ['client'] }],
      },
      {
        code: /* GraphQL */ `
          {
            getIp @rest(path: "/all.json", type: "GET", endpoint: "ip") {
              ip: ip_addr
            }
          }
        `,
        options: [{ ignoreClientDirectives: ['rest'] }],
      },
      {
        code: /* GraphQL */ `
          query @api {
            test
          }
        `,
        options: [{ ignoreClientDirectives: ['api'] }],
      },
    ],
    invalid: [
      {
        name: 'should work only with Kind.FIELD',
        code: 'scalar Foo @bad',
        options: [{ ignoreClientDirectives: ['bad'] }],
        errors: [{ message: 'Unknown directive "@bad".' }],
      },
    ],
  },
);
