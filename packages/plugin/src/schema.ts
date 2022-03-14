import { GraphQLSchema } from 'graphql';
import { GraphQLProjectConfig } from 'graphql-config';
import { asArray } from '@graphql-tools/utils';
import debugFactory from 'debug';
import fastGlob from 'fast-glob';
import { ParserOptions } from './types';
import { loaderCache, logger } from './utils';

const schemaCache: Map<string, GraphQLSchema> = new Map();
const debug = debugFactory('graphql-eslint:schema');

export function getSchema(projectForFile: GraphQLProjectConfig, options: ParserOptions = {}): GraphQLSchema | null {
  const schemaKey = asArray(projectForFile.schema).sort().join(',');

  if (!schemaKey) {
    return null;
  }

  if (schemaCache.has(schemaKey)) {
    return schemaCache.get(schemaKey);
  }

  let schema: GraphQLSchema | null;
  try {
    debug('Loading schema from %o', projectForFile.schema);
    schema = projectForFile.loadSchemaSync(projectForFile.schema, 'GraphQLSchema', {
      cache: loaderCache,
      ...options.schemaOptions,
    });
    if (debug.enabled) {
      debug('Schema loaded: %o', schema instanceof GraphQLSchema);
      const schemaPaths = fastGlob.sync(projectForFile.schema as string | string[], {
        absolute: true,
      });
      debug('Schema pointers %O', schemaPaths);
    }
  } catch (e) {
    schema = null;
    logger.error('Error while loading schema\n', e);
  }

  schemaCache.set(schemaKey, schema);
  return schema;
}
