import { ParseOptions as GraphQLParseOptions, GraphQLSchema } from "graphql";
import { Linter } from "eslint";
import { GraphQLProjectConfig } from "graphql-config";

export interface ParserOptions extends Omit<GraphQLParseOptions, "noLocation"> {
  schemaPath?: string | string[];
  skipGraphQLConfig?: boolean;
  filePath?: string;
}

export type GraphQLESLintParseResult = Linter.ESLintParseResult & {
  services: ParserServices;
};

export type ParserServices = {
  graphqlConfigProject: GraphQLProjectConfig | null;
  hasTypeInfo: boolean;
  schema: GraphQLSchema | null;
};