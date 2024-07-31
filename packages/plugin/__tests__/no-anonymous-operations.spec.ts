import { rule } from '../src/rules/no-anonymous-operations.js';
import { ruleTester } from './test-utils.js';

ruleTester.run('no-anonymous-operations', rule, {
  valid: ['query myQuery { a }', 'mutation doSomething { a }', 'subscription myData { a }'],
  invalid: [
    { code: 'query { a }', errors: 1 },
    { code: 'mutation { renamed: a }', errors: 1 },
    { code: 'subscription { ...someFragmentSpread }', errors: 1 },
  ],
});
