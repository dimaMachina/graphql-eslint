import { configs } from './configs/index.js';
import { parseForESLint } from './parser.js';
import { ConfigName } from './types.js';

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
  'schema-relay': {
    languageOptions,
    rules: configs['schema-relay'].rules,
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
} satisfies Record<ConfigName, unknown>;
