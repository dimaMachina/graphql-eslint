import { rules } from '@graphql-eslint/eslint-plugin';

const { schemaRules, operationsRules, schemaAndOperationsRules } = Object.entries(rules)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce<{
    schemaRules: string[];
    operationsRules: string[];
    schemaAndOperationsRules: [];
  }>(
    (acc, [ruleId, curr]) => {
      // @ts-expect-error -- fixme
      const { category } = curr.meta.docs;
      if (category === 'Schema') {
        acc.schemaRules.push(ruleId);
      } else if (category === 'Operations') {
        acc.operationsRules.push(ruleId);
      } else {
        // @ts-expect-error -- fixme
        acc.schemaAndOperationsRules.push(ruleId);
      }
      return acc;
    },
    { schemaRules: [], operationsRules: [], schemaAndOperationsRules: [] },
  );

export default {
  docs: {
    title: 'Documentation',
    type: 'page',
    items: {
      index: '',
      usage: {
        title: 'Usage',
        items: {
          _1: {
            type: 'separator',
            title: 'Basic',
          },
          graphql: '',
          js: '',
          'schema-and-operations': '',
          'multiple-projects': '',
          programmatic: '',
          _2: {
            type: 'separator',
            title: 'Advanced',
          },
          svelte: '',
          vue: '',
          astro: '',
          prettier: '',
        },
      },
      _1: {
        type: 'separator',
        title: 'Users',
      },
      configs: '',
      rules: {
        title: 'Rules',
        href: '/rules',
      },
      'disabling-rules': '',
      vscode: '',
      playground: {
        title: 'Playground',
        href: '/play',
      },
      _2: {
        type: 'separator',
        title: 'Developers',
      },
      parser: '',
      'custom-rules': '',
    },
  },
  rules: {
    title: 'Rules',
    type: 'page',
    items: {
      index: {
        theme: {
          layout: 'full',
        },
      },
      prettier: '',
      'deprecated-rules': '',
      _1: {
        title: 'Schema & Operations Rules',
        type: 'separator',
      },
      ...Object.fromEntries(schemaAndOperationsRules.map(key => [key, ''])),
      _2: {
        title: 'Schema Rules',
        type: 'separator',
      },
      ...Object.fromEntries(schemaRules.map(key => [key, ''])),
      _3: {
        title: 'Operations Rules',
        type: 'separator',
      },
      ...Object.fromEntries(operationsRules.map(key => [key, ''])),
    },
  },
  play: {
    title: 'Playground',
    type: 'page',
    theme: {
      footer: false,
    },
  },
};
