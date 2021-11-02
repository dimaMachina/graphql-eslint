import { GraphQLESLintRule, GraphQLESLintRuleContext, ValueOf } from '../types';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';
import { ASTKindToNode, Kind, StringValueNode } from 'graphql';
import { getLocation } from '../utils';

const REQUIRE_DESCRIPTION_ERROR = 'REQUIRE_DESCRIPTION_ERROR';
const DESCRIBABLE_NODES = [
  Kind.SCHEMA_DEFINITION,
  Kind.OBJECT_TYPE_DEFINITION,
  Kind.FIELD_DEFINITION,
  Kind.INPUT_VALUE_DEFINITION,
  Kind.INTERFACE_TYPE_DEFINITION,
  Kind.UNION_TYPE_DEFINITION,
  Kind.ENUM_TYPE_DEFINITION,
  Kind.ENUM_VALUE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION,
  Kind.DIRECTIVE_DEFINITION,
];
type RequireDescriptionRuleConfig = [{ on: typeof DESCRIBABLE_NODES }];

type AllowedKind = typeof DESCRIBABLE_NODES[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

function verifyRule(
  context: GraphQLESLintRuleContext<RequireDescriptionRuleConfig>,
  node: GraphQLESTreeNode<ValueOf<AllowedKindToNode>> & {
    readonly description?: GraphQLESTreeNode<StringValueNode>;
  }
) {
  if (node) {
    if (!node.description || !node.description.value || node.description.value.trim().length === 0) {
      context.report({
        loc: getLocation(('name' in node ? node.name : node).loc, 'name' in node ? node.name.value : 'schema'),
        messageId: REQUIRE_DESCRIPTION_ERROR,
        data: {
          nodeType: node.kind,
        },
      });
    }
  }
}

const rule: GraphQLESLintRule<RequireDescriptionRuleConfig> = {
  meta: {
    docs: {
      category: 'Best Practices',
      description: `Enforce descriptions in your type definitions.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-description.md`,
      examples: [
        {
          title: 'Incorrect',
          usage: [{ on: [Kind.OBJECT_TYPE_DEFINITION, Kind.FIELD_DEFINITION] }],
          code: /* GraphQL */ `
            type someTypeName {
              name: String
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ on: [Kind.OBJECT_TYPE_DEFINITION, Kind.FIELD_DEFINITION] }],
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
    },
    type: 'suggestion',
    messages: {
      [REQUIRE_DESCRIPTION_ERROR]: `Description is required for nodes of type "{{ nodeType }}"`,
    },
    schema: {
      type: 'array',
      additionalItems: false,
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'object',
        require: ['on'],
        properties: {
          on: {
            type: 'array',
            minItems: 1,
            additionalItems: false,
            items: {
              type: 'string',
              enum: DESCRIBABLE_NODES,
            },
          },
        },
      },
    },
  },
  create(context) {
    return Object.fromEntries(context.options[0].on.map(optionKey => [optionKey, node => verifyRule(context, node)]));
  },
};

export default rule;
