import { processor } from './processor';

export { rules } from './rules';
export { parseForESLint } from './parser';
export * from './testkit';
export * from './types';
export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils';

export const processors = { graphql: processor };

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
