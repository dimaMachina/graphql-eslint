import eslintExperimentalApis from 'eslint/use-at-your-own-risk';
import { describe, it, expect } from 'vitest';
import { rules, parseForESLint } from '@graphql-eslint/eslint-plugin';
import { ParserOptions } from '../src';
import schemaAllConfig from '../src/configs/schema-all.json';
import operationsAllConfig from '../src/configs/operations-all.json';
import relayConfig from '../src/configs/relay.json';

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
    const eslint = getESLintWithConfig(schemaAllConfig);
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `operations-all` config', async () => {
    const eslint = getESLintWithConfig(operationsAllConfig, { operations: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });

  it('should load all rules properly from `relay` config', async () => {
    const eslint = getESLintWithConfig(relayConfig, { operations: '{ foo }' });
    const results = await eslint.lintText('{ foo }', { filePath: 'foo.graphql' });
    expect(results).toHaveLength(1);
  });
});
