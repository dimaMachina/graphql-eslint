import { GraphQLConfig, GraphQLExtensionDeclaration, loadConfigSync, SchemaPointer } from 'graphql-config';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { ParserOptions } from './types';

let graphqlConfig: GraphQLConfig;

export function loadGraphqlConfig(options: ParserOptions): GraphQLConfig {
  // We don't want cache config on test environment
  // Otherwise schema and documents will be same for all tests
  if (process.env.NODE_ENV !== 'test' && graphqlConfig) {
    return graphqlConfig;
  }

  const onDiskConfig = options.skipGraphQLConfig
    ? null
    : loadConfigSync({
        throwOnEmpty: false,
        throwOnMissing: false,
        extensions: [addCodeFileLoaderExtension],
      });

  graphqlConfig =
    onDiskConfig ||
    new GraphQLConfig(
      {
        config: options.projects
          ? { projects: options.projects }
          : {
              schema: (options.schema || '') as SchemaPointer, // if `schema` is `undefined` will throw error `Project 'default' not found`
              documents: options.documents || options.operations,
              extensions: options.extensions,
              include: options.include,
              exclude: options.exclude,
            },
        filepath: 'virtual-config',
      },
      [addCodeFileLoaderExtension]
    );

  return graphqlConfig;
}

const addCodeFileLoaderExtension: GraphQLExtensionDeclaration = api => {
  api.loaders.schema.register(new CodeFileLoader());
  api.loaders.documents.register(new CodeFileLoader());
  return { name: 'graphql-eslint-loaders' };
};
