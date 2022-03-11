import { GraphQLSchema } from 'graphql';
import { GraphQLConfig } from 'graphql-config';
import { asArray } from '@graphql-tools/utils';
import debugFactory from 'debug'
import { ParserOptions } from './types';
import { getOnDiskFilepath, loaderCache, logger } from './utils';

const schemaCache: Map<string, GraphQLSchema> = new Map();
const debug = debugFactory('graphql-eslint:schema')

export function getSchema(options: ParserOptions = {}, gqlConfig: GraphQLConfig): GraphQLSchema | null {
  const realFilepath = options.filePath ? getOnDiskFilepath(options.filePath) : null;
  const projectForFile = realFilepath ? gqlConfig.getProjectForFile(realFilepath) : gqlConfig.getDefault();
  const schemaKey = asArray(projectForFile.schema).sort().join(',');

  if (!schemaKey) {
    return null;
  }

  if (schemaCache.has(schemaKey)) {
    return schemaCache.get(schemaKey);
  }

  let schema: GraphQLSchema | null;
  try {
    debug('Loading schema `%s`', projectForFile.schema)
    schema = projectForFile.loadSchemaSync(projectForFile.schema, 'GraphQLSchema', {
      cache: loaderCache,
      ...options.schemaOptions,
    });
    debug('Schema loaded:', schema instanceof GraphQLSchema)
  } catch (e) {
    schema = null;
    logger.error('Error while loading schema\n', e);
  }

  schemaCache.set(schemaKey, schema);
  return schema;
}
