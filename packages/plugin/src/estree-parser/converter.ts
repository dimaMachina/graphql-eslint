import {
  ASTNode,
  TypeNode,
  TypeInfo,
  visit,
  visitWithTypeInfo,
  Kind,
  DocumentNode,
  ASTVisitor,
  Location,
} from 'graphql';
import { SourceLocation, Comment } from 'estree';
import { extractCommentsFromAst } from './utils';
import { GraphQLESTreeNode, TypeInformation } from './estree-ast';

export function convertToESTree<T extends ASTNode>(node: T, typeInfo?: TypeInfo) {
  const visitor: ASTVisitor = { leave: convertNode(typeInfo) };
  return {
    rootTree: visit(node, typeInfo ? visitWithTypeInfo(typeInfo, visitor) : visitor) as GraphQLESTreeNode<T>,
    comments: extractCommentsFromAst(node.loc),
  };
}

function hasTypeField<T extends ASTNode>(node: T): node is T & { readonly type: TypeNode } {
  return 'type' in node && Boolean(node.type);
}

function convertLocation(location: Location): SourceLocation {
  const { startToken, endToken, source, start, end } = location;
  /*
   * ESLint has 0-based column number
   * https://eslint.org/docs/developer-guide/working-with-rules#contextreport
   */
  const loc = {
    start: {
      /*
       * Kind.Document has startToken: { line: 0, column: 0 }, we set line as 1 and column as 0
       */
      line: startToken.line === 0 ? 1 : startToken.line,
      column: startToken.column === 0 ? 0 : startToken.column - 1,
    },
    end: {
      line: endToken.line,
      column: endToken.column - 1,
    },
    source: source.body,
  };
  if (loc.start.column === loc.end.column) {
    loc.end.column += end - start;
  }
  return loc;
}

const convertNode =
  (typeInfo?: TypeInfo) =>
  <T extends ASTNode>(node: T, key: string | number, parent: any): GraphQLESTreeNode<T> => {
    const leadingComments: Comment[] =
      'description' in node && node.description
        ? [
            {
              type: node.description.block ? 'Block' : 'Line',
              value: node.description.value,
            },
          ]
        : [];

    const calculatedTypeInfo: TypeInformation | Record<string, never> = typeInfo
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
        return parent[key];
      }
      return node.kind === Kind.DOCUMENT
        ? <DocumentNode>{
            kind: node.kind,
            loc: node.loc,
            definitions: node.definitions.map(d => (d as any).rawNode()),
          }
        : node;
    };

    const commonFields = {
      ...node,
      type: node.kind,
      loc: convertLocation(node.loc),
      range: [node.loc.start, node.loc.end],
      leadingComments,
      // Use function to prevent RangeError: Maximum call stack size exceeded
      typeInfo: () => calculatedTypeInfo,
      rawNode,
    };

    return hasTypeField(node)
      ? ({
          ...commonFields,
          gqlType: node.type,
        } as any as GraphQLESTreeNode<T, true>)
      : (commonFields as any as GraphQLESTreeNode<T>);
  };
