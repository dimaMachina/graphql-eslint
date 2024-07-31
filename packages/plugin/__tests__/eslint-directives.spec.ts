import { join } from 'node:path';
import { rule as noAnonymousOperations } from '../src/rules/no-anonymous-operations.js';
import { rule as noTypenamePrefix } from '../src/rules/no-typename-prefix.js';
import { ruleTester } from './test-utils.js';

ruleTester.run('no-typename-prefix', noTypenamePrefix, {
  valid: [
    {
      name: 'should work with descriptions #942',
      code: /* GraphQL */ `
        type Type {
          "Some description"
          typeName: String! # eslint-disable-line rule-to-test/no-typename-prefix
        }
      `,
    },
  ],
  invalid: [],
});

ruleTester.run('test-directives', noAnonymousOperations, {
  valid: [
    /* GraphQL */ `
      # eslint-disable-next-line
      {
        a
      }
    `,
    /* GraphQL */ `
      # eslint-disable-next-line rule-to-test/test-directives
      {
        a
      }
    `,
    '{ a } # eslint-disable-line rule-to-test/test-directives',
    '{ a } # eslint-disable-line',
    /* GraphQL */ `
      # eslint-disable
      {
        a
      }
    `,
    {
      filename: join(__dirname, 'mocks/test-directives-with-import.graphql'),
      code: ruleTester.fromMockFile('test-directives-with-import.graphql'),
    },
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        # eslint-disable-next-line non-existing-rule
        {
          a
        }
      `,
      errors: [
        { message: "Definition for rule 'non-existing-rule' was not found." },
        { message: 'Anonymous GraphQL operations are forbidden. Make sure to name your query!' },
      ],
    },
  ],
});
