import { GraphQLSchema } from 'graphql';
import { GraphQLESlintRuleContext } from './types';

export function requireGraphQLSchemaFromContext(context: GraphQLESlintRuleContext<any>): GraphQLSchema {
  if (!context || !context.parserServices) {
    throw new Error(
      `You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.schema" property for "@typescript-graphql/parser", or use graphql-config!`
    );
  }

  if (!context.parserServices.hasTypeInfo) {
    throw new Error(
      `You have used a rule which requires GraphQL Schema to be loaded. Found "parserServices" generated, but unable to load your GraphQL schema and it's type-info!`
    );
  }

  return context.parserServices.schema;
}
