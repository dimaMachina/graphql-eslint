import { GraphQLESLintRule } from '../types.js';
import { checkNode } from './unique-fragment-name.js';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { OperationDefinitionNode } from 'graphql';

const RULE_ID = 'unique-operation-name';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: 'Enforce unique operation names across your project.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      requiresSiblings: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # foo.query.graphql
            query user {
              user {
                id
              }
            }

            # bar.query.graphql
            query user {
              me {
                id
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # foo.query.graphql
            query user {
              user {
                id
              }
            }

            # bar.query.graphql
            query me {
              me {
                id
              }
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: 'Operation named "{{ documentName }}" already defined in:\n{{ summary }}',
    },
    schema: [],
  },
  create(context) {
    return {
      'OperationDefinition[name!=undefined]'(node: GraphQLESTreeNode<OperationDefinitionNode>) {
        checkNode(context, node, RULE_ID);
      },
    };
  },
};
