import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';
import pluginVue from 'eslint-plugin-vue'
import processorVueBlocks from 'eslint-processor-vue-blocks'
import { mergeProcessors } from 'eslint-merge-processors'

export default [
  {
    files: ['**/*.js'],
    rules: js.configs.recommended.rules,
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    // `eslint-plugin-vue` will set a default processor for `.vue` files
    // we use `eslint-merge-processors` to extend it
    processor: mergeProcessors([
      pluginVue.processors['.vue'],
      processorVueBlocks({
        blocks: {
          styles: true,
          customBlocks: true,
          // Usually it's not recommended to lint <script> and <template>
          // As eslint-plugin-vue already provides the support
          script: true,
          template: false,
        }
      }),
    ]),
  },
  {
    files: ['**/*.js'],
    processor: graphqlPlugin.processor,
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
