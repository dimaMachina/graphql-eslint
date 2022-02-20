import {
  ASTNode,
  TypeNode,
  TypeInfo,
  visit,
  visitWithTypeInfo,
  Kind,
  DocumentNode,
  ASTVisitor,
} from 'graphql';
import type { Comment } from 'estree';
import { extractCommentsFromAst, convertLocation } from './utils';
import type { GraphQLESTreeNode, TypeInformation } from './estree-ast';

export function convertToESTree<T extends ASTNode>(node: T, typeInfo?: TypeInfo) {
  const visitor: ASTVisitor = { leave: convertNode(typeInfo) };
  return {
    rootTree: visit(node, typeInfo ? visitWithTypeInfo(typeInfo, visitor) : visitor) as GraphQLESTreeNode<T>,
    comments: extractCommentsFromAst(node.loc),
  };
}

function hasTypeField<T extends ASTNode>(node: T): node is T & { readonly type: TypeNode } {
  return 'type' in node && Boolean(node.type);
}

const convertNode =
  (typeInfo?: TypeInfo) =>
  <T extends ASTNode>(node: T, key: string | number, parent: any): GraphQLESTreeNode<T> => {
    const leadingComments: Comment[] =
      'description' in node && node.description
        ? [
            {
              type: node.description.block ? 'Block' : 'Line',
              value: node.description.value,
            },
          ]
        : [];

    const calculatedTypeInfo: TypeInformation | Record<string, never> = typeInfo
      ? {
          argument: typeInfo.getArgument(),
          defaultValue: typeInfo.getDefaultValue(),
          directive: typeInfo.getDirective(),
          enumValue: typeInfo.getEnumValue(),
          fieldDef: typeInfo.getFieldDef(),
          inputType: typeInfo.getInputType(),
          parentInputType: typeInfo.getParentInputType(),
          parentType: typeInfo.getParentType(),
          gqlType: typeInfo.getType(),
        }
      : {};

    const rawNode = () => {
      if (parent && key !== undefined) {
        return parent[key];
      }
      return node.kind === Kind.DOCUMENT
        ? <DocumentNode>{
            kind: node.kind,
            loc: node.loc,
            definitions: node.definitions.map(d => (d as any).rawNode()),
          }
        : node;
    };

    const commonFields = {
      ...node,
      type: node.kind,
      loc: convertLocation(node.loc),
      range: [node.loc.start, node.loc.end],
      leadingComments,
      // Use function to prevent RangeError: Maximum call stack size exceeded
      typeInfo: () => calculatedTypeInfo,
      rawNode,
    };

    return hasTypeField(node)
      ? ({
          ...commonFields,
          gqlType: node.type,
        } as any as GraphQLESTreeNode<T, true>)
      : (commonFields as any as GraphQLESTreeNode<T>);
  };
