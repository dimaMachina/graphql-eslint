import { rule, RuleOptions } from '../src/rules/require-deprecation-date';
import { ruleTester } from './test-utils';

const now = new Date();
now.setDate(now.getDate() + 1);

const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const year = now.getFullYear();

const tomorrow = `${day}/${month}/${year}`;

ruleTester.run<RuleOptions>('require-deprecation-date', rule, {
  valid: [
    'type User { firstName: String }',
    `scalar Old @deprecated(deletionDate: "${tomorrow}")`,
    {
      code: `scalar Old @deprecated(untilDate: "${tomorrow}")`,
      options: [{ argumentName: 'untilDate' }],
    },
    /* GraphQL */ `
      type User {
        firstname: String @deprecated(deletionDate: "22/08/2031")
        firstName: String
      }
    `,
  ],
  invalid: [
    {
      code: 'scalar Old @deprecated(deletionDate: "22/08/2021")',
      errors: 1,
    },
    {
      code: 'scalar Old @deprecated(untilDate: "22/08/2021")',
      options: [{ argumentName: 'untilDate' }],
      errors: 1,
    },
    {
      code: 'scalar Old @deprecated(deletionDate: "bad")',
      errors: 1,
    },
    {
      code: 'scalar Old @deprecated(deletionDate: "32/08/2021")',
      errors: 1,
    },
    {
      code: 'type Old { oldField: ID @deprecated }',
      errors: 1,
    },
  ],
});
