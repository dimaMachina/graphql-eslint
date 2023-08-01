import { processor } from './processor.js';

export { parseForESLint } from './parser.js';
export { rules } from './rules/index.js';
export * from './types.js';
export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils.js';

export const processors = { graphql: processor };

export { configs } from './configs/index.js';
export { flatConfigs } from './flat-configs.js';
