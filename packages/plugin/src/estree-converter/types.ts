import { AST } from 'eslint';
import { Comment, SourceLocation } from 'estree';
import {
  ArgumentNode,
  ASTNode,
  DefinitionNode,
  DirectiveDefinitionNode,
  DirectiveNode,
  DocumentNode,
  EnumTypeDefinitionNode,
  EnumTypeExtensionNode,
  EnumValueDefinitionNode,
  ExecutableDefinitionNode,
  FieldDefinitionNode,
  FieldNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  InterfaceTypeExtensionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
  OperationTypeDefinitionNode,
  SelectionNode,
  SelectionSetNode,
  TypeDefinitionNode,
  TypeExtensionNode,
  TypeInfo,
  TypeNode,
  VariableDefinitionNode,
  VariableNode,
} from 'graphql';

type SafeGraphQLType<T extends ASTNode> = T extends { type: TypeNode }
  ? Omit<T, 'loc' | 'type'> & { gqlType: T['type'] }
  : Omit<T, 'loc'>;

type Writeable<T> = { -readonly [K in keyof T]: T[K] };

export type TypeInformation = {
  argument: ReturnType<TypeInfo['getArgument']>;
  defaultValue: ReturnType<TypeInfo['getDefaultValue']>;
  directive: ReturnType<TypeInfo['getDirective']>;
  enumValue: ReturnType<TypeInfo['getEnumValue']>;
  fieldDef: ReturnType<TypeInfo['getFieldDef']>;
  inputType: ReturnType<TypeInfo['getInputType']>;
  parentInputType: ReturnType<TypeInfo['getParentInputType']>;
  parentType: ReturnType<TypeInfo['getParentType']>;
  gqlType: ReturnType<TypeInfo['getType']>;
};

type NodeWithName =
  | ArgumentNode
  | DirectiveDefinitionNode
  | EnumValueDefinitionNode
  | ExecutableDefinitionNode
  | FieldDefinitionNode
  | FieldNode
  | FragmentSpreadNode
  | NamedTypeNode
  | TypeDefinitionNode
  | TypeExtensionNode
  | VariableNode;

type NodeWithType =
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | ListTypeNode
  | NonNullTypeNode
  | OperationTypeDefinitionNode
  | VariableDefinitionNode;

type ParentNode<T> = T extends DocumentNode
  ? AST.Program
  : T extends DefinitionNode
    ? DocumentNode
    : T extends EnumValueDefinitionNode
      ? EnumTypeDefinitionNode | EnumTypeExtensionNode
      : T extends InputValueDefinitionNode
        ?
            | DirectiveDefinitionNode
            | FieldDefinitionNode
            | InputObjectTypeDefinitionNode
            | InputObjectTypeExtensionNode
        : T extends FieldDefinitionNode
          ?
              | InterfaceTypeDefinitionNode
              | InterfaceTypeExtensionNode
              | ObjectTypeDefinitionNode
              | ObjectTypeExtensionNode
          : T extends SelectionSetNode
            ? ExecutableDefinitionNode | FieldNode | InlineFragmentNode
            : T extends SelectionNode
              ? SelectionSetNode
              : T extends TypeNode
                ? NodeWithType
                : T extends NameNode
                  ? NodeWithName
                  : T extends DirectiveNode
                    ? InputObjectTypeDefinitionNode | ObjectTypeDefinitionNode
                    : T extends VariableNode
                      ? VariableDefinitionNode
                      : unknown; // Explicitly show error to add new ternary with parent nodes

type Node<T extends ASTNode, WithTypeInfo extends boolean> =
  // Remove readonly for friendly editor popup
  Writeable<SafeGraphQLType<T>> & {
    type: T['kind'];
    loc: SourceLocation;
    range: AST.Range;
    leadingComments: Comment[];
    typeInfo: () => WithTypeInfo extends true ? TypeInformation : Record<string, never>;
    rawNode: () => T;
    parent: GraphQLESTreeNode<ParentNode<T>>;
  };

export type GraphQLESTreeNode<T, W extends boolean = false> =
  // if value is ASTNode => convert to Node type
  T extends ASTNode
    ? {
        // Loop recursively over object values
        [K in keyof Node<T, W>]: Node<T, W>[K] extends ReadonlyArray<infer ArrayItem> | undefined // If optional readonly array => loop over array items
          ? GraphQLESTreeNode<ArrayItem, W>[]
          : GraphQLESTreeNode<Node<T, W>[K], W>;
      }
    : // If Program node => add `parent: null` field
      T extends AST.Program
      ? T & { parent: null }
      : // Return value as is
        T;
