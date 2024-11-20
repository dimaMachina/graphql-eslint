import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import { mergeProcessors } from 'eslint-merge-processors';
import processorVueBlocks from 'eslint-processor-vue-blocks';

export default [
  {
    files: ['**/*.js'],
    processor: graphqlPlugin.processor,
    rules: js.configs.recommended.rules,
  },
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    // `eslint-plugin-svelte` will set a default processor for `.svelte` files
    // we use `eslint-merge-processors` to extend it
    processor: mergeProcessors([
      eslintPluginSvelte.processors.svelte,
      processorVueBlocks({
        blocks: {
          script: true,
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
