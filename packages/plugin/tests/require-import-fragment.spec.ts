import { join } from 'node:path';
import { GraphQLRuleTester } from '../src';
import { rule } from '../src/rules/require-import-fragment';

const ruleTester = new GraphQLRuleTester();

function withSiblings(code: string) {
  return {
    code,
    parserOptions: {
      documents: code,
    },
  };
}

function withMocks({ name, filename }: { name: string; filename: string }) {
  return {
    name,
    filename,
    code: ruleTester.fromMockFile(filename.split('/mocks')[1]),
    parserOptions: {
      documents: [
       filename,
        join(__dirname, 'mocks/import-fragments/foo-fragment.gql'),
        join(__dirname, 'mocks/import-fragments/bar-fragment.gql'),
      ],
    },
  };
}

ruleTester.runGraphQLTests('require-import-fragment', rule, {
  valid: [
    withMocks({
      name: 'should not report with named import',
      filename: join(__dirname, 'mocks/import-fragments/valid-query.gql'),
    }),
    withMocks({
      name: 'should not report with default import',
      filename: join(__dirname, 'mocks/import-fragments/valid-query-default.gql'),
    }),
    {
      name: 'should not report fragments from the same file',
      ...withSiblings(/* GraphQL */ `
        {
          foo {
            ...FooFields
          }
        }

        fragment FooFields on Foo {
          id
        }
      `),
    },
  ],
  invalid: [
    {
      ...withMocks({
        name: 'should report with named import',
        filename: join(__dirname, 'mocks/import-fragments/invalid-query.gql'),
      }),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    },
    {
      ...withMocks({
        name: 'should report with default import',
        filename: join(__dirname, 'mocks/import-fragments/invalid-query-default.gql'),
      }),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    },
    {
      name: 'should report fragments when there are no import expressions',
      ...withSiblings(/* GraphQL */ `
        {
          foo {
            ...FooFields
          }
        }
      `),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    },
  ],
});
