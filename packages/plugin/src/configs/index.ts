import { Linter } from 'eslint';
import { ConfigName } from '../types.js';
import operationsAllConfig from './operations-all.js';
import operationsRecommendedConfig from './operations-recommended.js';
import schemaAllConfig from './schema-all.js';
import schemaRecommendedConfig from './schema-recommended.js';
import relayConfig from './schema-relay.js';

export const configs = {
  'schema-recommended': schemaRecommendedConfig,
  'schema-all': schemaAllConfig,
  'schema-relay': relayConfig,
  'operations-recommended': operationsRecommendedConfig,
  'operations-all': operationsAllConfig,
  'flat/schema-recommended': {
    rules: schemaRecommendedConfig.rules,
  },
  'flat/schema-all': {
    rules: {
      ...schemaRecommendedConfig.rules,
      ...schemaAllConfig.rules,
    },
  },
  'flat/schema-relay': {
    rules: relayConfig.rules,
  },
  'flat/operations-recommended': {
    rules: operationsRecommendedConfig.rules,
  },
  'flat/operations-all': {
    rules: {
      ...operationsRecommendedConfig.rules,
      ...operationsAllConfig.rules,
    },
  },
} satisfies Record<ConfigName, Linter.LegacyConfig> & Record<`flat/${ConfigName}`, Linter.Config>;
