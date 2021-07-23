import { GraphQLSchema } from 'graphql';
import { GraphQLConfig } from 'graphql-config';
import { asArray } from '@graphql-tools/utils';
import { ParserOptions } from './types';
import { getOnDiskFilepath } from './utils';

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

  if (schemaCache.has(schemaKey)) {
    return schemaCache.get(schemaKey);
  }

  const schema = projectForFile.loadSchemaSync(projectForFile.schema, 'GraphQLSchema', options.schemaOptions);
  schemaCache.set(schemaKey, schema);

  return schema;
}
