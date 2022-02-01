import {
  Kind,
  Location,
  ValueNode,
  StringValueNode,
  ASTNode,
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
import type { GraphQLESTreeNode } from './estree-ast';

export default function keyValMap<T, V>(
  list: ReadonlyArray<T>,
  keyFn: (item: T) => string,
  valFn: (item: T) => V
): Record<string, V> {
  return list.reduce((map, item) => {
    map[keyFn(item)] = valFn(item);
    return map;
  }, Object.create(null));
}

export function valueFromNode(valueNode: GraphQLESTreeNode<ValueNode>, variables?: Record<string, any>): any {
  switch (valueNode.type) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(node => valueFromNode(node, variables));
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        field => field.name.value,
        field => valueFromNode(field.value, variables)
      );
    case Kind.VARIABLE:
      return variables?.[valueNode.name.value];
  }
}

export function getBaseType(type: GraphQLOutputType): GraphQLNamedType {
  if (isNonNullType(type) || isListType(type)) {
    return getBaseType(type.ofType);
  }

  return type;
}

export function convertToken<T extends 'Line' | 'Block' | TokenKind>(
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

export function extractTokens(source: Source): AST.Token[] {
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

export function extractCommentsFromAst(loc: Location): Comment[] {
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

export function isNodeWithDescription<T extends ASTNode>(
  obj: T
): obj is T & { readonly description?: StringValueNode } {
  return (obj as any)?.description;
}

export function convertDescription<T extends ASTNode>(node: T): Comment[] {
  if (isNodeWithDescription(node)) {
    return [
      {
        type: node.description.block ? 'Block' : 'Line',
        value: node.description.value,
      },
    ];
  }

  return [];
}
