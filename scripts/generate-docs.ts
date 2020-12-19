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

    if (docs.category !== undefined) {
      blocks.push(`- Category: \`${docs.category}\``);
    }

    blocks.push(`- Rule name: \`@graphql-eslint/${ruleName}\``);

    if (docs.requiresSchema !== undefined) {
      blocks.push(`- Requires GraphQL Schema: \`${docs.requiresSchema}\``);
    }

    if (docs.requiresSiblings !== undefined) {
      blocks.push(`- Requires GraphQL Operations: \`${docs.requiresSiblings}\``);
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
      const isArray = Array.isArray(rule.meta.schema);

      const patchedSchema = {
        type: isArray ? 'array' : 'object',
        ...(isArray ? { items: rule.meta.schema[0] } : rule.meta.schema[0]),
        $schema: 'http://json-schema.org/draft-04/schema',
      };

      blocks.push(md(patchedSchema, '##'));
    }

    return {
      content: blocks.join('\n'),
      path: outputPath,
    };
  });

  for (const r of result) {
    writeFileSync(r.path, r.content);
  }
}

main();
