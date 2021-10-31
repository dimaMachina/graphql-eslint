import { GraphQLRuleTester } from '../src';
import rule from '../src/rules/require-deprecation-date';

const now = new Date();
now.setDate(now.getDate() + 1);

const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const year = now.getFullYear();

const tomorrow = `${day}/${month}/${year}`;

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('require-deprecation-date', rule, {
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
      errors: [{ message: '"Old" сan be removed' }],
    },
    {
      code: 'scalar Old @deprecated(untilDate: "22/08/2021")',
      options: [{ argumentName: 'untilDate' }],
      errors: [{ message: '"Old" сan be removed' }],
    },
    {
      code: 'scalar Old @deprecated(deletionDate: "bad")',
      errors: [{ message: 'Deletion date must be in format "DD/MM/YYYY"' }],
    },
    {
      code: 'scalar Old @deprecated(deletionDate: "32/08/2021")',
      errors: [{ message: 'Invalid "32/08/2021" deletion date' }],
    },
    {
      code: 'type Old { oldField: ID @deprecated }',
      errors: [{ message: 'Directive "@deprecated" must have a deletion date' }],
    }
  ],
});
