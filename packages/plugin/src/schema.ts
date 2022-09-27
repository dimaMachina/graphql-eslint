import { GraphQLSchema } from 'graphql';
import { GraphQLProjectConfig } from 'graphql-config';
import { asArray } from '@graphql-tools/utils';
import debugFactory from 'debug';
import fastGlob from 'fast-glob';
import chalk from 'chalk';
import type { ParserOptions, Schema, Pointer } from './types';

const schemaCache = new Map<string, GraphQLSchema | Error>();
const debug = debugFactory('graphql-eslint:schema');

export function getSchema(
  projectForFile: GraphQLProjectConfig,
  options: Omit<ParserOptions, 'filePath'> = {}
): Schema {
  const schemaKey = asArray(projectForFile.schema).sort().join(',');

  if (!schemaKey) {
    return null;
  }

  if (schemaCache.has(schemaKey)) {
    return schemaCache.get(schemaKey);
  }

  let schema: Schema;

  try {
    debug('Loading schema from %o', projectForFile.schema);
    schema = projectForFile.loadSchemaSync(
      projectForFile.schema,
      'GraphQLSchema',
      options.schemaOptions
    );
    if (debug.enabled) {
      debug('Schema loaded: %o', schema instanceof GraphQLSchema);
      const schemaPaths = fastGlob.sync(projectForFile.schema as Pointer, {
        absolute: true,
      });
      debug('Schema pointers %O', schemaPaths);
    }
  } catch (error) {
    error.message = chalk.red(`Error while loading schema: ${error.message}`);
    schema = error as Error;
  }

  schemaCache.set(schemaKey, schema);
  return schema;
}
