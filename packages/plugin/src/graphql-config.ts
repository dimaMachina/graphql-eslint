import path from 'node:path';
import debugFactory from 'debug';
import { GraphQLConfig, GraphQLExtensionDeclaration, loadConfigSync } from 'graphql-config';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { ParserOptions } from './types.js';

const debug = debugFactory('graphql-eslint:graphql-config');
let graphQLConfig: GraphQLConfig;

export function loadOnDiskGraphQLConfig(filePath: string): GraphQLConfig {
  return loadConfigSync({
    // load config relative to the file being linted
    rootDir: path.dirname(filePath),
    throwOnMissing: false,
    extensions: [codeFileLoaderExtension],
  });
}

export function loadGraphQLConfig({
  graphQLConfig: config,
  filePath,
}: ParserOptions): GraphQLConfig {
  // We don't want cache config on test environment
  // Otherwise schema and documents will be same for all tests
  if (process.env.NODE_ENV !== 'test' && graphQLConfig) {
    return graphQLConfig;
  }
  debug('parserOptions.graphQLConfig: %o', config);
  const onDiskConfig = !config && loadOnDiskGraphQLConfig(filePath);
  if (onDiskConfig) {
    debug('GraphQL-Config path %o', onDiskConfig.filepath);
  }

  const configOptions =
    config && ('projects' in config || 'schemaPath' in config)
      ? config
      : {
          // if `schema` is `undefined` will throw error `Project 'default' not found`
          schema: config?.schema ?? '',
          ...config,
        };

  graphQLConfig =
    onDiskConfig ||
    new GraphQLConfig({ config: configOptions, filepath: '' }, [codeFileLoaderExtension]);

  return graphQLConfig;
}

const codeFileLoaderExtension: GraphQLExtensionDeclaration = api => {
  const { schema, documents } = api.loaders;
  schema.register(new CodeFileLoader());
  documents.register(new CodeFileLoader());
  return { name: 'code-file-loaders' };
};
