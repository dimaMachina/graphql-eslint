import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';
import { OperationDefinitionNode, FragmentDefinitionNode } from 'graphql';

export type AvoidOperationNamePrefixConfig = [
  {
    keywords: string[];
    caseSensitive?: boolean;
  }
];

const AVOID_OPERATION_NAME_PREFIX = 'AVOID_OPERATION_NAME_PREFIX';

function verifyRule(
  context: GraphQLESLintRuleContext<AvoidOperationNamePrefixConfig>,
  node: GraphQLESTreeNode<OperationDefinitionNode> | GraphQLESTreeNode<FragmentDefinitionNode>
) {
  const config = context.options[0] || { keywords: [], caseSensitive: false };
  const caseSensitive = config.caseSensitive;
  const keywords = config.keywords || [];

  if (node && node.name && node.name.value !== '') {
    for (const keyword of keywords) {
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
    type: 'suggestion',
    docs: {
      description:
        'Enforce/avoid operation name prefix, useful if you wish to avoid prefix in your root fields, or avoid using REST terminology in your schema.',
      category: 'Stylistic Issues',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/avoid-operation-name-prefix.md',
      examples: [
        {
          title: 'Incorrect',
          usage: [{ keywords: ['get'] }],
          code: /* GraphQL */ `
            query getUserDetails {
              # ...
            }`,
        },
        {
          title: 'Correct',
          usage: [{ keywords: ['get'] }],
          code: /* GraphQL */ `
            query userDetails {
              # ...
            }`,
        },
      ],
    },
    messages: {
      [AVOID_OPERATION_NAME_PREFIX]: `Forbidden operation name prefix: "{{ invalidPrefix }}"`,
    },
    schema: [
      {
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
    ],
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
