import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule } from '../src/rules/require-nullable-result-in-root';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: Omit<ParserOptions, 'filePath'> } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests('require-nullable-result-in-root', rule, {
  valid: [
    {
      name: 'should pass when query contains nullable fields in root',
      ...useSchema(`
      type Query {
        user: User
      }
      type User {
        id: ID!
      }
      `),
    },
  ],
  invalid: [
    {
      name: 'should fail when query contains non-nullable fields in root',
      ...useSchema(`      
      type Query {
        user: User!
      }
      type User {
        id: ID!
      }`),
      errors: [{ message: 'Non-null types are not allowed in root' }],
    },
  ],
});
