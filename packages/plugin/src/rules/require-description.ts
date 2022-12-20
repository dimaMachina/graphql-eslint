import { ASTKindToNode, Kind, TokenKind } from 'graphql';
import type { GraphQLESLintRule, ValueOf } from '../types';
import { getLocation, requireGraphQLSchemaFromContext, TYPES_KINDS } from '../utils';
import type { GraphQLESTreeNode } from '../estree-converter';
import { getRootTypeNames } from '@graphql-tools/utils';

const RULE_ID = 'require-description';

const ALLOWED_KINDS = [
  ...TYPES_KINDS,
  Kind.DIRECTIVE_DEFINITION,
  Kind.FIELD_DEFINITION,
  Kind.INPUT_VALUE_DEFINITION,
  Kind.ENUM_VALUE_DEFINITION,
  Kind.OPERATION_DEFINITION,
] as const;

type AllowedKind = typeof ALLOWED_KINDS[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;
type SelectorNode = GraphQLESTreeNode<ValueOf<AllowedKindToNode>>;

function getNodeName(node: SelectorNode) {
  const DisplayNodeNameMap = {
    [Kind.OBJECT_TYPE_DEFINITION]: 'type',
    [Kind.INTERFACE_TYPE_DEFINITION]: 'interface',
    [Kind.ENUM_TYPE_DEFINITION]: 'enum',
    [Kind.SCALAR_TYPE_DEFINITION]: 'scalar',
    [Kind.INPUT_OBJECT_TYPE_DEFINITION]: 'input',
    [Kind.UNION_TYPE_DEFINITION]: 'union',
    [Kind.DIRECTIVE_DEFINITION]: 'directive',
  } as const;

  switch (node.kind) {
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.UNION_TYPE_DEFINITION:
      return `${DisplayNodeNameMap[node.kind]} ${node.name.value}`;
    case Kind.DIRECTIVE_DEFINITION:
      return `${DisplayNodeNameMap[node.kind]} @${node.name.value}`;
    case Kind.FIELD_DEFINITION:
    case Kind.INPUT_VALUE_DEFINITION:
    case Kind.ENUM_VALUE_DEFINITION:
      return `${node.parent.name.value}.${node.name.value}`;
    case Kind.OPERATION_DEFINITION:
      return node.name ? `${node.operation} ${node.name.value}` : node.operation;
  }
}

const schema = {
  type: 'array',
  minItems: 1,
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      types: {
        type: 'boolean',
        description: `Includes:\n${TYPES_KINDS.map(kind => `- \`${kind}\``).join('\n')}`,
      },
      rootField: {
        type: 'boolean',
        description: 'Definitions within `Query`, `Mutation`, and `Subscription` root types.',
      },
      ...Object.fromEntries(
        [...ALLOWED_KINDS].map(kind => {
          let description = `Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#${kind}).`;
          if (kind === Kind.OPERATION_DEFINITION) {
            description +=
              '\n> You must use only comment syntax `#` and not description syntax `"""` or `"`.';
          }
          return [kind, { type: 'boolean', description }];
        }),
      ),
    },
  },
} as const;

// TODO try import { FromSchema } from 'json-schema-to-ts';
export type Schema = [
  {
    types?: boolean;
    rootField?: boolean;
  } & {
    [key in AllowedKind]?: boolean;
  },
];

export const rule: GraphQLESLintRule<Schema> = {
  meta: {
    docs: {
      category: 'Schema',
      description: 'Enforce descriptions in type definitions and operations.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          usage: [{ types: true, FieldDefinition: true }],
          code: /* GraphQL */ `
            type someTypeName {
              name: String
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ types: true, FieldDefinition: true }],
          code: /* GraphQL */ `
            """
            Some type description
            """
            type someTypeName {
              """
              Name description
              """
              name: String
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ OperationDefinition: true }],
          code: /* GraphQL */ `
            # Create a new user
            mutation createUser {
              # ...
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ rootField: true }],
          code: /* GraphQL */ `
            type Mutation {
              "Create a new user"
              createUser: User
            }

            type User {
              name: String
            }
          `,
        },
      ],
      configOptions: [
        {
          types: true,
          [Kind.DIRECTIVE_DEFINITION]: true,
          // rootField: true TODO enable in graphql-eslint v4
        },
      ],
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      [RULE_ID]: 'Description is required for `{{ nodeName }}`.',
    },
    schema,
  },
  create(context) {
    const { types, rootField, ...restOptions } = context.options[0] || {};

    const kinds = new Set<string>(types ? TYPES_KINDS : []);
    for (const [kind, isEnabled] of Object.entries(restOptions)) {
      if (isEnabled) {
        kinds.add(kind);
      } else {
        kinds.delete(kind);
      }
    }

    if (rootField) {
      const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
      const rootTypeNames = getRootTypeNames(schema);
      kinds.add(
        `:matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=/^(${[
          ...rootTypeNames,
        ].join(',')})$/] > FieldDefinition`,
      );
    }

    const selector = [...kinds].join(',');

    return {
      [selector](node: SelectorNode) {
        let description = '';
        const isOperation = node.kind === Kind.OPERATION_DEFINITION;
        if (isOperation) {
          const rawNode = node.rawNode();
          const { prev, line } = rawNode.loc.startToken;
          if (prev.kind === TokenKind.COMMENT) {
            const value = prev.value.trim();
            const linesBefore = line - prev.line;
            if (!value.startsWith('eslint') && linesBefore === 1) {
              description = value;
            }
          }
        } else {
          description = node.description?.value.trim() || '';
        }

        if (description.length === 0) {
          context.report({
            loc: isOperation ? getLocation(node.loc.start, node.operation) : node.name.loc,
            messageId: RULE_ID,
            data: {
              nodeName: getNodeName(node),
            },
          });
        }
      },
    };
  },
};
