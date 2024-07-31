import { FlatESLint } from 'eslint/use-at-your-own-risk';
import { configs, parser, rules } from '@graphql-eslint/eslint-plugin';
import { ParserOptionsForTests } from './test-utils.js';

export function getESLintWithConfig(
  config: Record<string, any>,
  graphQLConfig?: ParserOptionsForTests['graphQLConfig'],
) {
  return new FlatESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ['*.graphql'],
        languageOptions: {
          parser,
          parserOptions: {
            graphQLConfig: {
              schema: 'type Query { foo: Int }',
              ...graphQLConfig,
            },
          } satisfies ParserOptionsForTests,
        },
        plugins: {
          // @ts-expect-error -- TODO fixme
          '@graphql-eslint': { rules },
        },
        rules: config.rules,
      },
    ],
  });
}

describe('Rules', () => {
  it('should load all rules properly from `schema-all` config', async () => {
    const eslint = getESLintWithConfig(configs['schema-all']);
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `operations-all` config', async () => {
    const eslint = getESLintWithConfig(configs['operations-all'], { documents: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `schema-relay` config', async () => {
    const eslint = getESLintWithConfig(configs['schema-relay'], { documents: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });
});
