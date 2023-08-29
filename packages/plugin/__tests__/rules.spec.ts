import eslintExperimentalApis from 'eslint/use-at-your-own-risk';
import { configs, parseForESLint, rules } from '@graphql-eslint/eslint-plugin';
import { ParserOptionsForTests } from './test-utils';

// @ts-expect-error we need to wait when ESLint publish correct types
const { FlatESLint } = eslintExperimentalApis;

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
          parser: { parseForESLint },
          parserOptions: {
            graphQLConfig: {
              schema: 'type Query { foo: Int }',
              ...graphQLConfig,
            },
          } satisfies ParserOptionsForTests,
        },
        plugins: {
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
