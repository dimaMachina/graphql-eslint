import { ASTKindToNode, Kind, TokenKind } from 'graphql';
import { GraphQLESLintRule, ValueOf } from '../types';
import { getLocation, TYPES_KINDS } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';

const RULE_ID = 'require-description';

const ALLOWED_KINDS = [
  ...TYPES_KINDS,
  Kind.FIELD_DEFINITION,
  Kind.INPUT_VALUE_DEFINITION,
  Kind.ENUM_VALUE_DEFINITION,
  Kind.DIRECTIVE_DEFINITION,
  Kind.OPERATION_DEFINITION,
] as const;

type AllowedKind = typeof ALLOWED_KINDS[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

export type RequireDescriptionRuleConfig = {
  types?: boolean;
} & {
  [key in AllowedKind]?: boolean;
};

const rule: GraphQLESLintRule<[RequireDescriptionRuleConfig]> = {
  meta: {
    docs: {
      category: 'Schema',
      description: 'Enforce descriptions in type definitions and operations.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
      ],
      configOptions: [
        {
          types: true,
          [Kind.DIRECTIVE_DEFINITION]: true,
        },
      ],
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      [RULE_ID]: 'Description is required for nodes of type "{{ nodeType }}"',
    },
    schema: {
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
            description: `Includes:\n\n${TYPES_KINDS.map(kind => `- \`${kind}\``).join('\n')}`,
          },
          ...Object.fromEntries(
            [...ALLOWED_KINDS].sort().map(kind => {
              let description = `Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#${kind}).`;
              if (kind === Kind.OPERATION_DEFINITION) {
                description += '\n\n> You must use only comment syntax (`#`) and not description syntax (`"""` or `"`).';
              }
              return [kind, { type: 'boolean', description }];
            })
          ),
        },
      },
    },
  },
  create(context) {
    const { types, ...restOptions } = context.options[0] || {};

    const kinds: Set<string> = new Set(types ? TYPES_KINDS : []);
    for (const [kind, isEnabled] of Object.entries(restOptions)) {
      if (isEnabled) {
        kinds.add(kind);
      } else {
        kinds.delete(kind);
      }
    }

    const selector = [...kinds].join(',');

    return {
      [selector](node: GraphQLESTreeNode<ValueOf<AllowedKindToNode>>) {
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
            loc: isOperation ? getLocation(node.loc, node.operation) : getLocation(node.name.loc, node.name.value),
            messageId: RULE_ID,
            data: {
              nodeType: node.kind,
            },
          });
        }
      },
    };
  },
};

export default rule;
