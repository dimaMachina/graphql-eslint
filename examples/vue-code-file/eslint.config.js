import { mergeProcessors } from 'eslint-merge-processors';
import pluginVue from 'eslint-plugin-vue';
import processorVueBlocks from 'eslint-processor-vue-blocks';
import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    processor: graphqlPlugin.processor,
    rules: js.configs.recommended.rules,
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    // Vue still needs to be parsed by the Vue parser for normal linting. But GraphQL's lint needs to lint only the JS/TS part,
    // so extract those as blocks using eslint-processor-vue-blocks. This turns the script parts of Vue SFCs into virtual JS/TS
    // blocks inside ESLint. ESLint can then parse the JS/TS to find GraphQL parts. And finally, graphql-eslint can lint the resulting GraphQL
    processor: mergeProcessors([
      pluginVue.processors.vue,
      processorVueBlocks({
        blocks: {
          script: true,
          scriptSetup: true,
          customBlocks: true,
        },
      }),
    ]),
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/no-duplicate-fields': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
          },
        },
      ],
    },
  },
];
