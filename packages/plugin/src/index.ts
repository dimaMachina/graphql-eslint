import { configs } from './configs/index.js';
import { processor } from './processor.js';
import { rules } from './rules/index.js';

export { parser, parseForESLint } from './parser.js';

export * from './types.js';
export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils.js';

export const processors = { graphql: processor };

export { rules, configs };

export default {
  rules,
  configs,
};
