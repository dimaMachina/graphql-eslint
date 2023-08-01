import { configs, parseForESLint, ParserOptions, rules } from '@graphql-eslint/eslint-plugin';
import eslintExperimentalApis from 'eslint/use-at-your-own-risk';

// @ts-expect-error we need to wait when ESLint publish correct types
const { FlatESLint } = eslintExperimentalApis;

export function getESLintWithConfig(
  config: Record<string, any>,
  parserOptions?: Omit<ParserOptions, 'filePath'>,
) {
  return new FlatESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ['*.graphql'],
        languageOptions: {
          parser: { parseForESLint },
          parserOptions: {
            schema: 'type Query { foo: Int }',
            skipGraphQLConfig: true,
            ...parserOptions,
          },
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

  it('should load all rules properly from `relay` config', async () => {
    const eslint = getESLintWithConfig(configs['schema-relay'], { documents: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });
});
