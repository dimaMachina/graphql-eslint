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
} satisfies Record<ConfigName, unknown>;
