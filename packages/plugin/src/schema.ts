import { GraphQLSchema } from 'graphql';
import { GraphQLProjectConfig } from 'graphql-config';
import debugFactory from 'debug';
import fg from 'fast-glob';
import chalk from 'chalk';
import { ParserOptions, Schema, Pointer } from './types.js';
import { ModuleCache } from './cache.js';

const schemaCache = new ModuleCache<GraphQLSchema | Error>();
const debug = debugFactory('graphql-eslint:schema');

export function getSchema(
  project: GraphQLProjectConfig,
  schemaOptions?: ParserOptions['schemaOptions'],
): Schema {
  const schemaKey = project.schema;

  if (!schemaKey) {
    return null;
  }

  const cache = schemaCache.get(schemaKey);

  if (cache) {
    return cache;
  }

  let schema: Schema;

  try {
    debug('Loading schema from %o', project.schema);
    schema = project.loadSchemaSync(project.schema, 'GraphQLSchema', {
      ...schemaOptions,
      pluckConfig: project.extensions.pluckConfig,
    });
    if (debug.enabled) {
      debug('Schema loaded: %o', schema instanceof GraphQLSchema);
      const schemaPaths = fg.sync(project.schema as Pointer, { absolute: true });
      debug('Schema pointers %O', schemaPaths);
    }
    // Do not set error to cache, since cache reload will be done after some `lifetime` seconds
    schemaCache.set(schemaKey, schema);
  } catch (error) {
    error.message = chalk.red(`Error while loading schema: ${error.message}`);
    schema = error as Error;
  }
  return schema;
}
