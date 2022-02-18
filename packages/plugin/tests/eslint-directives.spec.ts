import { join } from 'path';
import { GraphQLRuleTester } from '../src';
import noAnonymousOperations from '../src/rules/no-anonymous-operations';
import noTypenamePrefix from '../src/rules/no-typename-prefix';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-typename-prefix', noTypenamePrefix, {
  valid: [
    {
      name: 'should work with descriptions #942',
      code: /* GraphQL */ `
        type Type {
          "Some description"
          typeName: String! # eslint-disable-line no-typename-prefix
        }
      `,
    },
  ],
  invalid: [],
});

ruleTester.runGraphQLTests('test-directives', noAnonymousOperations, {
  valid: [
    /* GraphQL */ `
      # eslint-disable-next-line
      query {
        a
      }
    `,
    /* GraphQL */ `
      # eslint-disable-next-line test-directives
      query {
        a
      }
    `,
    `
      query { # eslint-disable-line test-directives
        a
      }
    `,
    `
      query { # eslint-disable-line
        a
      }
    `,
    /* GraphQL */ `
      # eslint-disable
      query {
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
        query {
          a
        }
      `,
      errors: [
        { message: "Definition for rule 'non-existing-rule' was not found." },
        { message: 'Anonymous GraphQL operations are forbidden. Please make sure to name your query!' },
      ],
    },
    {
      code: 'query { a }',
      errors: [{ message: 'Anonymous GraphQL operations are forbidden. Please make sure to name your query!' }],
    },
  ],
});
