import { writeFileSync } from 'fs';
import { resolve } from 'path';
import dedent from 'dedent';
import { rules } from '../packages/plugin/src/rules';
const md = require('json-schema-to-markdown');

const BR = '';

async function main() {
  const result = Object.keys(rules).map(ruleName => {
    const rule = rules[ruleName];
    const docs = rule.meta.docs;
    const outputPath = resolve(
      __dirname,
      '../',
      rule.meta.docs.url.replace('https://github.com/dotansimha/graphql-eslint/blob/master/', '')
    );

    const blocks: string[] = [`# \`${ruleName}\``, BR];

    if (rule.meta.deprecated) {
      blocks.push(`- ❗ DEPRECATED ❗`);
    }

    if (docs.category !== undefined) {
      blocks.push(`- Category: \`${docs.category}\``);
    }

    blocks.push(`- Rule name: \`@graphql-eslint/${ruleName}\``);

    if (docs.requiresSchema !== undefined) {
      blocks.push(
        `- Requires GraphQL Schema: \`${docs.requiresSchema}\` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)`
      );
    }

    if (docs.requiresSiblings !== undefined) {
      blocks.push(
        `- Requires GraphQL Operations: \`${docs.requiresSiblings}\` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)`
      );
    }

    blocks.push(BR, docs.description);

    const examples = docs.examples || [];

    if (examples.length > 0) {
      blocks.push(BR, `## Usage Examples`);

      for (const example of examples) {
        blocks.push(
          `\n### ${example.title}\n\n\`\`\`graphql\n# eslint @graphql-eslint/${ruleName}: ["error"${
            example.usage ? ', ' + JSON.stringify(example.usage) : ''
          }]\n\n${dedent(example.code)}\n\`\`\``
        );
      }
    }

    if (rule.meta?.schema) {
      blocks.push(BR, `## Config Schema`, BR);
      let jsonSchema = rule.meta.schema;
      const isArray = Array.isArray(rule.meta.schema);

      if (isArray) {
        jsonSchema = {
          type: isArray ? 'array' : 'object',
          ...(isArray ? { items: rule.meta.schema[0] } : rule.meta.schema[0]),
          $schema: 'http://json-schema.org/draft-04/schema',
        };
      }

      blocks.push(md(jsonSchema, '##'));
    }

    return {
      content: blocks.join('\n'),
      path: outputPath,
    };
  });

  result.push({
    path: resolve(__dirname, '../docs/README.md'),
    content: [
      `## Available Rules`,
      BR,
      BR,
      ...Object.keys(rules).map(rule => `- [\`${rule}\`](./rules/${rule}.md)`),
      BR,
      `## Further Reading`,
      BR,
      `- [Writing Custom Rules](./custom-rules.md)`,
      `- [How the parser works?](./parser.md)`,
      `- [\`parserOptions\`](./parser-options.md)`,
    ].join('\n'),
  });

  for (const r of result) {
    writeFileSync(r.path, r.content);
  }
}

main();
