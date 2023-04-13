import { Comment } from 'estree';
import {
  ASTVisitor,
  DefinitionNode,
  DocumentNode,
  GraphQLSchema,
  Kind,
  TypeInfo,
  visit,
  visitWithTypeInfo,
} from 'graphql';
import { GraphQLESTreeNode, TypeInformation } from './types.js';
import { convertLocation } from './utils.js';

export function convertToESTree<T extends DocumentNode>(node: T, schema?: GraphQLSchema | null) {
  const typeInfo = schema && new TypeInfo(schema);

  const visitor: ASTVisitor = {
    leave(node, key, parent) {
      const leadingComments: Comment[] =
        'description' in node && node.description
          ? [
              {
                type: node.description.block ? 'Block' : 'Line',
                value: node.description.value,
              },
            ]
          : [];

      const calculatedTypeInfo: Record<string, never> | TypeInformation = typeInfo
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
          return (parent as any)[key];
        }
        return node.kind === Kind.DOCUMENT
          ? ({
              ...node,
              definitions: node.definitions.map(definition =>
                (definition as unknown as GraphQLESTreeNode<DefinitionNode>).rawNode(),
              ),
            } as DocumentNode)
          : node;
      };

      const commonFields: Omit<GraphQLESTreeNode<typeof node>, 'parent'> = {
        ...node,
        type: node.kind,
        loc: convertLocation(node.loc!),
        range: [node.loc!.start, node.loc!.end],
        leadingComments,
        // Use function to prevent RangeError: Maximum call stack size exceeded
        typeInfo: () => calculatedTypeInfo as any, // Don't know if can fix error
        rawNode,
      };

      return 'type' in node
        ? {
            ...commonFields,
            gqlType: node.type,
          }
        : commonFields;
    },
  };

  return visit(
    node,
    typeInfo ? visitWithTypeInfo(typeInfo, visitor) : visitor,
  ) as GraphQLESTreeNode<T>;
}
