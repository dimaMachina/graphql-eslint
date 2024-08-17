import { ruleTester } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

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
