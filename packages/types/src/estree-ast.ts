import { ASTNode, Location, TypeNode } from "graphql";
import { BaseNode } from "estree";

export type SafeGraphQLType<T extends ASTNode> = Omit<
  T extends { readonly type: TypeNode }
    ? Omit<T, "type"> & { readonly gqlType: TypeNode }
    : T,
  "loc"
>;

export type SingleESTreeNode<T extends any> = T extends ASTNode ? SafeGraphQLType<T> &
  Pick<BaseNode, "leadingComments" | "trailingComments" | "loc" | "range"> & {
    type: T["kind"];
    gqlLocation: Location;
  } : T;

export type GraphQLESTreeNode<T extends any> = {rawNode: T; } & {
  [K in keyof SingleESTreeNode<T>]: SingleESTreeNode<T>[K] extends ASTNode ? GraphQLESTreeNode<SingleESTreeNode<T>[K]> : SingleESTreeNode<T>[K];
};
