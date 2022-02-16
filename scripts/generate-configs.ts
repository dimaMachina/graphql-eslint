import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { format, resolveConfig } from 'prettier';
import chalk from 'chalk';
import { camelCase } from '../packages/plugin/src/utils';
import { CategoryType, GraphQLESLintRule } from '../packages/plugin/src';

const BR = '';
const prettierOptions = resolveConfig.sync(__dirname);
const SRC_PATH = join(process.cwd(), 'packages/plugin/src');
const IGNORE_FILES = ['index.ts', 'graphql-js-validation.ts'];

type WriteFile = {
  (filePath: `${string}.ts`, code: string): void;
  (filePath: `configs/${string}.json`, code: Record<string, unknown>): void;
};

const writeFormattedFile: WriteFile = (filePath, code): void => {
  const isJson = filePath.endsWith('.json');

  const formattedCode = isJson
    ? format(JSON.stringify(code), {
        parser: 'json',
        printWidth: 80,
      })
    : [
        '/*',
        ' * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`',
        ' */',
        BR,
        format(code, {
          ...prettierOptions,
          parser: 'typescript',
        }),
      ].join('\n');

  writeFileSync(join(SRC_PATH, filePath), formattedCode);
  // eslint-disable-next-line no-console
  console.log(`✅  ${chalk.green(filePath)} file generated`);
};

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
        .filter(ruleId => !rules[ruleId].meta.docs.isDisabledForAllConfig)
        .map(ruleId => [`@graphql-eslint/${ruleId}`, getRuleOptions(ruleId, rules[ruleId])])
    );
  };

  writeFormattedFile('configs/schema-recommended.json', {
    extends: './base.json',
    rules: getRulesConfig('Schema', true),
  });

  writeFormattedFile('configs/operations-recommended.json', {
    extends: './base.json',
    rules: getRulesConfig('Operations', true),
  });

  writeFormattedFile('configs/schema-all.json', {
    extends: ['./base.json', './schema-recommended.json'],
    rules: getRulesConfig('Schema', false),
  });

  writeFormattedFile('configs/operations-all.json', {
    extends: ['./base.json', './operations-recommended.json'],
    rules: getRulesConfig('Operations', false),
  });
}

generateRules();
generateConfigs();
