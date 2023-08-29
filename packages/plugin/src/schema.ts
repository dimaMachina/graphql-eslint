import debugFactory from 'debug';
import fg from 'fast-glob';
import { GraphQLSchema } from 'graphql';
import { GraphQLProjectConfig } from 'graphql-config';
import { ModuleCache } from './cache.js';
import { Pointer, Schema } from './types.js';

const schemaCache = new ModuleCache<GraphQLSchema>();
const debug = debugFactory('graphql-eslint:schema');

export function getSchema(project: GraphQLProjectConfig): Schema {
  const schemaKey = project.schema;

  if (!schemaKey) {
    return null;
  }

  const cache = schemaCache.get(schemaKey);

  if (cache) {
    return cache;
  }

  debug('Loading schema from %o', project.schema);
  const schema = project.loadSchemaSync(project.schema, 'GraphQLSchema', {
    pluckConfig: project.extensions.pluckConfig,
  });
  if (debug.enabled) {
    debug('Schema loaded: %o', schema instanceof GraphQLSchema);
    const schemaPaths = fg.sync(project.schema as Pointer, { absolute: true });
    debug('Schema pointers %O', schemaPaths);
  }
  schemaCache.set(schemaKey, schema);

  return schema;
}
