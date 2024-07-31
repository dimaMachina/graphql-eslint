import { rule } from '../src/rules/unique-enum-value-names.js';
import { ruleTester } from './test-utils.js';

ruleTester.run('unique-enum-value-names', rule, {
  valid: [],
  invalid: [
    {
      code: 'enum A { TEST TesT }',
      errors: 1,
    },
    {
      code: 'extend enum A { TEST TesT }',
      errors: 1,
    },
  ],
});
