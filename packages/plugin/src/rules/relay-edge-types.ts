import {
  ASTVisitor,
  GraphQLSchema,
  isObjectType,
  isScalarType,
  Kind,
  NameNode,
  ObjectTypeDefinitionNode,
  TypeNode,
  visit,
} from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { getDocumentNodeFromSchema } from '@graphql-tools/utils';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule, GraphQLESLintRuleListener } from '../types.js';
import { getTypeName, requireGraphQLSchemaFromContext } from '../utils.js';

const RULE_ID = 'relay-edge-types';
const MESSAGE_MUST_BE_OBJECT_TYPE = 'MESSAGE_MUST_BE_OBJECT_TYPE';
const MESSAGE_MISSING_EDGE_SUFFIX = 'MESSAGE_MISSING_EDGE_SUFFIX';
const MESSAGE_LIST_TYPE_ONLY_EDGE_TYPE = 'MESSAGE_LIST_TYPE_ONLY_EDGE_TYPE';
const MESSAGE_SHOULD_IMPLEMENTS_NODE = 'MESSAGE_SHOULD_IMPLEMENTS_NODE';

type EdgeTypes = Set<string>;
let edgeTypesCache: EdgeTypes;

function getEdgeTypes(schema: GraphQLSchema): EdgeTypes {
  // We don't want cache edgeTypes on test environment
  // Otherwise edgeTypes will be same for all tests
  if (process.env.NODE_ENV !== 'test' && edgeTypesCache) {
    return edgeTypesCache;
  }
  const edgeTypes: EdgeTypes = new Set();
  const visitor: ASTVisitor = {
    ObjectTypeDefinition(node): void {
      const typeName = node.name.value;
      const hasConnectionSuffix = typeName.endsWith('Connection');
      if (!hasConnectionSuffix) {
        return;
      }
      const edges = node.fields?.find(field => field.name.value === 'edges');
      if (edges) {
        const edgesTypeName = getTypeName(edges);
        const edgesType = schema.getType(edgesTypeName);
        if (isObjectType(edgesType)) {
          edgeTypes.add(edgesTypeName);
        }
      }
    },
  };
  const astNode = getDocumentNodeFromSchema(schema); // Transforms the schema into ASTNode
  visit(astNode, visitor);

  edgeTypesCache = edgeTypes;
  return edgeTypesCache;
}

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      withEdgeSuffix: {
        type: 'boolean',
        default: true,
        description: 'Edge type name must end in "Edge".',
      },
      shouldImplementNode: {
        type: 'boolean',
        default: true,
        description: "Edge type's field `node` must implement `Node` interface.",
      },
      listTypeCanWrapOnlyEdgeType: {
        type: 'boolean',
        default: true,
        description: 'A list type should only wrap an edge type.',
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions, true> = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Set of rules to follow Relay specification for Edge types.',
        '',
        "- A type that is returned in list form by a connection type's `edges` field is considered by this spec to be an Edge type",
        '- Edge type must be an Object type',
        '- Edge type must contain a field `node` that return either Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types. Notably, this field cannot return a list',
        '- Edge type must contain a field `cursor` that return either String, Scalar, or a non-null wrapper around one of those types',
        '- Edge type name must end in "Edge" _(optional)_',
        "- Edge type's field `node` must implement `Node` interface _(optional)_",
        '- A list type should only wrap an edge type _(optional)_',
      ].join('\n'),
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      isDisabledForAllConfig: true,
      requiresSchema: true,
      examples: [
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type UserConnection {
              edges: [UserEdge]
              pageInfo: PageInfo!
            }
          `,
        },
      ],
    },
    messages: {
      [MESSAGE_MUST_BE_OBJECT_TYPE]: 'Edge type must be an Object type.',
      [MESSAGE_MISSING_EDGE_SUFFIX]: 'Edge type must have "Edge" suffix.',
      [MESSAGE_LIST_TYPE_ONLY_EDGE_TYPE]: 'A list type should only wrap an edge type.',
      [MESSAGE_SHOULD_IMPLEMENTS_NODE]: "Edge type's field `node` must implement `Node` interface.",
    },
    schema,
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const edgeTypes = getEdgeTypes(schema);
    const options: RuleOptions[0] = {
      withEdgeSuffix: true,
      shouldImplementNode: true,
      listTypeCanWrapOnlyEdgeType: true,
      ...context.options[0],
    };

    const isNamedOrNonNullNamed = (node: GraphQLESTreeNode<TypeNode>): boolean =>
      node.kind === Kind.NAMED_TYPE ||
      (node.kind === Kind.NON_NULL_TYPE && node.gqlType.kind === Kind.NAMED_TYPE);

    const checkNodeField = (node: GraphQLESTreeNode<ObjectTypeDefinitionNode>): void => {
      const nodeField = node.fields?.find(field => field.name.value === 'node');
      const message =
        'return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types.';
      if (!nodeField) {
        context.report({
          node: node.name,
          message: `Edge type must contain a field \`node\` that ${message}`,
        });
      } else if (!isNamedOrNonNullNamed(nodeField.gqlType)) {
        context.report({ node: nodeField.name, message: `Field \`node\` must ${message}` });
      } else if (options.shouldImplementNode) {
        const nodeReturnTypeName = getTypeName(nodeField.gqlType.rawNode());
        const type = schema.getType(nodeReturnTypeName);
        if (!isObjectType(type)) {
          return;
        }
        const implementsNode = type.astNode!.interfaces?.some(n => n.name.value === 'Node');
        if (!implementsNode) {
          context.report({ node: node.name, messageId: MESSAGE_SHOULD_IMPLEMENTS_NODE });
        }
      }
    };

    const checkCursorField = (node: GraphQLESTreeNode<ObjectTypeDefinitionNode>): void => {
      const cursorField = node.fields?.find(field => field.name.value === 'cursor');
      const message =
        'return either a String, Scalar, or a non-null wrapper wrapper around one of those types.';
      if (!cursorField) {
        context.report({
          node: node.name,
          message: `Edge type must contain a field \`cursor\` that ${message}`,
        });
        return;
      }
      const typeName = getTypeName(cursorField.rawNode());
      if (
        !isNamedOrNonNullNamed(cursorField.gqlType) ||
        (typeName !== 'String' && !isScalarType(schema.getType(typeName)))
      ) {
        context.report({ node: cursorField.name, message: `Field \`cursor\` must ${message}` });
      }
    };

    const listeners: GraphQLESLintRuleListener<true> = {
      ':matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=/Connection$/] > FieldDefinition[name.value=edges] > .gqlType Name'(
        node: GraphQLESTreeNode<NameNode>,
      ) {
        const type = schema.getType(node.value);
        if (!isObjectType(type)) {
          context.report({ node, messageId: MESSAGE_MUST_BE_OBJECT_TYPE });
        }
      },
      ':matches(ObjectTypeDefinition, ObjectTypeExtension)'(
        node: GraphQLESTreeNode<ObjectTypeDefinitionNode>,
      ) {
        const typeName = node.name.value;
        if (edgeTypes.has(typeName)) {
          checkNodeField(node);
          checkCursorField(node);
          if (options.withEdgeSuffix && !typeName.endsWith('Edge')) {
            context.report({ node: node.name, messageId: MESSAGE_MISSING_EDGE_SUFFIX });
          }
        }
      },
    };

    if (options.listTypeCanWrapOnlyEdgeType) {
      listeners['FieldDefinition > .gqlType'] = (node: GraphQLESTreeNode<TypeNode>) => {
        if (
          node.kind === Kind.LIST_TYPE ||
          (node.kind === Kind.NON_NULL_TYPE && node.gqlType.kind === Kind.LIST_TYPE)
        ) {
          const typeName = getTypeName(node.rawNode());
          if (!edgeTypes.has(typeName)) {
            context.report({ node, messageId: MESSAGE_LIST_TYPE_ONLY_EDGE_TYPE });
          }
        }
      };
    }

    return listeners;
  },
};
