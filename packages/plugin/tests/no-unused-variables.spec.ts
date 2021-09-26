import { join } from 'path';
import { GraphQLRuleTester, rules } from '../src';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-unused-variables', rules['no-unused-variables'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/no-unused-variables.gql'),
      code: ruleTester.fromMockFile('no-unused-variables.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
      },
    },
  ],
  invalid: [],
});
