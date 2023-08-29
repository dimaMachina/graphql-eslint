import { rule } from '../src/rules/unique-enum-value-names';
import { ruleTester } from './test-utils';

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
