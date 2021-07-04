import { writeFileSync } from 'fs';
import { resolve } from 'path';
import dedent from 'dedent';
import md from 'json-schema-to-markdown';
import prettier from 'prettier';
import { rules } from '../packages/plugin/src';
import { GRAPHQL_JS_VALIDATIONS } from '../packages/plugin/src/rules/graphql-js-validation';

const BR = '';
const EMOJI_GRAPHQL_ESLINT = '🚀';
const EMOJI_GRAPHQL_JS = '🔮';
const EMOJI_FIXABLE = '🔧';
// const EMOJI_RECOMMENDED = '✅';

async function main() {
  const result = Object.entries(rules).map(([ruleName, rule]) => {
    const blocks: string[] = [`# \`${ruleName}\``, BR];
    const { deprecated, docs, schema } = rule.meta;

    if (deprecated) {
      blocks.push(`- ❗ DEPRECATED ❗`);
    }

    if (docs.category) {
      blocks.push(`- Category: \`${docs.category}\``);
    }

    const requiresSchema = Boolean(docs.requiresSchema);
    const requiresSiblings = Boolean(docs.requiresSiblings);

    blocks.push(
      `- Rule name: \`@graphql-eslint/${ruleName}\``,
      `- Requires GraphQL Schema: \`${requiresSchema}\` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)`,
      `- Requires GraphQL Operations: \`${requiresSiblings}\` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)`,
      BR,
      docs.description
    );

    if (docs.examples?.length > 0) {
      blocks.push(BR, `## Usage Examples`);

      for (const { usage = [], title, code } of docs.examples) {
        const options =
          usage.length > 0
            ? prettier
                // ESLint RuleTester accept options as array but in eslintrc config we must provide options as object
                .format(JSON.stringify(['error', ...usage]), {
                  parser: 'babel',
                  singleQuote: true,
                  printWidth: Infinity,
                })
                .replace(';\n', '')
            : "'error'";

        blocks.push(
          BR,
          `### ${title}`,
          BR,
          '```graphql',
          `# eslint @graphql-eslint/${ruleName}: ${options}`,
          BR,
          dedent(code),
          '```'
        );
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

    const outputPath = resolve(
      __dirname,
      docs.url.replace('https://github.com/dotansimha/graphql-eslint/blob/master', '..')
    );

    return {
      path: outputPath,
      content: blocks.join('\n'),
    };
  });

  const sortedRulesRows = Object.keys(rules)
    .sort()
    .map(ruleName => {
      const link = `[${ruleName}](rules/${ruleName}.md)`;
      const { docs, fixable } = rules[ruleName].meta;
      const { description = '' } = docs;

      return `| ${[
        link,
        description.split('\n')[0],
        '&nbsp;'.repeat(4) + (ruleName in GRAPHQL_JS_VALIDATIONS ? EMOJI_GRAPHQL_JS : EMOJI_GRAPHQL_ESLINT),
        fixable ? EMOJI_FIXABLE : '',
        // docs.recommended ? EMOJI_RECOMMENDED : '',
      ].join(' | ')} |`;
    });

  const columns = [
    `Name${'&nbsp;'.repeat(40)}`,
    'Description',
    `${EMOJI_GRAPHQL_ESLINT}&nbsp;/&nbsp;${EMOJI_GRAPHQL_JS}`,
    EMOJI_FIXABLE,
    // EMOJI_RECOMMENDED,
  ];

  result.push({
    path: resolve(__dirname, '../docs/README.md'),
    content: [
      `## Available Rules`,
      BR,
      BR,
      'Each rule has emojis denoting:',
      BR,
      `* ${EMOJI_GRAPHQL_ESLINT} \`graphql-eslint\` rule`,
      `* ${EMOJI_GRAPHQL_JS} \`graphql-js\` rule`,
      `* ${EMOJI_FIXABLE} if some problems reported by the rule are automatically fixable by the \`--fix\` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option`,
      // `* ${EMOJI_RECOMMENDED} if it belongs to the \`recommended\` configuration`, // TODO: add when recommended config will be available
      BR,
      '<!-- Do not manually modify this table. Run: `yarn generate:docs` -->',
      '<!-- RULES_TABLE_START -->',
      `| ${columns.join(' | ')} |`,
      `|${' :-- |'.repeat(columns.length)}`,
      sortedRulesRows.join('\n'),
      '<!-- RULES_TABLE_END -->',
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
}

main();
