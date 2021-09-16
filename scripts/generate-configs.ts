import { readdirSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { format, resolveConfig } from 'prettier';
import chalk from 'chalk';
import { camelCase } from '../packages/plugin/src/utils';
import { GraphQLESLintRule } from '../packages/plugin/src';

const BR = '';
const prettierOptions = {
  parser: 'typescript',
  ...resolveConfig.sync(__dirname),
};

function writeFormattedFile(filePath: string, typeScriptCode: string): void {
  const code = [
    '/*',
    ' * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`',
    ' */',
    BR,
    typeScriptCode,
  ].join('\n');

  const formattedCode = format(code, prettierOptions);
  writeFileSync(filePath, formattedCode);
  // eslint-disable-next-line no-console
  console.log(`✅  ${chalk.green(relative(SRC_PATH, filePath))} file generated`);
}

const SRC_PATH = join(process.cwd(), 'packages/plugin/src');
const IGNORE_FILES = ['index.ts', 'graphql-js-validation.ts'];

const ruleFilenames = readdirSync(join(SRC_PATH, 'rules'))
  .filter(filename => filename.endsWith('.ts') && !IGNORE_FILES.includes(filename))
  .map(filename => filename.replace(/\.ts$/, ''));

function generateRules(): void {
  const code = [
    `import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation'`,
    ...ruleFilenames.map(ruleName => `import ${camelCase(ruleName)} from './${ruleName}'`),
    BR,
    'export const rules = {',
    '...GRAPHQL_JS_VALIDATIONS,',
    ruleFilenames.map(ruleName => `'${ruleName}': ${camelCase(ruleName)}`),
    '}',
  ].join('\n');

  writeFormattedFile(join(SRC_PATH, 'rules/index.ts'), code);
}

async function generateConfigs(): Promise<void> {
  const { rules } = await import('../packages/plugin/src');

  const recommendedRules = Object.entries(rules as Record<string, GraphQLESLintRule>)
    .filter(([, rule]) => rule.meta.docs.recommended)
    .map(([ruleName]) => ruleName)
    .sort();

  writeFormattedFile(
    join(SRC_PATH, 'configs/recommended.ts'),
    `export const recommendedConfig = ${JSON.stringify({
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: Object.fromEntries(recommendedRules.map(ruleName => [`@graphql-eslint/${ruleName}`, 'error'])),
    })}`
  );

  writeFormattedFile(
    join(SRC_PATH, 'configs/all.ts'),
    [
      `import { recommendedConfig } from './recommended'`,
      BR,
      'export const allConfig = {',
      '...recommendedConfig,',
      'rules: {',
      '...recommendedConfig.rules,',
      Object.keys(rules)
        .filter(ruleName => !recommendedRules.includes(ruleName))
        .sort()
        .map(ruleName => `'@graphql-eslint/${ruleName}': 'error'`),
      '}',
      '}',
    ].join('\n')
  );
}

generateRules();
generateConfigs();
