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
    ruleFilenames.map(ruleName => (ruleName.includes('-') ? `'${ruleName}': ${camelCase(ruleName)}` : ruleName)),
    '}',
  ].join('\n');

  writeFormattedFile(join(SRC_PATH, 'rules/index.ts'), code);
}

type RuleSeverity = 'error' | ['error', ...any];

async function generateConfigs(): Promise<void> {
  const { rules } = await import('../packages/plugin/src');

  const getRuleSeverityWithOptions = (rule: GraphQLESLintRule): RuleSeverity => {
    const { optionsForConfig = [] } = rule.meta.docs;
    if (optionsForConfig.length > 0) {
      return ['error', ...optionsForConfig];
    }
    return 'error';
  };

  const getRulesConfig = (isRecommended: boolean): Record<string, RuleSeverity> => {
    const filteredRules = Object.entries(rules)
      .filter(([, rule]) => !rule.meta.deprecated && Boolean(rule.meta.docs.recommended) === isRecommended)
      .map(([ruleName]) => ruleName)
      .sort();

    return Object.fromEntries(
      filteredRules.map(ruleName => [`@graphql-eslint/${ruleName}`, getRuleSeverityWithOptions(rules[ruleName])])
    );
  };

  writeFormattedFile(
    join(SRC_PATH, 'configs/recommended.ts'),
    `export const recommendedConfig = ${JSON.stringify({
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: getRulesConfig(true),
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
      JSON.stringify(getRulesConfig(false)).slice(1, -1), // remove object brackets
      '}',
      '}',
    ].join('\n')
  );
}

generateRules();
generateConfigs();
