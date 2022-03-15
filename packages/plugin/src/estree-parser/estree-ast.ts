import type { ASTNode, TypeInfo, TypeNode } from 'graphql';
import type { SourceLocation, Comment } from 'estree';
import type { AST } from 'eslint';

type SafeGraphQLType<T extends ASTNode> = T extends { type: TypeNode }
  ? Omit<T, 'loc' | 'type'> & { gqlType: TypeNode }
  : Omit<T, 'loc'>;

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

type Node<T extends ASTNode, WithTypeInfo extends boolean> = SafeGraphQLType<T> & {
  type: T['kind'];
  loc: SourceLocation;
  range: AST.Range;
  leadingComments: Comment[];
  typeInfo: () => WithTypeInfo extends true ? TypeInformation : Record<string, never>;
  rawNode: () => T;
};

export type GraphQLESTreeNode<T, W extends boolean = false> = T extends ASTNode
  ? {
      [K in keyof Node<T, W>]: Node<T, W>[K] extends ReadonlyArray<infer Nested>
        ? GraphQLESTreeNode<Nested, W>[]
        : Node<T, W>[K] extends ASTNode
        ? GraphQLESTreeNode<Node<T, W>[K], W>
        : Node<T, W>[K];
    }
  : T;
