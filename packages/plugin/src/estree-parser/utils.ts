import {
  Kind,
  Location,
  ValueNode,
  StringValueNode,
  ASTNode,
  IntValueNode,
  FloatValueNode,
  BooleanValueNode,
  ListValueNode,
  ObjectValueNode,
  VariableNode,
  TokenKind,
  GraphQLOutputType,
  GraphQLNamedType,
  isNonNullType,
  isListType,
} from 'graphql';
import { SourceLocation, Comment } from 'estree';
import { GraphQLESTreeNode } from './estree-ast';

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
      return parseInt((valueNode as GraphQLESTreeNode<IntValueNode>).value, 10);
    case Kind.FLOAT:
      return parseFloat((valueNode as GraphQLESTreeNode<FloatValueNode>).value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return (valueNode as GraphQLESTreeNode<BooleanValueNode>).value;
    case Kind.LIST:
      return ((valueNode as GraphQLESTreeNode<ListValueNode>).values as any).map(node =>
        valueFromNode(node, variables)
      );
    case Kind.OBJECT:
      return keyValMap(
        (valueNode as GraphQLESTreeNode<ObjectValueNode>).fields,
        field => field.name.value,
        field => valueFromNode(field.value, variables)
      );
    case Kind.VARIABLE:
      return variables?.[(valueNode as GraphQLESTreeNode<VariableNode>).name.value];
  }
}

export function getBaseType(type: GraphQLOutputType): GraphQLNamedType {
  if (isNonNullType(type) || isListType(type)) {
    return getBaseType(type.ofType);
  }

  return type;
}

export function convertRange(gqlLocation: Location): [number, number] {
  return [gqlLocation.start, gqlLocation.end];
}

export function extractCommentsFromAst(node: ASTNode): Comment[] {
  const loc = node.loc;

  if (!loc) {
    return [];
  }

  const comments: Comment[] = [];
  let token = loc.startToken;

  while (token !== null) {
    if (token.kind === TokenKind.COMMENT) {
      const value = String(token.value);
      comments.push({
        type: 'Block',
        value: ' ' + value + ' ',
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
        range: [token.start, token.end],
      });
    }

    token = token.next;
  }

  return comments;
}

export function convertLocation(gqlLocation: Location): SourceLocation {
  return {
    start: {
      column: gqlLocation.startToken.column,
      line: gqlLocation.startToken.line,
    },
    end: {
      column: gqlLocation.endToken.column,
      line: gqlLocation.endToken.line,
    },
    source: gqlLocation.source.body,
  };
}

export function isNodeWithDescription<T extends ASTNode>(
  obj: T
): obj is T & { readonly description?: StringValueNode } {
  return obj && (obj as any).description;
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
