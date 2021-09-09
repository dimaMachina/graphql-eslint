import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/no-anonymous-operations';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-anonymous-operations', rule, {
  valid: ['query myQuery { a }', 'mutation doSomething { a }', 'subscription myData { a }'],
  invalid: [
    { code: `query { a }`, errors: 1 },
    { code: `mutation { a }`, errors: 1 },
    { code: `subscription { a }`, errors: 1 },
  ],
});
