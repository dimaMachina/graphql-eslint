import { parseGraphQLSDL } from '@graphql-tools/utils';
import { ASTNode, GraphQLError, TypeInfo, Source } from 'graphql';
import { Linter } from 'eslint';
import { convertToESTree } from './estree-parser';
import { GraphQLESLintParseResult, ParserOptions, ParserServices } from './types';
import { extractTokens } from './utils';
import { getSchema } from './schema';
import { getSiblingOperations } from './sibling-operations';
import { loadCachedGraphQLConfig } from './graphql-config';
import { getReachableTypes, getUsedFields } from './graphql-ast';

export function parse(code: string, options?: ParserOptions): Linter.ESLintParseResult['ast'] {
  return parseForESLint(code, options).ast;
}

export function parseForESLint(code: string, options: ParserOptions = {}): GraphQLESLintParseResult {
  const gqlConfig = loadCachedGraphQLConfig(options);
  const schema = getSchema(options, gqlConfig);
  const parserServices: ParserServices = {
    hasTypeInfo: schema !== null,
    schema,
    siblingOperations: getSiblingOperations(options, gqlConfig),
    reachableTypes: getReachableTypes,
    usedFields: getUsedFields,
  };

  try {
    const filePath = options.filePath || '';

    const graphqlAst = parseGraphQLSDL(filePath, code, {
      ...options.graphQLParserOptions,
      noLocation: false,
    });

    const { rootTree, comments } = convertToESTree(graphqlAst.document as ASTNode, schema ? new TypeInfo(schema) : null);
    const tokens = extractTokens(new Source(code, filePath));

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
