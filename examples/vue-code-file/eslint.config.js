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
    // `eslint-plugin-vue` will set a default processor for `.vue` files
    // we use `eslint-merge-processors` to extend it
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
