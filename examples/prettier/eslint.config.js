import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default [
  {
    plugins: {
      prettier: { rules: prettierPlugin.rules },
    },
  },
  {
    files: ['**/*.js'],
    processor: graphqlPlugin.processor,
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': {
        rules: graphqlPlugin.rules,
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
