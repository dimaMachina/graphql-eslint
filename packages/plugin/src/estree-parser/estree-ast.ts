import { ASTNode, Location, TypeInfo, TypeNode, ValueNode } from 'graphql';
import { BaseNode } from 'estree';

export type SafeGraphQLType<T extends ASTNode | ValueNode> = Omit<
  T extends { readonly type: TypeNode } ? Omit<T, 'type'> & { readonly gqlType: TypeNode } : T,
  'loc'
>;

export type SingleESTreeNode<T, WithTypeInfo extends boolean> = T extends ASTNode | ValueNode
  ? SafeGraphQLType<T> &
      Pick<BaseNode, 'leadingComments' | 'loc' | 'range'> & {
        type: T['kind'];
      } & (WithTypeInfo extends true
        ? {
            typeInfo?: () => {
              argument?: ReturnType<TypeInfo['getArgument']>;
              defaultValue?: ReturnType<TypeInfo['getDefaultValue']>;
              directive?: ReturnType<TypeInfo['getDirective']>;
              enumValue?: ReturnType<TypeInfo['getEnumValue']>;
              fieldDef?: ReturnType<TypeInfo['getFieldDef']>;
              inputType?: ReturnType<TypeInfo['getInputType']>;
              parentInputType?: ReturnType<TypeInfo['getParentInputType']>;
              parentType?: ReturnType<TypeInfo['getParentType']>;
              gqlType?: ReturnType<TypeInfo['getType']>;
            };
          }
        : {})
  : T;

export type GraphQLESTreeNode<T, WithTypeInfo extends boolean = false> = T extends ASTNode | ValueNode
  ? { rawNode: () => T } & {
      [K in keyof SingleESTreeNode<T, WithTypeInfo>]: SingleESTreeNode<T, WithTypeInfo>[K] extends ReadonlyArray<
        infer Nested
      >
        ? GraphQLESTreeNode<Nested, WithTypeInfo>[]
        : SingleESTreeNode<T, WithTypeInfo>[K] extends ASTNode
        ? GraphQLESTreeNode<SingleESTreeNode<T, WithTypeInfo>[K], WithTypeInfo>
        : SingleESTreeNode<T, WithTypeInfo>[K];
    }
  : T;
