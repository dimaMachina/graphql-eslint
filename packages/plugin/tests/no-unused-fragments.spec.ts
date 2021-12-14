import { join } from 'path';
import { GraphQLRuleTester, rules } from '../src';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-unused-fragments', rules['no-unused-fragments'], {
  valid: [
    {
      name: 'should find file with operation definition that import current fragment',
      filename: join(__dirname, 'mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: [
          join(__dirname, 'mocks/user-fields.graphql'),
          join(__dirname, 'mocks/post-fields.graphql'),
          join(__dirname, 'mocks/post.graphql'),
        ],
      },
    },
  ],
  invalid: [],
});
