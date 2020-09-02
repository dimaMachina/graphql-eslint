import { BaseNode } from "estree";

export namespace GraphQLESTree {
  export type ASTNode =
    | NameNode
    | DocumentNode
    | OperationDefinitionNode
    | VariableDefinitionNode
    | VariableNode
    | SelectionSetNode
    | FieldNode
    | ArgumentNode
    | FragmentSpreadNode
    | InlineFragmentNode
    | FragmentDefinitionNode
    | IntValueNode
    | FloatValueNode
    | StringValueNode
    | BooleanValueNode
    | NullValueNode
    | EnumValueNode
    | ListValueNode
    | ObjectValueNode
    | ObjectFieldNode
    | DirectiveNode
    | NamedTypeNode
    | ListTypeNode
    | NonNullTypeNode
    | SchemaDefinitionNode
    | OperationTypeDefinitionNode
    | ScalarTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | FieldDefinitionNode
    | InputValueDefinitionNode
    | InterfaceTypeDefinitionNode
    | UnionTypeDefinitionNode
    | EnumTypeDefinitionNode
    | EnumValueDefinitionNode
    | InputObjectTypeDefinitionNode
    | DirectiveDefinitionNode
    | SchemaExtensionNode
    | ScalarTypeExtensionNode
    | ObjectTypeExtensionNode
    | InterfaceTypeExtensionNode
    | UnionTypeExtensionNode
    | EnumTypeExtensionNode
    | InputObjectTypeExtensionNode;

  /**
   * Utility type listing all nodes indexed by their kind.
   */
  export interface ASTKindToNode {
    Name: NameNode;
    Document: DocumentNode;
    OperationDefinition: OperationDefinitionNode;
    VariableDefinition: VariableDefinitionNode;
    Variable: VariableNode;
    SelectionSet: SelectionSetNode;
    Field: FieldNode;
    Argument: ArgumentNode;
    FragmentSpread: FragmentSpreadNode;
    InlineFragment: InlineFragmentNode;
    FragmentDefinition: FragmentDefinitionNode;
    IntValue: IntValueNode;
    FloatValue: FloatValueNode;
    StringValue: StringValueNode;
    BooleanValue: BooleanValueNode;
    NullValue: NullValueNode;
    EnumValue: EnumValueNode;
    ListValue: ListValueNode;
    ObjectValue: ObjectValueNode;
    ObjectField: ObjectFieldNode;
    Directive: DirectiveNode;
    NamedType: NamedTypeNode;
    ListType: ListTypeNode;
    NonNullType: NonNullTypeNode;
    SchemaDefinition: SchemaDefinitionNode;
    OperationTypeDefinition: OperationTypeDefinitionNode;
    ScalarTypeDefinition: ScalarTypeDefinitionNode;
    ObjectTypeDefinition: ObjectTypeDefinitionNode;
    FieldDefinition: FieldDefinitionNode;
    InputValueDefinition: InputValueDefinitionNode;
    InterfaceTypeDefinition: InterfaceTypeDefinitionNode;
    UnionTypeDefinition: UnionTypeDefinitionNode;
    EnumTypeDefinition: EnumTypeDefinitionNode;
    EnumValueDefinition: EnumValueDefinitionNode;
    InputObjectTypeDefinition: InputObjectTypeDefinitionNode;
    DirectiveDefinition: DirectiveDefinitionNode;
    SchemaExtension: SchemaExtensionNode;
    ScalarTypeExtension: ScalarTypeExtensionNode;
    ObjectTypeExtension: ObjectTypeExtensionNode;
    InterfaceTypeExtension: InterfaceTypeExtensionNode;
    UnionTypeExtension: UnionTypeExtensionNode;
    EnumTypeExtension: EnumTypeExtensionNode;
    InputObjectTypeExtension: InputObjectTypeExtensionNode;
  }

  // Name

  export interface NameNode extends BaseNode {
    readonly type: "Name";

    readonly value: string;
  }

  // Document

  export interface DocumentNode extends BaseNode {
    readonly type: "Document";
    readonly source: string;
    readonly definitions: ReadonlyArray<DefinitionNode>;
  }

  export type DefinitionNode =
    | ExecutableDefinitionNode
    | TypeSystemDefinitionNode
    | TypeSystemExtensionNode;

  export type ExecutableDefinitionNode =
    | OperationDefinitionNode
    | FragmentDefinitionNode;

  export interface OperationDefinitionNode extends BaseNode {
    readonly type: "OperationDefinition";

    readonly operation: OperationTypeNode;
    readonly name?: NameNode;
    readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet: SelectionSetNode;
  }

  export type OperationTypeNode = "query" | "mutation" | "subscription";

  export interface VariableDefinitionNode extends BaseNode {
    readonly type: "VariableDefinition";

    readonly variable: VariableNode;
    readonly ofType: TypeNode;
    readonly defaultValue?: ValueNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface VariableNode extends BaseNode {
    readonly type: "Variable";

    readonly name: NameNode;
  }

  export interface SelectionSetNode extends BaseNode {
    type: "SelectionSet";
    selections: ReadonlyArray<SelectionNode>;
  }

  export type SelectionNode =
    | FieldNode
    | FragmentSpreadNode
    | InlineFragmentNode;

  export interface FieldNode extends BaseNode {
    readonly type: "Field";

    readonly alias?: NameNode;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<ArgumentNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet?: SelectionSetNode;
  }

  export interface ArgumentNode extends BaseNode {
    readonly type: "Argument";
    readonly name: NameNode;
    readonly value: ValueNode;
  }

  // Fragments

  export interface FragmentSpreadNode extends BaseNode {
    readonly type: "FragmentSpread";

    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface InlineFragmentNode extends BaseNode {
    readonly type: "InlineFragment";

    readonly typeCondition?: NamedTypeNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet: SelectionSetNode;
  }

  export interface FragmentDefinitionNode extends BaseNode {
    readonly type: "FragmentDefinition";

    readonly name: NameNode;
    // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
    readonly typeCondition: NamedTypeNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet: SelectionSetNode;
  }

  // Values

  export type ValueNode =
    | VariableNode
    | IntValueNode
    | FloatValueNode
    | StringValueNode
    | BooleanValueNode
    | NullValueNode
    | EnumValueNode
    | ListValueNode
    | ObjectValueNode;

  export interface IntValueNode extends BaseNode {
    readonly type: "IntValue";

    readonly value: string;
  }

  export interface FloatValueNode extends BaseNode {
    readonly type: "FloatValue";

    readonly value: string;
  }

  export interface StringValueNode extends BaseNode {
    readonly type: "StringValue";

    readonly value: string;
    readonly block?: boolean;
  }

  export interface BooleanValueNode extends BaseNode {
    readonly type: "BooleanValue";

    readonly value: boolean;
  }

  export interface NullValueNode extends BaseNode {
    readonly type: "NullValue";
  }

  export interface EnumValueNode extends BaseNode {
    readonly type: "EnumValue";

    readonly value: string;
  }

  export interface ListValueNode extends BaseNode {
    readonly type: "ListValue";

    readonly values: ReadonlyArray<ValueNode>;
  }

  export interface ObjectValueNode extends BaseNode {
    readonly type: "ObjectValue";

    readonly fields: ReadonlyArray<ObjectFieldNode>;
  }

  export interface ObjectFieldNode extends BaseNode {
    readonly type: "ObjectField";

    readonly name: NameNode;
    readonly value: ValueNode;
  }

  // Directives

  export interface DirectiveNode extends BaseNode {
    readonly type: "Directive";

    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<ArgumentNode>;
  }

  // Type Reference

  export type TypeNode = NamedTypeNode | ListTypeNode | NonNullTypeNode;

  export interface NamedTypeNode extends BaseNode {
    readonly type: "NamedType";

    readonly name: NameNode;
  }

  export interface ListTypeNode extends BaseNode {
    readonly type: "ListType";

    readonly ofType: TypeNode;
  }

  export interface NonNullTypeNode extends BaseNode {
    readonly type: "NonNullType";

    readonly ofType: NamedTypeNode | ListTypeNode;
  }

  // Type System Definition

  export type TypeSystemDefinitionNode =
    | SchemaDefinitionNode
    | TypeDefinitionNode
    | DirectiveDefinitionNode;

  export interface SchemaDefinitionNode extends BaseNode {
    readonly type: "SchemaDefinition";

    readonly description?: StringValueNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly operationTypes: ReadonlyArray<OperationTypeDefinitionNode>;
  }

  export interface OperationTypeDefinitionNode extends BaseNode {
    readonly type: "OperationTypeDefinition";

    readonly operation: OperationTypeNode;
    readonly ofType: NamedTypeNode;
  }

  // Type Definition

  export type TypeDefinitionNode =
    | ScalarTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | InterfaceTypeDefinitionNode
    | UnionTypeDefinitionNode
    | EnumTypeDefinitionNode
    | InputObjectTypeDefinitionNode;

  export interface ScalarTypeDefinitionNode extends BaseNode {
    readonly type: "ScalarTypeDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface ObjectTypeDefinitionNode extends BaseNode {
    readonly type: "ObjectTypeDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  }

  export interface FieldDefinitionNode extends BaseNode {
    readonly type: "FieldDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
    readonly ofType: TypeNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface InputValueDefinitionNode extends BaseNode {
    readonly type: "InputValueDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly ofType: TypeNode;
    readonly defaultValue?: ValueNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface InterfaceTypeDefinitionNode extends BaseNode {
    readonly type: "InterfaceTypeDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  }

  export interface UnionTypeDefinitionNode extends BaseNode {
    readonly type: "UnionTypeDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly types?: ReadonlyArray<NamedTypeNode>;
  }

  export interface EnumTypeDefinitionNode extends BaseNode {
    readonly type: "EnumTypeDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
  }

  export interface EnumValueDefinitionNode extends BaseNode {
    readonly type: "EnumValueDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface InputObjectTypeDefinitionNode extends BaseNode {
    readonly type: "InputObjectTypeDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
  }

  // Directive Definitions

  export interface DirectiveDefinitionNode extends BaseNode {
    readonly type: "DirectiveDefinition";

    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
    readonly repeatable: boolean;
    readonly locations: ReadonlyArray<NameNode>;
  }

  // Type System Extensions

  export type TypeSystemExtensionNode = SchemaExtensionNode | TypeExtensionNode;

  export interface SchemaExtensionNode extends BaseNode {
    readonly type: "SchemaExtension";

    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly operationTypes?: ReadonlyArray<OperationTypeDefinitionNode>;
  }

  // Type Extensions

  export type TypeExtensionNode =
    | ScalarTypeExtensionNode
    | ObjectTypeExtensionNode
    | InterfaceTypeExtensionNode
    | UnionTypeExtensionNode
    | EnumTypeExtensionNode
    | InputObjectTypeExtensionNode;

  export interface ScalarTypeExtensionNode extends BaseNode {
    readonly type: "ScalarTypeExtension";

    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
  }

  export interface ObjectTypeExtensionNode extends BaseNode {
    readonly type: "ObjectTypeExtension";

    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  }

  export interface InterfaceTypeExtensionNode extends BaseNode {
    readonly type: "InterfaceTypeExtension";

    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  }

  export interface UnionTypeExtensionNode extends BaseNode {
    readonly type: "UnionTypeExtension";

    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly types?: ReadonlyArray<NamedTypeNode>;
  }

  export interface EnumTypeExtensionNode extends BaseNode {
    readonly type: "EnumTypeExtension";

    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
  }

  export interface InputObjectTypeExtensionNode extends BaseNode {
    readonly type: "InputObjectTypeExtension";

    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
  }
}
