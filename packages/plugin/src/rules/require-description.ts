import { ASTKindToNode, Kind, TokenKind } from 'graphql';
import { getRootTypeNames } from '@graphql-tools/utils';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule, ValueOf } from '../types.js';
import {
  getLocation,
  getNodeName,
  requireGraphQLSchemaFromContext,
  TYPES_KINDS,
} from '../utils.js';

export const RULE_ID = 'require-description';

const ALLOWED_KINDS = [
  ...TYPES_KINDS,
  Kind.DIRECTIVE_DEFINITION,
  Kind.FIELD_DEFINITION,
  Kind.INPUT_VALUE_DEFINITION,
  Kind.ENUM_VALUE_DEFINITION,
  Kind.OPERATION_DEFINITION,
] as const;

type AllowedKind = (typeof ALLOWED_KINDS)[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;
type SelectorNode = GraphQLESTreeNode<ValueOf<AllowedKindToNode>>;

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
        [...ALLOWED_KINDS].sort().map(kind => {
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
export type RuleOptions = [
  {
    [key in AllowedKind]?: boolean;
  } & {
    types?: boolean;
    rootField?: boolean;
  },
];

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    docs: {
      category: 'Schema',
      description: 'Enforce descriptions in type definitions and operations.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
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
          rootField: true,
        },
      ],
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      [RULE_ID]: 'Description is required for {{ nodeName }}',
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
          const { prev, line } = rawNode.loc!.startToken;
          if (prev?.kind === TokenKind.COMMENT) {
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
