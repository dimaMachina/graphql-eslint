import { GraphQLRuleTester } from '../src';
import rule from '../src/rules/no-case-insensitive-enum-values-duplicates';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-case-insensitive-enum-values-duplicates', rule, {
  valid: [],
  invalid: [
    {
      code: 'enum A { TEST TesT }',
      errors: [{ message: 'Case-insensitive enum values duplicates are not allowed! Found: `TesT`.' }],
    },
    {
      code: 'extend enum A { TEST TesT }',
      errors: [{ message: 'Case-insensitive enum values duplicates are not allowed! Found: `TesT`.' }],
    },
  ],
});
