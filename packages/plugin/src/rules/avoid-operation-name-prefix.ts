import { GraphQLESLintRule, GraphQLESlintRuleContext } from '../types';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';
import { OperationDefinitionNode, FragmentDefinitionNode } from 'graphql';

type AvoidOperationNamePrefixConfig = {
  keywords: string[];
  caseSensitive?: boolean;
};

const AVOID_OPERATION_NAME_PREFIX = 'AVOID_OPERATION_NAME_PREFIX';

function verifyRule(
  context: GraphQLESlintRuleContext<AvoidOperationNamePrefixConfig>,
  node: GraphQLESTreeNode<OperationDefinitionNode> | GraphQLESTreeNode<FragmentDefinitionNode>
) {
  const caseSensitive = context.options[0].caseSensitive;

  if (node && node.name && node.name.value !== '') {
    for (const keyword of context.options[0].keywords) {
      const testKeyword = caseSensitive ? keyword : keyword.toLowerCase();
      const testName = caseSensitive ? node.name.value : node.name.value.toLowerCase();

      if (testName.startsWith(testKeyword)) {
        context.report({
          loc: {
            start: {
              line: node.name.loc.start.line,
              column: node.name.loc.start.column - 1,
            },
            end: {
              line: node.name.loc.start.line,
              column: node.name.loc.start.column + testKeyword.length - 1,
            },
          },
          data: {
            invalidPrefix: keyword,
          },
          messageId: AVOID_OPERATION_NAME_PREFIX,
        });
      }
    }
  }
}

const rule: GraphQLESLintRule<AvoidOperationNamePrefixConfig> = {
  meta: {
    messages: {
      [AVOID_OPERATION_NAME_PREFIX]: `Forbidden operation name prefix: "{{ invalidPrefix }}"`,
    },
    schema: {
      type: 'array',
      minItems: 1,
      maxItems: 1,
      additionalItems: false,
      items: {
        additionalProperties: false,
        type: 'object',
        required: ['keywords'],
        properties: {
          caseSensitive: {
            default: false,
            type: 'boolean',
          },
          keywords: {
            additionalItems: false,
            type: 'array',
            minItems: 1,
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  create(context) {
    return {
      OperationDefinition(node) {
        verifyRule(context, node);
      },
      FragmentDefinition(node) {
        verifyRule(context, node);
      },
    };
  },
};

export default rule;
