import { convertToESTree } from './estree-parser/converter';
import { GraphQLParseOptions, parseGraphQLSDL } from '@graphql-tools/utils';
import { buildSchema, GraphQLError, GraphQLSchema, Source, Lexer, TypeInfo } from 'graphql';
import { loadConfigSync, GraphQLProjectConfig } from 'graphql-config';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import { UrlLoader } from '@graphql-tools/url-loader';
import { Linter, AST } from 'eslint';
import { GraphQLESLintParseResult, ParserOptions } from './types';

const DEFAULT_CONFIG: ParserOptions = {
  schema: null,
  skipGraphQLConfig: false,
};

export function parse(code: string, options?: GraphQLParseOptions): Linter.ESLintParseResult['ast'] {
  return parseForESLint(code, options).ast;
}

function getLexer(source: Source): Lexer {
  // GraphQL v14
  const gqlLanguage = require('graphql/language');
  if (gqlLanguage && gqlLanguage.createLexer) {
    return gqlLanguage.createLexer(source, {});
  }

  // GraphQL v15
  const { Lexer: LexerCls } = require('graphql');
  if (LexerCls && typeof LexerCls === 'function') {
    return new LexerCls(source);
  }

  throw new Error(`Unsupported GraphQL version! Please make sure to use GraphQL v14 or newer!`);
}

export function extractTokens(source: string): AST.Token[] {
  const lexer = getLexer(new Source(source));
  const tokens: AST.Token[] = [];
  let token = lexer.advance();

  while (token && token.kind !== '<EOF>') {
    tokens.push({
      type: token.kind as any,
      loc: {
        start: {
          line: token.line,
          column: token.column,
        },
        end: {
          line: token.line,
          column: token.column,
        },
      },
      value: token.value,
      range: [token.start, token.end],
    });
    token = lexer.advance();
  }

  return tokens;
}

export function parseForESLint(code: string, options?: ParserOptions): GraphQLESLintParseResult {
  try {
    const config = {
      ...DEFAULT_CONFIG,
      ...(options || {}),
      ...(options?.schemaOptions || {}),
    };

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

    if (!schema && config.schema) {
      try {
        schema = loadSchemaSync(config.schema, {
          ...config,
          assumeValidSDL: true,
          loaders: [
            {
              loaderId: () => 'direct-string',
              canLoad: async () => false,
              load: async () => null,
              canLoadSync: pointer => typeof pointer === 'string' && pointer.includes('type '),
              loadSync: pointer => ({
                schema: buildSchema(pointer),
              }),
            },
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

    const graphqlAst = parseGraphQLSDL(config.filePath || '', code, {
      ...config,
      noLocation: false,
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
