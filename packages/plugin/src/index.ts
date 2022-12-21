import { processor } from './processor';

export { rules } from './rules';
export { parseForESLint } from './parser';
export * from './testkit';
export * from './types';
export { requireGraphQLSchemaFromContext, requireSiblingsOperations } from './utils';

export const processors = { graphql: processor };

export { configs } from './legacy-configs';
