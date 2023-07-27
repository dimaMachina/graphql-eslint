import { RuleTester } from '../src/testkit';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const ruleTester = new RuleTester();

ruleTester.run(
  'lone-schema-definition',
  GRAPHQL_JS_VALIDATIONS['lone-schema-definition'],
  {
    valid: [
      /* GraphQL */ `
        type Query {
          foo: String
        }

        schema {
          query: Query
        }
      `,
    ],
    invalid: [
      {
        code: /* GraphQL */ `
          type Query {
            foo: String
          }

          schema {
            query: Query
          }

          type RootQuery {
            foo: String
          }

          schema {
            query: RootQuery
          }
        `,
        errors: [{ message: 'Must provide only one schema definition.' }],
      },
    ],
  },
);
