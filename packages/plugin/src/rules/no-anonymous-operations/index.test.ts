import { rule } from './index.js';
import { ruleTester } from '../../../__tests__/test-utils.js';

ruleTester.run('no-anonymous-operations', rule, {
  valid: ['query myQuery { a }', 'mutation doSomething { a }', 'subscription myData { a }'],
  invalid: [
    { code: 'query { a }', errors: 1 },
    { code: 'mutation { renamed: a }', errors: 1 },
    { code: 'subscription { ...someFragmentSpread }', errors: 1 },
  ],
});
