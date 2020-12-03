import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { buildSchema, GraphQLSchema } from 'graphql';
import { GraphQLConfig, loadConfigSync } from 'graphql-config';
import { dirname } from 'path';
import { ParserOptions } from './types';

const schemaCache: Map<string, GraphQLSchema> = new Map();

export function getSchema(options: ParserOptions, gqlConfig: GraphQLConfig): GraphQLSchema | null {
  let schema: GraphQLSchema | null = null;

  // We first try to use graphql-config for loading the schema, based on the type of the file,
  // We are using the directory of the file as the key for the schema caching, to avoid reloading of the schema.
  if (options && options.filePath && !options.skipGraphQLConfig) {
    const fileDir = dirname(options.filePath);

    if (schemaCache.has(fileDir)) {
      schema = schemaCache.get(fileDir);
    } else {
      if (gqlConfig) {
        const projectForFile = gqlConfig.getProject(options.filePath);

        if (projectForFile) {
          schema = projectForFile.getSchemaSync();
          schemaCache.set(fileDir, schema);
        }
      }
    }
  }

  // If schema was not loaded yet, and user configured it in the parserConfig, we can try to load it,
  // In this case, the cache key is the path for the schema. This is needed in order to allow separate
  // configurations for different file paths (a very edgey case).
  if (options && !schema && options.schema) {
    const schemaKey = Array.isArray(options.schema) ? options.schema.join(',') : options.schema;

    if (schemaCache.has(schemaKey)) {
      schema = schemaCache.get(schemaKey);
    } else {
      try {
        schema = loadSchemaSync(options.schema, {
          ...(options.schemaOptions || {}),
          assumeValidSDL: true,
          loaders: [
            {
              loaderId: () => 'direct-string',
              canLoad: async () => false,
              load: async () => null,
              canLoadSync: pointer => typeof pointer === 'string' && pointer.includes('type '),
              loadSync: pointer => ({
                schema: buildSchema(pointer),
              }),
            },
            new GraphQLFileLoader(),
            new JsonFileLoader(),
            new UrlLoader(),
          ],
        });
        schemaCache.set(schemaKey, schema);
      } catch (e) {
        e.message = e.message + `\nRunning from directory: ${process.cwd()}`;

        throw e;
      }
    }
  }

  return schema;
}
