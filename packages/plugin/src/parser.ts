import { parseGraphQLSDL } from '@graphql-tools/utils';
import { GraphQLError, GraphQLSchema } from 'graphql';
import debugFactory from 'debug';
import { convertToESTree, extractComments, extractTokens } from './estree-converter';
import { GraphQLESLintParseResult, ParserOptions } from './types';
import { getSchema } from './schema';
import { getDocuments } from './documents';
import { loadGraphQLConfig } from './graphql-config';
import { CWD, VIRTUAL_DOCUMENT_REGEX } from './utils';

const debug = debugFactory('graphql-eslint:parser');

debug('cwd %o', CWD);

export function parseForESLint(code: string, options: ParserOptions): GraphQLESLintParseResult {
  try {
    const { filePath } = options;
    // First parse code from file, in case of syntax error do not try load schema,
    // documents or even graphql-config instance
    const { document } = parseGraphQLSDL(filePath, code, {
      ...options.graphQLParserOptions,
      noLocation: false,
    });
    const gqlConfig = loadGraphQLConfig(options);
    const realFilepath = filePath.replace(VIRTUAL_DOCUMENT_REGEX, '');
    const project = gqlConfig.getProjectForFile(realFilepath);

    const schema = getSchema(project, options.schemaOptions);
    const rootTree = convertToESTree(document, schema instanceof GraphQLSchema ? schema : null);

    return {
      services: {
        schema,
        siblingOperations: getDocuments(project),
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
