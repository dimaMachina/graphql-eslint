import { parseForESLint } from './parser';
import { rules } from './rules';
import { configs } from './configs';

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
