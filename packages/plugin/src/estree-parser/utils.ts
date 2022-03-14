import {
  Location,
  TokenKind,
  GraphQLOutputType,
  GraphQLNamedType,
  isNonNullType,
  isListType,
  Token,
  Source,
  Lexer,
} from 'graphql';
import type { Comment } from 'estree';
import type { AST } from 'eslint';
import { valueFromASTUntyped } from 'graphql/utilities/valueFromASTUntyped';

export const valueFromNode = (...args: Parameters<typeof valueFromASTUntyped>): any => {
  return valueFromASTUntyped(...args);
};

export function getBaseType(type: GraphQLOutputType): GraphQLNamedType {
  if (isNonNullType(type) || isListType(type)) {
    return getBaseType(type.ofType);
  }
  return type;
}

// Hardcoded type because tests fails on graphql 15
type TokenKindValue =
  | '<SOF>'
  // | '<EOF>'
  | '!'
  | '$'
  | '&'
  | '('
  | ')'
  | '...'
  | ':'
  | '='
  | '@'
  | '['
  | ']'
  | '{'
  | '|'
  | '}'
  | 'Name'
  | 'Int'
  | 'Float'
  | 'String'
  | 'BlockString'
  | 'Comment';

export function convertToken<T extends 'Line' | 'Block' | TokenKindValue>(
  token: Token,
  type: T
): Omit<AST.Token, 'type'> & { type: T } {
  const { line, column, end, start, value } = token;
  return {
    type,
    value,
    /*
     * ESLint has 0-based column number
     * https://eslint.org/docs/developer-guide/working-with-rules#contextreport
     */
    loc: {
      start: {
        line,
        column: column - 1,
      },
      end: {
        line,
        column: column - 1 + (end - start),
      },
    },
    range: [start, end],
  };
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

  throw new Error('Unsupported GraphQL version! Please make sure to use GraphQL v14 or newer!');
}

export function extractTokens(filePath: string, code: string): AST.Token[] {
  const source = new Source(code, filePath);
  const lexer = getLexer(source);
  const tokens: AST.Token[] = [];
  let token = lexer.advance();

  while (token && token.kind !== TokenKind.EOF) {
    const result = convertToken(token, token.kind) as AST.Token;
    tokens.push(result);
    token = lexer.advance();
  }

  return tokens;
}

export function extractComments(loc: Location): Comment[] {
  if (!loc) {
    return [];
  }
  const comments: Comment[] = [];
  let token = loc.startToken;

  while (token !== null) {
    if (token.kind === TokenKind.COMMENT) {
      const comment = convertToken(
        token,
        // `eslint-disable` directive works only with `Block` type comment
        token.value.trimStart().startsWith('eslint') ? 'Block' : 'Line'
      );
      comments.push(comment);
    }
    token = token.next;
  }
  return comments;
}
