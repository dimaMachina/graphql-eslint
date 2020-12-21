import { GraphQLConfig, GraphQLExtensionDeclaration, loadConfigSync } from 'graphql-config';
import { schemaLoaders } from './schema';
import { operationsLoaders } from './sibling-operations';
import { ParserOptions } from './types';

export function loadGraphqlConfig(options: ParserOptions): GraphQLConfig | null {
  if (options?.skipGraphQLConfig) return null;
  if (!graphqlConfig) {
    graphqlConfig = loadConfigSync({
      throwOnEmpty: false,
      throwOnMissing: false,
      extensions: [addCodeFileLoaderExtension],
    });
  }

  return graphqlConfig;
}

let graphqlConfig: GraphQLConfig | null;

const addCodeFileLoaderExtension: GraphQLExtensionDeclaration = api => {
  schemaLoaders.forEach(loader => api.loaders.schema.register(loader));
  operationsLoaders.forEach(loader => api.loaders.documents.register(loader));
  return { name: 'graphql-eslint-loaders' };
};
