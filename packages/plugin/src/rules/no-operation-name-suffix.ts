import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser/estree-ast';
import { OperationDefinitionNode, FragmentDefinitionNode } from 'graphql';

const NO_OPERATION_NAME_SUFFIX = 'NO_OPERATION_NAME_SUFFIX';

const rule: GraphQLESLintRule = {
  meta: {
    fixable: 'code',
    type: 'suggestion',
    docs: {
      category: 'Stylistic Issues',
      recommended: true,
      description: `Makes sure you are not adding the operation type to the name of the operation.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-operation-name-suffix.md`,
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
    schema: [],
  },
  create(context) {
    return {
      'OperationDefinition, FragmentDefinition'(
        node: GraphQLESTreeNode<OperationDefinitionNode | FragmentDefinitionNode>
      ) {
        const name = node.name?.value || '';
        if (name.length > 0) {
          const invalidSuffix = 'operation' in node ? node.operation : 'fragment';

          if (name.toLowerCase().endsWith(invalidSuffix)) {
            const { start, end } = node.name.loc;
            context.report({
              loc: {
                start: {
                  column: start.column - 1 + name.length - invalidSuffix.length,
                  line: start.line,
                },
                end: {
                  column: end.column - 1 + name.length,
                  line: end.line,
                },
              },
              data: {
                invalidSuffix,
              },
              fix: fixer => fixer.removeRange([node.name.range[1] - invalidSuffix.length, node.name.range[1]]),
              messageId: NO_OPERATION_NAME_SUFFIX,
            });
          }
        }
      },
    };
  },
};

export default rule;
