import { AST } from 'eslint';
import { Comment, SourceLocation } from 'estree';
import {
  GraphQLNamedType,
  GraphQLOutputType,
  isListType,
  isNonNullType,
  Lexer,
  Location,
  Source,
  Token,
  TokenKind,
} from 'graphql';
import { valueFromASTUntyped } from 'graphql/utilities/valueFromASTUntyped.js';

export const valueFromNode = (...args: Parameters<typeof valueFromASTUntyped>): any => {
  return valueFromASTUntyped(...args);
};

export function getBaseType(type: GraphQLOutputType): GraphQLNamedType {
  if (isNonNullType(type) || isListType(type)) {
    return getBaseType(type.ofType);
  }
  return type;
}

export function convertToken<T extends TokenKind | 'Block' | 'Line'>(
  token: Token,
  type: T,
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

export function extractTokens(filePath: string, code: string): AST.Token[] {
  const source = new Source(code, filePath);
  const lexer = new Lexer(source);
  const tokens: AST.Token[] = [];
  let token = lexer.advance();

  while (token && token.kind !== TokenKind.EOF) {
    const result = convertToken(token, token.kind) as AST.Token;
    tokens.push(result);
    token = lexer.advance();
  }

  return tokens;
}

export function extractComments(loc?: Location): Comment[] {
  if (!loc) {
    return [];
  }
  const comments: Comment[] = [];
  let token: Token | null = loc.startToken;

  while (token) {
    if (token.kind === TokenKind.COMMENT) {
      const comment = convertToken(
        token,
        // `eslint-disable` directive works only with `Block` type comment
        token.value.trimStart().startsWith('eslint') ? 'Block' : 'Line',
      );
      comments.push(comment);
    }
    token = token.next;
  }
  return comments;
}

export function convertLocation(location: Location): SourceLocation {
  const { startToken, endToken, source, start, end } = location;
  /*
   * ESLint has 0-based column number
   * https://eslint.org/docs/developer-guide/working-with-rules#contextreport
   */
  const loc = {
    start: {
      /*
       * Kind.Document has startToken: { line: 0, column: 0 }, we set line as 1 and column as 0
       */
      line: startToken.line === 0 ? 1 : startToken.line,
      column: startToken.column === 0 ? 0 : startToken.column - 1,
    },
    end: {
      line: endToken.line,
      column: endToken.column - 1,
    },
    source: source.body,
  };
  if (loc.start.column === loc.end.column) {
    loc.end.column += end - start;
  }
  return loc;
}
