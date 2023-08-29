import { readdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import prettier from 'prettier';
import { CategoryType, GraphQLESLintRule } from '../packages/plugin/src/index.js';
import utils from '../packages/plugin/src/utils.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const BR = '';
const prettierOptions = await prettier.resolveConfig(__dirname);

const SRC_PATH = join(process.cwd(), 'packages/plugin/src');
const IGNORE_FILES = ['index.ts', 'graphql-js-validation.ts'];

type WriteFile = {
  (filePath: `${string}.ts`, code: string): Promise<void>;
  (filePath: `configs/${string}.ts`, code: Record<string, unknown>): Promise<void>;
};

const writeFormattedFile: WriteFile = async (filePath, code) => {
  if (filePath.startsWith('configs')) {
    code = `export = ${JSON.stringify(code)}`;
  }

  const formattedCode = [
    '/*',
    ' * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`',
    ' */',
    BR,
    await prettier.format(code as string, {
      ...prettierOptions,
      parser: 'typescript',
    }),
  ].join('\n');

  await writeFile(join(SRC_PATH, filePath), formattedCode);
  console.log(`✅  ${chalk.green(filePath)} file generated`);
};

const ruleFilenames = readdirSync(join(SRC_PATH, 'rules'))
  .filter(filename => filename.endsWith('.ts') && !IGNORE_FILES.includes(filename))
  .map(filename => filename.replace(/\.ts$/, ''));

async function generateRules(): Promise<void> {
  const code = [
    "import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation.js'",
    ...ruleFilenames.map(
      ruleName => `import { rule as ${utils.camelCase(ruleName)} } from './${ruleName}.js'`,
    ),
    BR,
    'export const rules = {',
    '...GRAPHQL_JS_VALIDATIONS,',
    ruleFilenames.map(ruleName =>
      ruleName.includes('-') ? `'${ruleName}': ${utils.camelCase(ruleName)}` : ruleName,
    ),
    '}',
  ].join('\n');

  await writeFormattedFile('rules/index.ts', code);
}

type RuleOptions = 'error' | ['error', ...any];

async function generateConfigs(): Promise<void> {
  const { rules } = await import('../packages/plugin/src/index.js');

  const getRulesConfig = (
    categoryType: CategoryType,
    isRecommended: boolean,
  ): Record<string, RuleOptions> => {
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
        return isRecommended === !!docs.recommended;
      })
      .map(([ruleName]) => ruleName)
      .sort();

    return Object.fromEntries(
      filteredRules
        .filter(ruleId => !rules[ruleId].meta.docs.isDisabledForAllConfig)
        .map(ruleId => [`@graphql-eslint/${ruleId}`, getRuleOptions(ruleId, rules[ruleId])]),
    );
  };

  // Can't extend in `all` config, throws `ESLint couldn't find the config "./configs/base" to extend from`
  const baseConfig = {
    parser: '@graphql-eslint/eslint-plugin',
    plugins: ['@graphql-eslint'],
  };

  await Promise.all([
    writeFormattedFile('configs/schema-recommended.ts', {
      ...baseConfig,
      rules: getRulesConfig('Schema', true),
    }),
    writeFormattedFile('configs/operations-recommended.ts', {
      ...baseConfig,
      rules: getRulesConfig('Operations', true),
    }),
    writeFormattedFile('configs/schema-all.ts', {
      extends: './configs/schema-recommended',
      rules: getRulesConfig('Schema', false),
    }),
    writeFormattedFile('configs/operations-all.ts', {
      extends: './configs/operations-recommended',
      rules: getRulesConfig('Operations', false),
    }),
  ]);
}

console.time('done');
await generateRules();
await generateConfigs();
console.timeLog('done');
