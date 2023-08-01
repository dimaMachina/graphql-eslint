import { join } from 'node:path';
import { GraphQLInvalidTestCase } from '../src';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { rule } from '../src/rules/require-import-fragment';
import { Linter } from 'eslint';
import ParserOptions = Linter.ParserOptions;

const ruleTester = new RuleTester();

function withMocks({
  name,
  filename,
  errors,
}: {
  name: string;
  filename: string;
  errors?: GraphQLInvalidTestCase['errors'];
}): {
  name: string;
  filename: string;
  code: string;
  parserOptions: {
    documents: ParserOptions['documents'];
  };
  errors: any;
} {
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
    errors,
  };
}

ruleTester.run('require-import-fragment', rule, {
  valid: [
    withMocks({
      name: 'should not report with named import',
      filename: join(__dirname, 'mocks/import-fragments/valid-query.gql'),
    }),
    withMocks({
      name: 'should not report with default import',
      filename: join(__dirname, 'mocks/import-fragments/valid-query-default.gql'),
    }),
    withMocks({
      name: 'should not report fragments from the same file',
      filename: join(__dirname, 'mocks/import-fragments/same-file.gql'),
    }),
  ],
  invalid: [
    withMocks({
      name: 'should report with named import',
      filename: join(__dirname, 'mocks/import-fragments/invalid-query.gql'),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    }),
    withMocks({
      name: 'should report with default import',
      filename: join(__dirname, 'mocks/import-fragments/invalid-query-default.gql'),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    }),
    withMocks({
      name: 'should report fragments when there are no import expressions',
      filename: join(__dirname, 'mocks/import-fragments/missing-import.gql'),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    }),
  ],
});
