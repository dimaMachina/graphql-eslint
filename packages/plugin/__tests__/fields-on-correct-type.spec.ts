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
          id: ID
          age: Int
        }

        type Query {
          user: User
        }
      `,
    },
  },
});

ruleTester.run('fields-on-correct-type', GRAPHQL_JS_VALIDATIONS['fields-on-correct-type'], {
  valid: [],
  invalid: [
    {
      name: 'should highlight selection on single line',
      code: 'fragment UserFields on User { id bad age }',
      errors: [{ message: 'Cannot query field "bad" on type "User". Did you mean "id"?' }],
    },
    {
      name: 'should highlight selection on multi line',
      code: /* GraphQL */ `
        {
          user {
            id
            veryBad
            age
          }
        }
      `,
      errors: [{ message: 'Cannot query field "veryBad" on type "User".' }],
    },
  ],
});
