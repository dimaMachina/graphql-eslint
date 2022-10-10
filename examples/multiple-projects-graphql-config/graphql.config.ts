import { IGraphQLConfig } from 'graphql-config';
import { GraphQLTagPluckOptions } from '@graphql-tools/graphql-tag-pluck';

const config: IGraphQLConfig = {
  projects: {
    firstProject: {
      schema: 'schema.first-project.graphql',
      documents: 'query.first-project.js',
    },
    secondProject: {
      schema: 'schema.second-project.graphql',
      documents: 'query.second-project.js',
      extensions: {
        // in case you want to use different names for magic comment and module identifier
        pluckConfig: <GraphQLTagPluckOptions>{
          modules: [{ name: 'custom-graphql-tag', identifier: 'custom' }],
          globalGqlIdentifierName: 'custom',
          gqlMagicComment: 'MyGraphQL',
        },
      },
    },
  },
};

export default config;
