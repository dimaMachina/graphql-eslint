/* eslint-disable no-console */
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import dedent from 'dedent';
import md from 'json-schema-to-markdown';
import { format, resolveConfig } from 'prettier';
import { asArray } from '@graphql-tools/utils';
import { rules } from '../packages/plugin/src';

const BR = '';
const NBSP = '&nbsp;';
const DOCS_PATH = resolve(process.cwd(), 'docs');

enum Icon {
  GRAPHQL_ESLINT = '🚀',
  GRAPHQL_JS = '🔮',
  FIXABLE = '🔧',
  HAS_SUGGESTIONS = '💡',
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

async function generateDocs(): Promise<void> {
  const prettierConfig = await resolveConfig('./docs/README.md');

  const result = Object.entries(rules).map(([ruleName, rule]) => {
    const blocks: string[] = [`# \`${ruleName}\``];
    const { deprecated, docs, schema, fixable, hasSuggestions } = rule.meta;

    if (deprecated) {
      blocks.push('- ❗ DEPRECATED ❗');
    }
    const categories = asArray(docs.category);
    if (docs.recommended) {
      const configNames = categories.map(
        category => `"plugin:@graphql-eslint/${category.toLowerCase()}-recommended"`,
      );
      blocks.push(
        `${Icon.RECOMMENDED} The \`"extends": ${configNames.join(
          '` and `',
        )}\` property in a configuration file enables this rule.`,
      );
    }
    if (fixable) {
      blocks.push(
        BR,
        `${Icon.FIXABLE} The \`--fix\` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically fix some of the problems reported by this rule.`,
      );
    }
    if (hasSuggestions) {
      blocks.push(
        BR,
        `${Icon.HAS_SUGGESTIONS} This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)`,
      );
    }

    const { requiresSchema = false, requiresSiblings = false, graphQLJSRuleName } = docs;

    blocks.push(
      `- Category: \`${categories.join(' & ')}\``,
      `- Rule name: \`@graphql-eslint/${ruleName}\``,
      `- Requires GraphQL Schema: \`${requiresSchema}\` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)`,
      `- Requires GraphQL Operations: \`${requiresSiblings}\` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)`,
      BR,
      docs.description,
    );

    if (docs.examples?.length > 0) {
      blocks.push('## Usage Examples');

      for (const { usage, title, code } of docs.examples) {
        const isJsCode = ['gql`', '/* GraphQL */'].some(str => code.includes(str));
        blocks.push(`### ${title}`, '```' + (isJsCode ? 'js' : 'graphql'));

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

      blocks.push('## Config Schema', md(jsonSchema, '##'));
    }

    blocks.push('## Resources');

    if (graphQLJSRuleName) {
      blocks.push(
        `- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/${graphQLJSRuleName}Rule.ts)`,
        `- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/${graphQLJSRuleName}Rule-test.ts)`,
      );
    } else {
      blocks.push(
        `- [Rule source](../../packages/plugin/src/rules/${ruleName}.ts)`,
        `- [Test source](../../packages/plugin/tests/${ruleName}.spec.ts)`,
      );
    }
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
      const { docs } = rule.meta;

      return [
        link,
        docs.description.split('\n')[0],
        docs.isDisabledForAllConfig ? '' : docs.recommended ? '![recommended][]' : '![all][]',
        docs.graphQLJSRuleName ? Icon.GRAPHQL_JS : Icon.GRAPHQL_ESLINT,
        rule.meta.hasSuggestions ? Icon.HAS_SUGGESTIONS : rule.meta.fixable ? Icon.FIXABLE : '',
      ];
    });

  result.push({
    path: resolve(DOCS_PATH, 'README.md'),
    content: [
      '## Available Rules',
      'Each rule has emojis denoting:',
      `- ${Icon.GRAPHQL_ESLINT} \`graphql-eslint\` rule`,
      `- ${Icon.GRAPHQL_JS} \`graphql-js\` rule`,
      `- ${Icon.FIXABLE} if some problems reported by the rule are automatically fixable by the \`--fix\` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option`,
      `- ${Icon.HAS_SUGGESTIONS} if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)`,
      BR,
      '<!-- 🚨 IMPORTANT! Do not manually modify this table. Run: `yarn generate:docs` -->',
      printMarkdownTable(
        [
          `Name${NBSP.repeat(20)}`,
          'Description',
          { name: `${NBSP.repeat(4)}Config${NBSP.repeat(4)}`, align: 'center' },
          { name: `${Icon.GRAPHQL_ESLINT}${NBSP}/${NBSP}${Icon.GRAPHQL_JS}`, align: 'center' },
          { name: `${Icon.FIXABLE}${NBSP}/${NBSP}${Icon.HAS_SUGGESTIONS}`, align: 'center' },
        ],
        sortedRules,
      ),
      '[recommended]: https://img.shields.io/badge/-recommended-green.svg',
      '[all]: https://img.shields.io/badge/-all-blue.svg',
    ].join('\n'),
  });

  await Promise.all(
    result.map(r =>
      writeFile(
        r.path,
        format(r.content, {
          parser: 'markdown',
          ...prettierConfig,
        }),
      ),
    ),
  );

  console.log('✅  Documentation generated');
}

console.time('done');
generateDocs().then(() => {
  console.timeEnd('done');
});
