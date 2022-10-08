import { ESLint } from 'eslint';
import { ParserOptions } from '../src';

function getESLintWithConfig(
  configName: 'schema-all' | 'operations-all' | 'relay',
  parserOptions?: ParserOptions,
): ESLint {
  return new ESLint({
    useEslintrc: false,
    baseConfig: {
      overrides: [
        {
          files: '*.graphql',
          extends: `plugin:@graphql-eslint/${configName}`,
          parserOptions: {
            schema: 'type Query { foo: Int }',
            skipGraphQLConfig: true,
            ...parserOptions,
          },
        },
      ],
    },
  });
}

describe('Rules', () => {
  it('should load all rules properly from `schema-all` config', async () => {
    const eslint = getESLintWithConfig('schema-all');
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `operations-all` config', async () => {
    const eslint = getESLintWithConfig('operations-all', { operations: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `relay` config', async () => {
    const eslint = getESLintWithConfig('relay', { operations: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });
});
