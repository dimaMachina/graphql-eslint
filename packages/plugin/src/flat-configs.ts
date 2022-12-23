import { parseForESLint } from './parser.js';
import { configs } from './configs/index.js';

const languageOptions = {
  parser: { parseForESLint },
};

export const flatConfigs = {
  'operations-all': {
    languageOptions,
    rules: {
      ...configs['operations-recommended'].rules,
      ...configs['operations-all'].rules,
    },
  },
  'operations-recommended': {
    languageOptions,
    rules: configs['operations-recommended'].rules,
  },
  relay: {
    languageOptions,
    rules: configs.relay.rules,
  },
  'schema-all': {
    languageOptions,
    rules: {
      ...configs['schema-recommended'].rules,
      ...configs['schema-all'].rules,
    },
  },
  'schema-recommended': {
    languageOptions,
    rules: configs['schema-recommended'].rules,
  },
};
