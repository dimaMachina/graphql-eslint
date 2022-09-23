import { GraphQLRuleTester, rules } from '../src';

const ruleTester = new GraphQLRuleTester({
  schema: /* GraphQL */ `
    type User {
      id: ID!
    }

    type Query {
      user: User
    }
  `,
});

ruleTester.runGraphQLTests<[{ ignoreClientDirectives: string[] }]>(
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
  }
);
