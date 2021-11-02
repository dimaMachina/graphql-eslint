import { convertDescription, convertLocation, convertRange, extractCommentsFromAst } from './utils';
import { GraphQLESTreeNode, SafeGraphQLType } from './estree-ast';
import { ASTNode, TypeNode, TypeInfo, visit, visitWithTypeInfo, Location, Kind, DocumentNode, ASTVisitor } from 'graphql';

export function convertToESTree<T extends ASTNode>(
  node: T,
  typeInfo?: TypeInfo
) {
  const visitor: ASTVisitor = { leave: convertNode(typeInfo) };
  return {
    rootTree: visit(node, typeInfo ? visitWithTypeInfo(typeInfo, visitor) : visitor) as GraphQLESTreeNode<T>,
    comments: extractCommentsFromAst(node.loc),
  };
}

function hasTypeField<T extends ASTNode>(obj: any): obj is T & { readonly type: TypeNode } {
  return obj && !!(obj as any).type;
}

/**
 * Strips tokens information from `location` object - this is needed since it's created as linked list in GraphQL-JS,
 * causing eslint to fail on circular JSON
 * @param location
 */
function stripTokens(location: Location): Pick<Location, 'start' | 'end'> {
  return {
    end: location.end,
    start: location.start,
  };
}

const convertNode = (typeInfo?: TypeInfo) => <T extends ASTNode>(
  node: T,
  key: string | number,
  parent: any
): GraphQLESTreeNode<T> => {
  const calculatedTypeInfo = typeInfo
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

  const commonFields = {
    typeInfo: () => calculatedTypeInfo,
    leadingComments: convertDescription(node),
    loc: convertLocation(node.loc),
    range: convertRange(node.loc),
  };

  if (hasTypeField<T>(node)) {
    const { type: gqlType, loc: gqlLocation, ...rest } = node;
    const typeFieldSafe: SafeGraphQLType<T> = {
      ...rest,
      gqlType,
    } as SafeGraphQLType<T & { readonly type: TypeNode }>;
    const estreeNode: GraphQLESTreeNode<T> = ({
      ...typeFieldSafe,
      ...commonFields,
      type: node.kind,
      rawNode: () => {
        if (!parent || key === undefined) {
          if (node && (node as any).definitions) {
            return <DocumentNode>{
              loc: gqlLocation,
              kind: Kind.DOCUMENT,
              definitions: (node as any).definitions.map(d => d.rawNode()),
            };
          }

          return node;
        }

        return parent[key];
      },
      gqlLocation: stripTokens(gqlLocation),
    } as any) as GraphQLESTreeNode<T>;

    return estreeNode;
  } else {
    const { loc: gqlLocation, ...rest } = node;
    const typeFieldSafe: SafeGraphQLType<T> = rest as SafeGraphQLType<T & { readonly type: TypeNode }>;
    const estreeNode: GraphQLESTreeNode<T> = ({
      ...typeFieldSafe,
      ...commonFields,
      type: node.kind,
      rawNode: () => {
        if (!parent || key === undefined) {
          if (node && (node as any).definitions) {
            return <DocumentNode>{
              loc: gqlLocation,
              kind: Kind.DOCUMENT,
              definitions: (node as any).definitions.map(d => d.rawNode()),
            };
          }

          return node;
        }

        return parent[key];
      },
      gqlLocation: stripTokens(gqlLocation),
    } as any) as GraphQLESTreeNode<T>;

    return estreeNode;
  }
};
