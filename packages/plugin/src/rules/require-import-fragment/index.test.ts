import { join } from 'node:path';
import { CWD } from '@/utils.js';
import { ParserOptionsForTests, ruleTester } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

function withMocks({
  name,
  filename,
  errors,
  only = false,
}: {
  name: string;
  filename: string;
  errors?: any;
  only?: boolean;
}) {
  return {
    name,
    filename,
    code: ruleTester.fromMockFile(filename.split('mocks')[1]),
    parserOptions: {
      graphQLConfig: {
        documents: [
          filename,
          join(CWD, '__tests__', 'mocks', 'imports-fragments', 'fragments', '**', '*.gql'),
        ],
      },
    } satisfies ParserOptionsForTests,
    errors,
    only,
  };
}

ruleTester.run('require-import-fragment', rule, {
  valid: [
    withMocks({
      name: 'should not report with named import',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'valid-query.gql'),
    }),
    withMocks({
      name: 'should not report with default import',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'valid-query-default.gql'),
    }),
    withMocks({
      name: 'should not report fragments from the same file',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'same-file.gql'),
    }),
    withMocks({
      name: 'should not report with correct relative path import',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'valid-baz-query.gql'),
    }),
  ],
  invalid: [
    withMocks({
      name: 'should report with named import',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'invalid-query.gql'),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    }),
    withMocks({
      name: 'should report with default import',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'invalid-query-default.gql'),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    }),
    withMocks({
      name: 'should report fragments when there are no import expressions',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'missing-import.gql'),
      errors: [{ message: 'Expected "FooFields" fragment to be imported.' }],
    }),
  ],
});
