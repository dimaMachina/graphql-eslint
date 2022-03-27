import type {
  ASTNode,
  TypeInfo,
  TypeNode,
  DocumentNode,
  ExecutableDefinitionNode,
  NameNode,
  TypeDefinitionNode,
  FieldDefinitionNode,
  ObjectTypeExtensionNode,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  InterfaceTypeExtensionNode,
  SelectionSetNode,
  SelectionNode,
  DefinitionNode,
  TypeExtensionNode,
  DirectiveDefinitionNode,
  VariableNode,
  FieldNode,
  FragmentSpreadNode,
  EnumValueDefinitionNode,
  ArgumentNode,
  NamedTypeNode,
  EnumTypeDefinitionNode,
  EnumTypeExtensionNode,
  InputValueDefinitionNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  InlineFragmentNode,
  VariableDefinitionNode,
  ListTypeNode,
  NonNullTypeNode,
  OperationTypeDefinitionNode,
} from 'graphql';
import type { SourceLocation, Comment } from 'estree';
import type { AST } from 'eslint';

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
  | TypeDefinitionNode
  | TypeExtensionNode
  | ExecutableDefinitionNode
  | DirectiveDefinitionNode
  | FieldDefinitionNode
  | EnumValueDefinitionNode
  | FieldNode
  | FragmentSpreadNode
  | VariableNode
  | ArgumentNode
  | NamedTypeNode;

type NodeWithType =
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | OperationTypeDefinitionNode
  | NonNullTypeNode
  | ListTypeNode
  | VariableDefinitionNode;

type ParentNode<T> = T extends DocumentNode
  ? AST.Program
  : T extends DefinitionNode
  ? DocumentNode
  : T extends EnumValueDefinitionNode
  ? EnumTypeDefinitionNode | EnumTypeExtensionNode
  : T extends InputValueDefinitionNode
  ? InputObjectTypeDefinitionNode | InputObjectTypeExtensionNode | FieldDefinitionNode | DirectiveDefinitionNode
  : T extends FieldDefinitionNode
  ? ObjectTypeDefinitionNode | ObjectTypeExtensionNode | InterfaceTypeDefinitionNode | InterfaceTypeExtensionNode
  : T extends SelectionSetNode
  ? ExecutableDefinitionNode | FieldNode | InlineFragmentNode
  : T extends SelectionNode
  ? SelectionSetNode
  : T extends TypeNode
  ? NodeWithType
  : T extends NameNode
  ? NodeWithName
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
    parent: ParentNode<T>;
  };

export type GraphQLESTreeNode<T, W extends boolean = false> =
  // if value is ASTNode => convert to Node type
  T extends ASTNode
    ? {
        // Loop recursively over object values
        [K in keyof Node<T, W>]: Node<T, W>[K] extends ReadonlyArray<infer ArrayItem> // If readonly array => loop over array items
          ? GraphQLESTreeNode<ArrayItem, W>[]
          : GraphQLESTreeNode<Node<T, W>[K], W>;
      }
    : // If Program node => add `parent: null` field
    T extends AST.Program
    ? T & { parent: null }
    : // Return value as is
      T;
