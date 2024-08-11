import { configs } from './configs/index.js';
import { parseForESLint, parser } from './parser.js';
import { processor } from './processor.js';
import { rules } from './rules/index.js';

export * from './types.js';
export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils.js';

export const processors = { graphql: processor };

export { rules, configs, parser, parseForESLint };

export default {
  parser,
  processor,
  rules,
  configs,
};
