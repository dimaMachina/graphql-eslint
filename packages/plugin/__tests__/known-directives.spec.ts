// @ts-expect-error -- add `"type": "module"` to `package.json` to fix this
import { RuleTester } from '@theguild/eslint-rule-tester';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { DEFAULT_CONFIG, ParserOptionsForTests } from './test-utils';

const ruleTester = new RuleTester<ParserOptionsForTests>({
  ...DEFAULT_CONFIG,
  parserOptions: {
    graphQLConfig: {
      schema: /* GraphQL */ `
        type User {
          id: ID!
        }

        type Query {
          user: User
        }
      `,
    },
  },
});

ruleTester.run<[{ ignoreClientDirectives: string[] }]>(
  'known-directives',
  // @ts-expect-error -- I don't know why it's complaining
  GRAPHQL_JS_VALIDATIONS['known-directives'],
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
