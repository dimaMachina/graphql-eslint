import graphqlPlugin from '@graphql-eslint/eslint-plugin';
import { rule } from './my-rule.js';

export default [
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@internal': {
        rules: {
          'my-rule': rule,
        },
      },
    },
    rules: {
      '@internal/my-rule': 'error',
    },
  },
];
