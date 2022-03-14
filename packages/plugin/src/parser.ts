import { parseGraphQLSDL } from '@graphql-tools/utils';
import { GraphQLError, Source } from 'graphql';
import debugFactory from 'debug';
import { convertToESTree, extractCommentsFromAst, extractTokens } from './estree-parser';
import { GraphQLESLintParseResult, ParserOptions, ParserServices } from './types';
import { getSchema } from './schema';
import { getSiblingOperations } from './sibling-operations';
import { loadGraphQLConfig } from './graphql-config';

const debug = debugFactory('graphql-eslint:parser');

debug('cwd %o', process.cwd());

export function parseForESLint(code: string, options: ParserOptions = {}): GraphQLESLintParseResult {
  const gqlConfig = loadGraphQLConfig(options);
  const schema = getSchema(options, gqlConfig);
  const parserServices: ParserServices = {
    schema,
    siblingOperations: getSiblingOperations(options, gqlConfig),
  };

  try {
    const filePath = options.filePath || '';

    const graphqlAst = parseGraphQLSDL(filePath, code, {
      ...options.graphQLParserOptions,
      noLocation: false,
    });

    const comments = extractCommentsFromAst(graphqlAst.document.loc);
    const tokens = extractTokens(new Source(code, filePath));
    const rootTree = convertToESTree(graphqlAst.document, schema);

    return {
      services: parserServices,
      ast: {
        comments,
        tokens,
        loc: rootTree.loc,
        range: rootTree.range as [number, number],
        type: 'Program',
        sourceType: 'script',
        body: [rootTree as any],
      },
    };
  } catch (e) {
    e.message = `[graphql-eslint] ${e.message}`;
    // In case of GraphQL parser error, we report it to ESLint as a parser error that matches the requirements
    // of ESLint. This will make sure to display it correctly in IDEs and lint results.
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
