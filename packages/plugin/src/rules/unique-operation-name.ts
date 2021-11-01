import { GraphQLESLintRule } from '../types';
import { checkNode } from './unique-fragment-name';

const RULE_NAME = 'unique-operation-name';
const UNIQUE_OPERATION_NAME = 'UNIQUE_OPERATION_NAME';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: `Enforce unique operation names across your project.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_NAME}.md`,
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
      [UNIQUE_OPERATION_NAME]: 'Operation named "{{ documentName }}" already defined in:\n{{ summary }}',
    },
    schema: [],
  },
  create(context) {
    return {
      'OperationDefinition[name!=undefined]'(node) {
        checkNode(context, node, RULE_NAME, UNIQUE_OPERATION_NAME);
      },
    };
  },
};

export default rule;
