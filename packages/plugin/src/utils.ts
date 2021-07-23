import { statSync } from 'fs';
import { dirname } from 'path';
import { Source, Lexer, GraphQLSchema, Token, DocumentNode } from 'graphql';
import { GraphQLESLintRuleContext } from './types';
import { AST } from 'eslint';
import { SiblingOperations } from './sibling-operations';
import { UsedFields, ReachableTypes } from './graphql-ast';

export function requireSiblingsOperations(
  ruleName: string,
  context: GraphQLESLintRuleContext
): SiblingOperations | never {
  if (!context.parserServices) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.operations' to be set and loaded. See http://bit.ly/graphql-eslint-operations for more info`
    );
  }

  if (!context.parserServices.siblingOperations.available) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.operations' to be set and loaded. See http://bit.ly/graphql-eslint-operations for more info`
    );
  }

  return context.parserServices.siblingOperations;
}

export function requireGraphQLSchemaFromContext(
  ruleName: string,
  context: GraphQLESLintRuleContext
): GraphQLSchema | never {
  if (!context.parserServices) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.schema' to be set. See http://bit.ly/graphql-eslint-schema for more info`
    );
  }

  if (!context.parserServices.hasTypeInfo) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.schema' to be set and schema to be loaded. See http://bit.ly/graphql-eslint-schema for more info`
    );
  }

  return context.parserServices.schema;
}

export function requireReachableTypesFromContext(
  ruleName: string,
  context: GraphQLESLintRuleContext
): ReachableTypes | never {
  const schema = requireGraphQLSchemaFromContext(ruleName, context);
  return context.parserServices.reachableTypes(schema);
}

export function requireUsedFieldsFromContext(ruleName: string, context: GraphQLESLintRuleContext): UsedFields | never {
  const schema = requireGraphQLSchemaFromContext(ruleName, context);
  const siblings = requireSiblingsOperations(ruleName, context);
  return context.parserServices.usedFields(schema, siblings);
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

export function checkForEslint(token: Token, rawNode: DocumentNode): boolean {
  if (token.kind !== 'Comment') {
    return false;
  }
  const string = rawNode.loc?.source.body.substring(token.start + 1, token.start + 8);
  if (string.toLocaleLowerCase().includes('eslint')) {
    return true;
  }
  return false;
}

export const normalizePath = (path: string): string => (path || '').replace(/\\/g, '/');

/**
 * https://github.com/prettier/eslint-plugin-prettier/blob/76bd45ece6d56eb52f75db6b4a1efdd2efb56392/eslint-plugin-prettier.js#L71
 * Given a filepath, get the nearest path that is a regular file.
 * The filepath provided by eslint may be a virtual filepath rather than a file
 * on disk. This attempts to transform a virtual path into an on-disk path
 */
export const getOnDiskFilepath = (filepath: string): string => {
  try {
    if (statSync(filepath).isFile()) {
      return filepath;
    }
  } catch (err) {
    // https://github.com/eslint/eslint/issues/11989
    if (err.code === 'ENOTDIR') {
      return getOnDiskFilepath(dirname(filepath));
    }
  }

  return filepath;
};
