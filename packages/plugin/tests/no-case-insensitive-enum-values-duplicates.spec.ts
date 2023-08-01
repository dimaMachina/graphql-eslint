import { RuleTester } from '@theguild/eslint-rule-tester';
import { rule } from '../src/rules/no-case-insensitive-enum-values-duplicates';

const ruleTester = new RuleTester();

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
