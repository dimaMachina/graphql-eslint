import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import enquirer from 'enquirer';
import { CategoryType } from '../packages/plugin/src/index.js';

type Answer = {
  ruleId: string;
  description: string;
  fixable: string;
  type: string;
  category: CategoryType;
};

const CWD = process.cwd();

const answer = await enquirer.prompt<Answer>([
  {
    type: 'input',
    name: 'ruleId',
    message: 'Rule name:',
    validate(value) {
      if (!value) {
        return 'Rule name is required.';
      }
      if (!/^[a-z-]+$/.test(value)) {
        return 'Invalid rule name.';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'Rule description:',
    validate(value) {
      if (!value) {
        return 'Rule description is required.';
      }
      return true;
    },
  },
  {
    type: 'select',
    name: 'type',
    message: 'Type:',
    choices: ['problem', 'suggestion', 'layout'],
  },
  {
    type: 'select',
    name: 'category',
    message: 'Type:',
    choices: ['Schema', 'Operations'],
  },
]);

const { ruleId, type, category } = answer;
const description = answer.description.replace(/\.*$/, '.');
const RULE_PATH = join(CWD, `packages/plugin/src/rules/${ruleId}.ts`);
const RULE_CONTENT = `
import { GraphQLESLintRule } from '../types';

const RULE_ID = '${ruleId}';

export const rule: GraphQLESLintRule = {
  meta: {
    type: '${type}',
    docs: {
      category: '${category}',
      description: '${description}',
      url: \`https://the-guild.dev/graphql/eslint/rules/\${RULE_ID}\`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ \`\`,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ \`\`,
        },
      ],
    },
    messages: {
      [RULE_ID]: '',
    },
    schema: [],
  },
  create(context) {
    return {
      Document(node) {
        context.report({
          node,
          messageId: RULE_ID,
        });
      },
    };
  },
};
`;

await writeFile(RULE_PATH, RULE_CONTENT.trimStart());

const TEST_PATH = join(CWD, `packages/plugin/__tests__/${ruleId}.spec.ts`);
const TEST_CONTENT = `
import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule } from '../src/rules/${ruleId}';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: Omit<ParserOptions, 'filePath'> } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests('${ruleId}', rule, {
  valid: [
    {
      name: 'should ',
      code: /* GraphQL */ \`\`,
    },
  ],
  invalid: [
    {
      name: 'should ',
      ...useSchema(/* GraphQL */ \`\`),
      errors: [{ message: '' }],
    },
  ],
});
`;

await writeFile(TEST_PATH, TEST_CONTENT.trimStart());
