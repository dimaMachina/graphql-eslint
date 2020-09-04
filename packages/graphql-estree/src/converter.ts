import { extractCommentsFromAst, convertDescription, GraphQLESTreeNode, SafeGraphQLType, convertLocation, convertRange } from "@graphql-eslint/types";
import {
  ASTNode,
  TypeNode,
  TypeInfo,
  visit,
  visitWithTypeInfo,
} from "graphql";
import { Comment } from "estree";

export function convertToESTree<T extends ASTNode>(
  node: T,
  typeInfo?: TypeInfo
): { rootTree: GraphQLESTreeNode<T>, comments: Comment[] } {
  const comments: Comment[] = extractCommentsFromAst(node);
  console.log(comments);
  const visitor = { leave: convertNode(typeInfo) };
  
  return {
    rootTree: visit(node, typeInfo ? visitWithTypeInfo(typeInfo, visitor) : visitor),
    comments,
  };
}

function hasTypeField<T extends ASTNode>(
  obj: any
): obj is T & { readonly type: TypeNode } {
  return obj && !!(obj as any).type;
}

const convertNode = (typeInfo?: TypeInfo) => <T extends ASTNode>(
  node: T
): GraphQLESTreeNode<T> => {
  const commonFields = {
    typeInfo: typeInfo
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
      : {},
    leadingComments: convertDescription(node),
    trailingComments: [],
    loc: convertLocation(node.loc),
    range: convertRange(node.loc),
  };

  if (hasTypeField<T>(node)) {
    const { type: gqlType, loc: gqlLocation, ...rest } = node;
    const typeFieldSafe: SafeGraphQLType<T> = {
      ...rest,
      gqlType,
    } as SafeGraphQLType<T & { readonly type: TypeNode }>;
    const estreeNode: GraphQLESTreeNode<T> = {
      ...typeFieldSafe,
      ...commonFields,
      type: node.kind,
      rawNode: node,
      gqlLocation,
    } as any as GraphQLESTreeNode<T>;

    return estreeNode;
  } else {
    const { loc: gqlLocation, ...rest } = node;
    const typeFieldSafe: SafeGraphQLType<T> = rest as SafeGraphQLType<T & { readonly type: TypeNode }>;
    const estreeNode: GraphQLESTreeNode<T> = {
      ...typeFieldSafe,
      ...commonFields,
      type: node.kind,
      rawNode: node,
      gqlLocation,
    } as any as GraphQLESTreeNode<T>;

    return estreeNode;
  }
};
