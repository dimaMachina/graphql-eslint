import { GraphQLRuleTester } from '../src/testkit';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { ParserOptions } from '../src/types';

const TEST_SCHEMA = /* GraphQL */`
  type Query {
    foo: String
    bar: Boolean
  }
`;

const WITH_SCHEMA = {
  parserOptions: <ParserOptions>{
    schema: TEST_SCHEMA,
    operations: [],
  },
};

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('unique-type-names', GRAPHQL_JS_VALIDATIONS['unique-type-names'], {
  valid: [
    { ...WITH_SCHEMA, code: TEST_SCHEMA },
    {
      ...WITH_SCHEMA, code: /* GraphQL */`
        type Query {
          foo: String
        }

        extend type Query {
          bar: Boolean
        }
      `,
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: /* GraphQL */`
        type Query {
          foo: String
        }

        type Query {
          bar: Boolean
        }
      `,
      errors: [
        { message: 'Type "Query" already exists in the schema. It cannot also be defined in this type definition.' },
      ],
    },
  ],
});
