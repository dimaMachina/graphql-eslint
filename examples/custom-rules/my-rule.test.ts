import { RuleTester } from 'eslint';
import { parser } from '@graphql-eslint/eslint-plugin';
import { rule } from './my-rule.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      graphQLConfig: {
        // Optionally, your schema, your rule could have access to it
        // schema: '...',
        // Optionally, your operations, your rule could have access to them
        // documents: '...'
      },
    },
  },
});

ruleTester.run('my-rule', rule, {
  valid: [
    {
      name: 'should work',
      code: 'query bar { foo }',
    },
  ],
  invalid: [
    {
      name: 'should fail',
      code: '{ foo }',
      errors: [{ message: 'Oops, name is required!' }],
    },
  ],
});
