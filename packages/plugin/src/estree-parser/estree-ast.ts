import { ASTNode, TypeInfo, TypeNode, ValueNode } from 'graphql';
import { BaseNode } from 'estree';

type SafeGraphQLType<T extends ASTNode | ValueNode> = Omit<
  T extends { readonly type: TypeNode } ? Omit<T, 'type'> & { readonly gqlType: TypeNode } : T,
  'loc'
>;

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

type SingleESTreeNode<T extends ASTNode | ValueNode, WithTypeInfo extends boolean> = SafeGraphQLType<T> &
  Pick<BaseNode, 'leadingComments' | 'loc' | 'range'> & {
    type: T['kind'];
    // eslint-disable-next-line @typescript-eslint/ban-types -- Record<string, never> don't work
    typeInfo: () => WithTypeInfo extends true ? TypeInformation : {};
    rawNode: () => T;
  };

export type GraphQLESTreeNode<T, WithTypeInfo extends boolean = false> = T extends ASTNode | ValueNode
  ? {
      [K in keyof SingleESTreeNode<T, WithTypeInfo>]: SingleESTreeNode<T, WithTypeInfo>[K] extends ReadonlyArray<
        infer Nested
      >
        ? GraphQLESTreeNode<Nested, WithTypeInfo>[]
        : SingleESTreeNode<T, WithTypeInfo>[K] extends ASTNode
        ? GraphQLESTreeNode<SingleESTreeNode<T, WithTypeInfo>[K], WithTypeInfo>
        : SingleESTreeNode<T, WithTypeInfo>[K];
    }
  : T;
