export { rules } from './rules';
export { processors } from './processors';
export * from './parser';
export * from './types';
export * from './testkit';
export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils';

export const configs = Object.fromEntries(
  [
    // Configs to extend from `configs` directory
    'schema-recommended',
    'schema-all',
    'operations-recommended',
    'operations-all',
    'relay',
  ].map(configName => [configName, { extends: `./configs/${configName}.json` }])
);
