import { dirname } from 'path';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import debugFactory from 'debug';
import {
  GraphQLConfig,
  GraphQLExtensionDeclaration,
  loadConfigSync,
  SchemaPointer,
} from 'graphql-config';
import { ParserOptions } from './types.js';

const debug = debugFactory('graphql-eslint:graphql-config');
let graphQLConfig: GraphQLConfig;

export function loadOnDiskGraphQLConfig(filePath: string): GraphQLConfig {
  return loadConfigSync({
    // load config relative to the file being linted
    rootDir: dirname(filePath),
    throwOnEmpty: false,
    throwOnMissing: false,
    extensions: [codeFileLoaderExtension],
  });
}

export function loadGraphQLConfig(options: ParserOptions): GraphQLConfig {
  // We don't want cache config on test environment
  // Otherwise schema and documents will be same for all tests
  if (process.env.NODE_ENV !== 'test' && graphQLConfig) {
    return graphQLConfig;
  }

  const onDiskConfig = !options.skipGraphQLConfig && loadOnDiskGraphQLConfig(options.filePath);

  debug('options.skipGraphQLConfig: %o', options.skipGraphQLConfig);
  if (onDiskConfig) {
    debug('Graphql-config path %o', onDiskConfig.filepath);
  }

  const configOptions = options.projects
    ? { projects: options.projects }
    : {
        schema: (options.schema || '') as SchemaPointer, // if `schema` is `undefined` will throw error `Project 'default' not found`
        documents: options.documents,
        extensions: options.extensions,
        include: options.include,
        exclude: options.exclude,
      };

  graphQLConfig =
    onDiskConfig ||
    new GraphQLConfig(
      {
        config: configOptions,
        filepath: 'virtual-config',
      },
      [codeFileLoaderExtension],
    );

  return graphQLConfig;
}

const codeFileLoaderExtension: GraphQLExtensionDeclaration = api => {
  const { schema, documents } = api.loaders;
  schema.register(new CodeFileLoader());
  documents.register(new CodeFileLoader());
  return { name: 'graphql-eslint-loaders' };
};
