import operationsAllConfig from './operations-all.js';
import operationsRecommendedConfig from './operations-recommended.js';
import relayConfig from './relay.js';
import schemaAllConfig from './schema-all.js';
import schemaRecommendedConfig from './schema-recommended.js';

export const configs = {
  'schema-recommended': schemaRecommendedConfig,
  'schema-all': schemaAllConfig,
  'operations-recommended': operationsRecommendedConfig,
  'operations-all': operationsAllConfig,
  relay: relayConfig,
};
