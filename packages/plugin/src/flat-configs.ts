import { parseForESLint } from './parser.js';
import { rules } from './rules/index.js';
import { configs } from './configs/index.js';

const baseOptions = {
  parser: { parseForESLint },
  plugins: {
    '@graphql-eslint': { rules },
  },
};

export const flatConfigs = {
  'operations-all': {
    ...baseOptions,
    rules: {
      ...configs['operations-recommended'].rules,
      ...configs['operations-all'].rules,
    },
  },
  'operations-recommended': {
    ...baseOptions,
    rules: configs['operations-recommended'].rules,
  },
  relay: {
    ...baseOptions,
    rules: configs.relay.rules,
  },
  'schema-all': {
    ...baseOptions,
    rules: {
      ...configs['schema-recommended'].rules,
      ...configs['schema-all'].rules,
    },
  },
  'schema-recommended': {
    ...baseOptions,
    rules: configs['schema-recommended'].rules,
  },
};
