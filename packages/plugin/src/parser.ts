import { parseGraphQLSDL } from '@graphql-tools/utils';
import { GraphQLError, GraphQLSchema } from 'graphql';
import debugFactory from 'debug';
import { convertToESTree, extractComments, extractTokens } from './estree-converter';
import { GraphQLESLintParseResult, ParserOptions } from './types';
import { getSchema } from './schema';
import { getSiblingOperations } from './sibling-operations';
import { loadGraphQLConfig } from './graphql-config';
import { getOnDiskFilepath } from './utils';

const debug = debugFactory('graphql-eslint:parser');

debug('cwd %o', process.cwd());

export function parseForESLint(code: string, options: ParserOptions = {}): GraphQLESLintParseResult {
  try {
    const filePath = options.filePath || '';
    const realFilepath = filePath && getOnDiskFilepath(filePath);

    const gqlConfig = loadGraphQLConfig(options);
    const projectForFile = realFilepath ? gqlConfig.getProjectForFile(realFilepath) : gqlConfig.getDefault();

    const schema = getSchema(projectForFile, options);
    const siblingOperations = getSiblingOperations(projectForFile, realFilepath);

    const { document } = parseGraphQLSDL(filePath, code, {
      ...options.graphQLParserOptions,
      noLocation: false,
    });

    const comments = extractComments(document.loc);
    const tokens = extractTokens(filePath, code);
    const rootTree = convertToESTree(document, schema instanceof GraphQLSchema ? schema : null);

    return {
      services: {
        schema,
        siblingOperations,
      },
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
  } catch (error) {
    error.message = `[graphql-eslint] ${error.message}`;
    // In case of GraphQL parser error, we report it to ESLint as a parser error that matches the requirements
    // of ESLint. This will make sure to display it correctly in IDEs and lint results.
    if (error instanceof GraphQLError) {
      const eslintError = {
        index: error.positions[0],
        lineNumber: error.locations[0].line,
        column: error.locations[0].column - 1,
        message: error.message,
      };
      throw eslintError;
    }
    throw error;
  }
}
