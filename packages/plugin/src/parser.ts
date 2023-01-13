import { parseGraphQLSDL } from '@graphql-tools/utils';
import debugFactory from 'debug';
import { buildSchema, GraphQLError, GraphQLSchema } from 'graphql';
import { convertToESTree, extractComments, extractTokens } from './estree-converter/index.js';
import { loadGraphQLConfig } from './graphql-config.js';
import { getSchema } from './schema.js';
import { getSiblings } from './siblings.js';
import { GraphQLESLintParseResult, ParserOptions } from './types.js';
import { CWD, VIRTUAL_DOCUMENT_REGEX } from './utils.js';

const debug = debugFactory('graphql-eslint:parser');

debug('cwd %o', CWD);

export function parseForESLint(code: string, options: ParserOptions): GraphQLESLintParseResult {
  try {
    const { filePath } = options;
    // TODO: remove in graphql-eslint v4
    options.documents ||= options.operations;
    // First parse code from file, in case of syntax error do not try load schema,
    // documents or even graphql-config instance
    const { document } = parseGraphQLSDL(filePath, code, {
      ...options.graphQLParserOptions,
      noLocation: false,
    });
    const gqlConfig = loadGraphQLConfig(options);
    const realFilepath = filePath.replace(VIRTUAL_DOCUMENT_REGEX, '');
    const project = gqlConfig.getProjectForFile(realFilepath);

    let schema: GraphQLSchema | null = null;

    try {
      schema = project
        ? getSchema(project, options.schemaOptions)
        : typeof options.schema === 'string'
        ? buildSchema(options.schema)
        : null;
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Error while loading schema: ${error.message}`;
      }
      throw error;
    }

    const rootTree = convertToESTree(document, schema);

    return {
      services: {
        schema,
        siblingOperations: getSiblings(project, options.documents),
      },
      ast: {
        comments: extractComments(document.loc),
        tokens: extractTokens(filePath, code),
        loc: rootTree.loc,
        range: rootTree.range as [number, number],
        type: 'Program',
        sourceType: 'script',
        body: [rootTree as any],
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `[graphql-eslint] ${error.message}`;
    }
    // In case of GraphQL parser error, we report it to ESLint as a parser error that matches the requirements
    // of ESLint. This will make sure to display it correctly in IDEs and lint results.
    if (error instanceof GraphQLError) {
      const eslintError = {
        index: error.positions![0],
        lineNumber: error.locations![0].line,
        column: error.locations![0].column - 1,
        message: error.message,
      };
      throw eslintError;
    }
    throw error;
  }
}
