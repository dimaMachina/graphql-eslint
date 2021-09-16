import { writeFileSync } from 'fs';
import { resolve } from 'path';
import dedent from 'dedent';
import md from 'json-schema-to-markdown';
import { format } from 'prettier';
import { rules } from '../packages/plugin/src';
import { GRAPHQL_JS_VALIDATIONS } from '../packages/plugin/src/rules/graphql-js-validation';

const BR = '';
const DOCS_PATH = resolve(process.cwd(), 'docs');

enum Icon {
  GRAPHQL_ESLINT = '🚀',
  GRAPHQL_JS = '🔮',
  FIXABLE = '🔧',
  RECOMMENDED = '✅',
}

function printMarkDownTable(columns: { name: string; align?: 'center' }[], dataSource: string[][]) {
  return [
    '<!-- prettier-ignore-start -->',
    columns.map(column => column.name).join('|'),
    columns.map(column => (column.align === 'center' ? ':-:' : '-')).join('|'),
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

    if (schema) {
      const jsonSchema = Array.isArray(schema)
        ? {
            type: 'array',
            $schema: 'http://json-schema.org/draft-04/schema',
            items: schema[0],
          }
        : schema;

      blocks.push(BR, `## Config Schema`, BR, md(jsonSchema, '##'));
    }

    return {
      path: resolve(DOCS_PATH, `rules/${ruleName}.md`),
      content: blocks.join('\n'),
    };
  });

  const sortedRules = Object.keys(rules)
    .sort()
    .map(ruleName => {
      const link = `[${ruleName}](rules/${ruleName}.md)`;
      const { docs, fixable } = rules[ruleName].meta;

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
      printMarkDownTable(
        [
          { name: `Name${'&nbsp;'.repeat(20)}` },
          { name: 'Description' },
          { name: `${Icon.GRAPHQL_ESLINT}&nbsp;/&nbsp;${Icon.GRAPHQL_JS}`, align: 'center' },
          { name: Icon.FIXABLE },
          { name: Icon.RECOMMENDED },
        ],
        sortedRules
      ),
      BR,
      `## Further Reading`,
      BR,
      `- [Writing Custom Rules](custom-rules.md)`,
      `- [How the parser works?](parser.md)`,
      '- [`parserOptions`](parser-options.md)',
    ].join('\n'),
  });

  for (const r of result) {
    writeFileSync(r.path, r.content);
  }
  // eslint-disable-next-line no-console
  console.log('✅  Documentation generated');
}

generateDocs();
