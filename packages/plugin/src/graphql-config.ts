import path from 'node:path';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import debugFactory from 'debug';
import { GraphQLConfig, GraphQLExtensionDeclaration, loadConfigSync } from 'graphql-config';
import { ParserOptions } from './types.js';

const debug = debugFactory('graphql-eslint:graphql-config');
let graphQLConfig: GraphQLConfig;

export function loadOnDiskGraphQLConfig(filePath: string): GraphQLConfig {
  return loadConfigSync({
    // load config relative to the file being linted
    rootDir: path.dirname(filePath),
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
  debug('options.graphQLConfig: %o', config);

  if (config) {
    if ('documents' in config) {
      // if `schema` is `undefined` will throw error `Project 'default' not found`
      config.schema ??= '';
    }
    graphQLConfig = new GraphQLConfig({ config, filepath: '' }, [codeFileLoaderExtension]);
  } else {
    graphQLConfig = loadOnDiskGraphQLConfig(filePath);
    debug('GraphQL-Config path %o', graphQLConfig.filepath);
  }

  return graphQLConfig;
}

const codeFileLoaderExtension: GraphQLExtensionDeclaration = api => {
  const { schema, documents } = api.loaders;
  schema.register(new CodeFileLoader());
  documents.register(new CodeFileLoader());
  return { name: 'graphql-eslint-loaders' };
};
