import eslintExperimentalApis from 'eslint/use-at-your-own-risk';
import { describe, it, expect } from 'vitest';
import { rules, parseForESLint, ParserOptions, configs } from '@graphql-eslint/eslint-plugin';

// @ts-expect-error we need to wait when ESLint publish correct types
const { FlatESLint } = eslintExperimentalApis;

function getESLintWithConfig(config: any, parserOptions?: Omit<ParserOptions, 'filePath'>) {
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
    const eslint = getESLintWithConfig(configs['operations-all'], { operations: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `relay` config', async () => {
    const eslint = getESLintWithConfig(configs['relay'], { operations: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });
});
