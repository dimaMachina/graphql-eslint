import { join, sep } from 'node:path';
import { CWD } from '@/utils.js';
import { ParserOptionsForTests, ruleTester } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

function withMocks({
  name,
  filename,
  errors,
  only,
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
          join(CWD, '__tests__', 'mocks', 'import-fragments', 'foo-fragment.gql'),
          join(CWD, '__tests__', 'mocks', 'import-fragments', 'bar-fragment.gql'),
          join(CWD, '__tests__', 'mocks', 'import-fragments', 'other-path', 'baz-fragment.gql'),
        ],
      },
    } satisfies ParserOptionsForTests,
    errors,
    only,
  };
}

const withMockForceLinuxDelimiter: typeof withMocks = args => {
  const mocks = withMocks(args);
  const { graphQLConfig } = mocks.parserOptions;
  console.log(graphQLConfig.documents);
  graphQLConfig.documents = graphQLConfig.documents.map(doc => doc.replaceAll(sep, '/'));
  return mocks;
};

const withMockForceWindowsDelimiter: typeof withMocks = args => {
  const mocks = withMocks(args);
  const { graphQLConfig } = mocks.parserOptions;
  graphQLConfig.documents = graphQLConfig.documents.map(doc => doc.replaceAll(sep, '\\'));
  return mocks;
};

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
      only: true,
      name: 'should not report with correct relative path import',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'valid-baz-query.gql'),
    }),
    withMockForceLinuxDelimiter({
      only: true,
      name: 'should not report with correct relative path import - forced linux style',
      filename: join(CWD, '__tests__', 'mocks', 'import-fragments', 'valid-baz-query.gql'),
    }),
    withMockForceWindowsDelimiter({
      only: true,
      name: 'should not report with correct relative path import - force widows style',
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
