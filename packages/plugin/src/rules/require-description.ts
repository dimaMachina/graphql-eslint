import { ASTKindToNode, Kind } from 'graphql';
import { GraphQLESLintRule, ValueOf } from '../types';
import { TYPES_KINDS, getLocation } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';

const REQUIRE_DESCRIPTION_ERROR = 'REQUIRE_DESCRIPTION_ERROR';

const ALLOWED_KINDS = [
  ...TYPES_KINDS,
  Kind.FIELD_DEFINITION,
  Kind.INPUT_VALUE_DEFINITION,
  Kind.ENUM_VALUE_DEFINITION,
  Kind.DIRECTIVE_DEFINITION,
] as const;

type AllowedKind = typeof ALLOWED_KINDS[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

type RequireDescriptionRuleConfig = {
  types?: boolean;
} & {
  [key in AllowedKind]?: boolean;
};

const rule: GraphQLESLintRule<[RequireDescriptionRuleConfig]> = {
  meta: {
    docs: {
      category: 'Schema',
      description: 'Enforce descriptions in your type definitions.',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-description.md',
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
      [REQUIRE_DESCRIPTION_ERROR]: 'Description is required for nodes of type "{{ nodeType }}"',
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
            [...ALLOWED_KINDS].sort().map(kind => [
              kind,
              {
                type: 'boolean',
                description: `Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#${kind}).`,
              },
            ])
          ),
        },
      },
    },
  },
  create(context) {
    const { types, ...restOptions } = context.options[0];

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
        const description = node.description?.value || '';
        if (description.trim().length === 0) {
          context.report({
            loc: getLocation(node.name.loc, node.name.value),
            messageId: REQUIRE_DESCRIPTION_ERROR,
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
