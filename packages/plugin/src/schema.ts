import { GraphQLSchema } from 'graphql';
import { GraphQLConfig } from 'graphql-config';
import { asArray } from '@graphql-tools/utils';
import { ParserOptions } from './types';
import { getOnDiskFilepath, loaderCache } from './utils';

const schemaCache: Map<string, GraphQLSchema> = new Map();

export function getSchema(options: ParserOptions = {}, gqlConfig: GraphQLConfig): GraphQLSchema | null {
  const realFilepath = options.filePath ? getOnDiskFilepath(options.filePath) : null;
  const projectForFile = realFilepath ? gqlConfig.getProjectForFile(realFilepath) : gqlConfig.getDefault();
  const schemaKey = asArray(projectForFile.schema)
    .sort()
    .join(',');

  if (!schemaKey) {
    return null;
  }

  let schema = schemaCache.get(schemaKey);

  if (!schema) {
    schema = projectForFile.loadSchemaSync(projectForFile.schema, 'GraphQLSchema', {
      cache: loaderCache,
      ...options.schemaOptions
    });
    schemaCache.set(schemaKey, schema);
  }

  return schema;
}
