import { GraphQLRuleTester, ParserOptions } from '../src';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const TEST_SCHEMA = /* GraphQL */`
  type Query {
    foo: String
  }

  type Mutation {
    bar: Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const WITH_SCHEMA = {
  parserOptions: <ParserOptions>{
    schema: TEST_SCHEMA,
    operations: [],
  },
};

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('lone-schema-definition', GRAPHQL_JS_VALIDATIONS['lone-schema-definition'], {
  valid: [{ ...WITH_SCHEMA, code: TEST_SCHEMA }],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: /* GraphQL */`
        type Query {
          foo: String
        }

        type Mutation {
          bar: Boolean
        }

        schema {
          query: Query
          mutation: Mutation
        }

        type RootQuery {
          foo: String
        }

        type RootMutation {
          bar: Boolean
        }

        schema {
          query: RootQuery
          mutation: RootMutation
        }
      `,
      errors: [
        { message: 'Must provide only one schema definition.' },
      ],
    },
  ],
});
