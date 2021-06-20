import { convertToESTree } from './estree-parser';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLError, TypeInfo } from 'graphql';
import { Linter } from 'eslint';
import fs from 'fs';
import { GraphQLESLintParseResult, ParserOptions } from './types';
import { extractTokens } from './utils';
import { getSchema } from './schema';
import { getSiblingOperations } from './sibling-operations';
import { loadGraphqlConfig } from './graphql-config';
import { createReachableTypesService, createUsedFieldsService } from './graphql-ast';

export function parse(code: string, options?: ParserOptions): Linter.ESLintParseResult['ast'] {
  return parseForESLint(code, options).ast;
}

export function parseForESLint(code: string, options?: ParserOptions): GraphQLESLintParseResult {
  const gqlConfig = loadGraphqlConfig(options);
  const schema = getSchema(options, gqlConfig);
  const siblingOperations = getSiblingOperations(options, gqlConfig);
  const parserServices = {
    hasTypeInfo: schema !== null,
    schema,
    siblingOperations,
    getReachableTypes: createReachableTypesService(schema),
    getUsedFields: createUsedFieldsService(schema, siblingOperations),
  };

  try {
    const filePath = options.filePath || '';
    const isVirtualFile = !fs.existsSync(options.filePath);
    const fileLoader = new GraphQLFileLoader();

    const graphqlAst = fileLoader.handleFileContent(code, filePath, {
      ...options.graphQLParserOptions,
      noLocation: false,
      skipGraphQLImport: isVirtualFile,
    });

    const { rootTree, comments } = convertToESTree(graphqlAst.document, schema ? new TypeInfo(schema) : null);
    const tokens = extractTokens(code);

    return {
      services: parserServices,
      parserServices,
      ast: {
        type: 'Program',
        body: [rootTree as any],
        sourceType: 'script',
        comments,
        loc: rootTree.loc,
        range: rootTree.range as [number, number],
        tokens,
      },
    };
  } catch (e) {
    // In case of GraphQL parser error, we report it to ESLint as a parser error that matches the requirements
    // of ESLint. This will make sure to display it correctly in IDEs and lint results.
    if (e instanceof GraphQLError) {
      const eslintError = {
        index: e.positions[0],
        lineNumber: e.locations[0].line,
        column: e.locations[0].column,
        message: `[graphql-eslint]: ${e.message}`,
      };

      throw eslintError;
    }

    e.message = `[graphql-eslint]: ${e.message}`;

    throw e;
  }
}
