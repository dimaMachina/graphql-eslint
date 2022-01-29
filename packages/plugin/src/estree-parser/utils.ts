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
} from 'graphql';
import { Comment } from 'estree';
import { GraphQLESTreeNode } from './estree-ast';
import { convertToken } from '../utils';

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
