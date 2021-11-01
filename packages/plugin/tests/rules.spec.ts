import { ESLint } from 'eslint';

function getESLintWithConfig(configName: 'schema-all' | 'operations-all'): ESLint {
  return new ESLint({
    useEslintrc: false,
    baseConfig: {
      overrides: [
        {
          files: '*.graphql',
          extends: `plugin:@graphql-eslint/${configName}`,
          parserOptions: {
            schema: 'type Query { foo: Int }',
            operations: '{ foo }',
            skipGraphQLConfig: true,
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
    const eslint = getESLintWithConfig('operations-all');
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });
});
