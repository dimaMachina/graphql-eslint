import { GraphQLESLintRule, GraphQLESlintRuleContext } from '../types';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';
import { OperationDefinitionNode, FragmentDefinitionNode } from 'graphql';

const NO_OPERATION_NAME_SUFFIX = 'NO_OPERATION_NAME_SUFFIX';

function verifyRule(
  context: GraphQLESlintRuleContext,
  node: GraphQLESTreeNode<OperationDefinitionNode> | GraphQLESTreeNode<FragmentDefinitionNode>
) {
  if (node && node.name && node.name.value !== '') {
    const invalidSuffix = (node.type === 'OperationDefinition' ? node.operation : 'fragment').toLowerCase();

    if (node.name.value.toLowerCase().endsWith(invalidSuffix)) {
      context.report({
        node: node.name,
        data: {
          invalidSuffix,
        },
        fix: fixer => fixer.removeRange([node.name.range[1] - invalidSuffix.length, node.name.range[1]]),
        messageId: NO_OPERATION_NAME_SUFFIX,
      });
    }
  }
}

const rule: GraphQLESLintRule = {
  meta: {
    fixable: 'code',
    type: 'suggestion',
    docs: {
      category: 'Stylistic Issues',
      recommended: true,
      description: `Makes sure you are not adding the operation type to the name of the operation.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-operation-name-suffix.md`,
      requiresSchema: false,
      requiresSiblings: false,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query userQuery {
              # ...
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            query user {
              # ...
            }
          `,
        },
      ],
    },
    messages: {
      [NO_OPERATION_NAME_SUFFIX]: `Unnecessary "{{ invalidSuffix }}" suffix in your operation name!`,
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
