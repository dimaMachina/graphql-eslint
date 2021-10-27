import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import dedent from 'dedent';
import md from 'json-schema-to-markdown';
import { format } from 'prettier';
import { rules } from '../packages/plugin/src';
import { pascalCase } from '../packages/plugin/src/utils';
import { GRAPHQL_JS_VALIDATIONS } from '../packages/plugin/src/rules/graphql-js-validation';

const BR = '';
const DOCS_PATH = resolve(process.cwd(), 'docs');

enum Icon {
  GRAPHQL_ESLINT = '🚀',
  GRAPHQL_JS = '🔮',
  FIXABLE = '🔧',
  RECOMMENDED = '✅',
}

type Column = {
  name: string;
  align: 'center' | 'right';
};

function printMarkdownTable(columns: (string | Column)[], dataSource: string[][]): string {
  const headerRow: string[] = [];
  const alignRow: ('-' | '-:' | ':-:')[] = [];

  for (let column of columns) {
    column = typeof column === 'string' ? ({ name: column } as Column) : column;
    headerRow.push(column.name);
    const alignSymbol = column.align === 'center' ? ':-:' : column.align === 'right' ? '-:' : '-';
    alignRow.push(alignSymbol);
  }

  return [
    '<!-- prettier-ignore-start -->',
    headerRow.join('|'),
    alignRow.join('|'),
    ...dataSource.map(row => row.join('|')),
    '<!-- prettier-ignore-end -->',
  ].join('\n');
}

function generateDocs(): void {
  const result = Object.entries(rules).map(([ruleName, rule]) => {
    const blocks: string[] = [`# \`${ruleName}\``, BR];
    const { deprecated, docs, fixable, schema } = rule.meta;

    if (deprecated) {
      blocks.push(`- ❗ DEPRECATED ❗`);
    }
    if (docs.recommended) {
      blocks.push(
        `${Icon.RECOMMENDED} The \`"extends": "plugin:@graphql-eslint/recommended"\` property in a configuration file enables this rule.`,
        BR
      );
    }
    if (fixable) {
      blocks.push(
        `${Icon.FIXABLE} The \`--fix\` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically fix some of the problems reported by this rule.`,
        BR
      );
    }

    const { requiresSchema = false, requiresSiblings = false } = docs;

    blocks.push(
      `- Category: \`${docs.category}\``,
      `- Rule name: \`@graphql-eslint/${ruleName}\``,
      `- Requires GraphQL Schema: \`${requiresSchema}\` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)`,
      `- Requires GraphQL Operations: \`${requiresSiblings}\` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)`,
      BR,
      docs.description
    );

    if (docs.examples?.length > 0) {
      blocks.push(BR, `## Usage Examples`);

      for (const { usage, title, code } of docs.examples) {
        const isJsCode = ['gql`', '/* GraphQL */'].some(str => code.includes(str));
        blocks.push(BR, `### ${title}`, BR, '```' + (isJsCode ? 'js' : 'graphql'));

        if (!isJsCode) {
          const options =
            usage?.length > 0
              ? // ESLint RuleTester accept options as array but in eslintrc config we must provide options as object
                format(JSON.stringify(['error', ...usage]), {
                  parser: 'babel',
                  singleQuote: true,
                  printWidth: Infinity,
                }).replace(';\n', '')
              : "'error'";
          blocks.push(`# eslint @graphql-eslint/${ruleName}: ${options}`, BR);
        }
        blocks.push(dedent(code), '```');
      }
    }

    let jsonSchema = Array.isArray(schema) ? schema[0] : schema;
    if (jsonSchema) {
      jsonSchema =
        jsonSchema.type === 'array'
          ? {
              definitions: jsonSchema.definitions,
              ...jsonSchema.items,
            }
          : jsonSchema;

      blocks.push(BR, '## Config Schema', BR, md(jsonSchema, '##'));
    }

    blocks.push(BR, '## Resources', BR);
    const isGraphQLJSRule = ruleName in GRAPHQL_JS_VALIDATIONS;

    if (isGraphQLJSRule) {
      const graphQLJSRuleName = `${pascalCase(ruleName)}Rule`;
      blocks.push(
        `- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/${graphQLJSRuleName}.ts)`,
        `- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/${graphQLJSRuleName}-test.ts)`
      );
    } else {
      blocks.push(`- [Rule source](../../packages/plugin/src/rules/${ruleName}.ts)`);
      const testPath = `packages/plugin/tests/${ruleName}.spec.ts`;
      const isTestExists = existsSync(resolve(process.cwd(), testPath));
      if (isTestExists) {
        blocks.push(`- [Test source](../../${testPath})`);
      }
    }

    blocks.push(BR);
    return {
      path: resolve(DOCS_PATH, `rules/${ruleName}.md`),
      content: blocks.join('\n'),
    };
  });

  const sortedRules = Object.entries(rules)
    .filter(([, rule]) => !rule.meta.deprecated)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ruleName, rule]) => {
      const link = `[${ruleName}](rules/${ruleName}.md)`;
      const { docs, fixable } = rule.meta;

      return [
        link,
        docs.description.split('\n')[0],
        ruleName in GRAPHQL_JS_VALIDATIONS ? Icon.GRAPHQL_JS : Icon.GRAPHQL_ESLINT,
        fixable ? Icon.FIXABLE : '',
        docs.recommended ? Icon.RECOMMENDED : '',
      ];
    });

  result.push({
    path: resolve(DOCS_PATH, 'README.md'),
    content: [
      `## Available Rules`,
      BR,
      'Each rule has emojis denoting:',
      BR,
      `- ${Icon.GRAPHQL_ESLINT} \`graphql-eslint\` rule`,
      `- ${Icon.GRAPHQL_JS} \`graphql-js\` rule`,
      `- ${Icon.FIXABLE} if some problems reported by the rule are automatically fixable by the \`--fix\` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option`,
      `- ${Icon.RECOMMENDED} if it belongs to the \`recommended\` configuration`,
      BR,
      '<!-- 🚨 IMPORTANT! Do not manually modify this table. Run: `yarn generate:docs` -->',
      printMarkdownTable(
        [
          `Name${'&nbsp;'.repeat(20)}`,
          'Description',
          { name: `${Icon.GRAPHQL_ESLINT}&nbsp;/&nbsp;${Icon.GRAPHQL_JS}`, align: 'center' },
          Icon.FIXABLE,
          Icon.RECOMMENDED,
        ],
        sortedRules
      ),
      BR,
      `## Further Reading`,
      BR,
      `- [Writing Custom Rules](custom-rules.md)`,
      `- [How the parser works?](parser.md)`,
      '- [`parserOptions`](parser-options.md)',
      BR,
    ].join('\n'),
  });

  for (const r of result) {
    writeFileSync(r.path, r.content);
  }
  // eslint-disable-next-line no-console
  console.log('✅  Documentation generated');
}

generateDocs();
