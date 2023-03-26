import { GraphQLRuleTester } from '../src';
import { rule } from '../src/rules/no-case-insensitive-enum-values-duplicates';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-case-insensitive-enum-values-duplicates', rule, {
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
