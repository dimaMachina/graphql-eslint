import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { format, resolveConfig } from 'prettier';
import chalk from 'chalk';
import { camelCase } from '../packages/plugin/src/utils';
import { CategoryType, GraphQLESLintRule } from '../packages/plugin/src';
import { DISABLED_RULES_FOR_ALL_CONFIG } from './constants';

const BR = '';
const prettierOptions = {
  parser: 'typescript',
  ...resolveConfig.sync(__dirname),
};
const SRC_PATH = join(process.cwd(), 'packages/plugin/src');
const IGNORE_FILES = ['index.ts', 'graphql-js-validation.ts'];

function writeFormattedFile(filePath: string, typeScriptCode: string): void {
  const code = [
    '/*',
    ' * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`',
    ' */',
    BR,
    typeScriptCode,
  ].join('\n');

  const formattedCode = format(code, prettierOptions);
  writeFileSync(join(SRC_PATH, filePath), formattedCode);
  // eslint-disable-next-line no-console
  console.log(`✅  ${chalk.green(filePath)} file generated`);
}

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

  writeFormattedFile('rules/index.ts', code);
}

type RuleOptions = 'error' | ['error', ...any];

async function generateConfigs(): Promise<void> {
  const { rules } = await import('../packages/plugin/src');

  const getRulesConfig = (categoryType: CategoryType, isRecommended: boolean): Record<string, RuleOptions> => {
    const getRuleOptions = (ruleId, rule: GraphQLESLintRule): RuleOptions => {
      const { configOptions } = rule.meta.docs;
      if (!configOptions) {
        return 'error';
      }
      if (Array.isArray(configOptions)) {
        return ['error', ...configOptions];
      }
      return ['error', ...configOptions[categoryType.toLowerCase()]];
    };

    const filteredRules = Object.entries(rules)
      .filter(([, rule]) => {
        const { deprecated, docs } = rule.meta;
        const categories = new Set(Array.isArray(docs.category) ? docs.category : [docs.category]);
        if (deprecated || !categories.has(categoryType)) {
          return false;
        }
        return isRecommended === Boolean(docs.recommended);
      })
      .map(([ruleName]) => ruleName)
      .sort();

    return Object.fromEntries(
      filteredRules
        .filter(ruleId => !DISABLED_RULES_FOR_ALL_CONFIG.has(ruleId))
        .map(ruleId => [`@graphql-eslint/${ruleId}`, getRuleOptions(ruleId, rules[ruleId])])
    );
  };

  writeFormattedFile(
    'configs/schema-recommended.ts',
    `export default ${JSON.stringify({
      extends: ['plugin:@graphql-eslint/base'],
      rules: getRulesConfig('Schema', true),
    })}`
  );

  writeFormattedFile(
    'configs/operations-recommended.ts',
    `export default ${JSON.stringify({
      extends: ['plugin:@graphql-eslint/base'],
      rules: getRulesConfig('Operations', true),
    })}`
  );

  writeFormattedFile(
    'configs/schema-all.ts',
    `export default ${JSON.stringify({
      extends: ['plugin:@graphql-eslint/base', 'plugin:@graphql-eslint/schema-recommended'],
      rules: getRulesConfig('Schema', false),
    })}`
  );

  writeFormattedFile(
    'configs/operations-all.ts',
    `export default ${JSON.stringify({
      extends: ['plugin:@graphql-eslint/base', 'plugin:@graphql-eslint/operations-recommended'],
      rules: getRulesConfig('Operations', false),
    })}`
  );
}

generateRules();
generateConfigs();
