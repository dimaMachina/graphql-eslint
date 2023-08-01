import { rule } from '../src/rules/no-case-insensitive-enum-values-duplicates';
import { ruleTester } from './test-utils';

ruleTester.run('no-case-insensitive-enum-values-duplicates', rule, {
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
