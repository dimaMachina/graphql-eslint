import { parse } from "@graphql-eslint/graphql-estree";
import {
  GraphQLError,
  GraphQLSchema,
} from "graphql";
import { loadConfigSync, GraphQLProjectConfig } from "graphql-config";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { JsonFileLoader } from "@graphql-tools/json-file-loader";
import { UrlLoader } from "@graphql-tools/url-loader";
import { GraphQLESLintParseResult, ParserOptions } from "@graphql-eslint/types";

const DEFAULT_CONFIG: ParserOptions = {
  schemaPath: null,
  skipGraphQLConfig: false,
};

export function parseForESLint(
  code: string,
  options: ParserOptions
): GraphQLESLintParseResult {
  try {
    const config = {
      ...DEFAULT_CONFIG,
      ...options,
    };

    const estreeAst = parse(code, {
      ...config,
      noLocation: false,
    });

    let schema: GraphQLSchema = null;
    let configProject: GraphQLProjectConfig = null;

    if (!config.skipGraphQLConfig && options.filePath) {
      const gqlConfig = loadConfigSync({
        throwOnEmpty: false,
        throwOnMissing: false,
      });

      if (gqlConfig) {
        const projectForFile = gqlConfig.getProjectForFile(options.filePath);

        if (projectForFile) {
          configProject = projectForFile;
          schema = projectForFile.getSchemaSync();
        }
      }
    }

    if (!schema && config.schemaPath) {
      try {
        schema = loadSchemaSync(config.schemaPath, {
          ...config,
          loaders: [
            new GraphQLFileLoader(),
            new JsonFileLoader(),
            new UrlLoader(),
          ],
        });
      } catch (e) {
        e.message = e.message + `\nRunning from directory: ${process.cwd()}`;

        throw e;
      }
    }

    const parserServices = {
      graphqlConfigProject: configProject,
      hasTypeInfo: schema !== null,
      schema,
    };

    return {
      services: parserServices,
      parserServices,
      ast: {
        type: "Program",
        body: [estreeAst as any],
        sourceType: "script",
        comments: [],
        loc: estreeAst.loc,
        range: estreeAst.range,
        tokens: [],
      },
    };
  } catch (e) {
    if (e instanceof GraphQLError) {
      const eslintError = {
        index: e.positions[0],
        lineNumber: e.locations[0].line,
        column: e.locations[0].column,
        message: e.message,
      };

      throw eslintError;
    }

    throw e;
  }
}
