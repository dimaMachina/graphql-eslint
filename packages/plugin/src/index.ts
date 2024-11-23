import { configs } from './configs/index.js';
import { parseForESLint, parser } from './parser.js';
import { processor } from './processor.js';
import { rules } from './rules/index.js';

export * from './types.js';
export type { IGraphQLConfig } from 'graphql-config';
export type { GraphQLTagPluckOptions } from '@graphql-tools/graphql-tag-pluck';

export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils.js';

export const processors = { graphql: processor };

export { rules, configs, parser, parseForESLint };

// eslint-disable-next-line import/no-default-export -- It's common practice for ESLint plugins that supports Flat config to use the default export
export default {
  parser,
  processor,
  rules,
  configs,
};
