import { ConfigName } from '../types.js';
// @ts-expect-error
import operationsAllConfig from './operations-all.js';
// @ts-expect-error
import operationsRecommendedConfig from './operations-recommended.js';
// @ts-expect-error
import schemaAllConfig from './schema-all.js';
// @ts-expect-error
import schemaRecommendedConfig from './schema-recommended.js';
// @ts-expect-error
import relayConfig from './schema-relay.js';

export const configs = {
  'schema-recommended': schemaRecommendedConfig,
  'schema-all': schemaAllConfig,
  'schema-relay': relayConfig,
  'operations-recommended': operationsRecommendedConfig,
  'operations-all': operationsAllConfig,
} satisfies Record<ConfigName, unknown>;
