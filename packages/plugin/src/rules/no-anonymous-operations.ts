import { GraphQLESLintRule } from '../types';

const NO_ANONYMOUS_OPERATIONS = 'NO_ANONYMOUS_OPERATIONS';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.',
      recommended: true,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-anonymous-operations.md',
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
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
      [NO_ANONYMOUS_OPERATIONS]: `Anonymous GraphQL operations are forbidden. Please make sure to name your {{ operation }}!`,
    },
    schema: [],
  },
  create(context) {
    return {
      OperationDefinition(node) {
        const isAnonymous = (node.name?.value || '').length === 0;
        if (isAnonymous) {
          const { start } = node.loc;
          context.report({
            loc: {
              start: {
                column: start.column - 1,
                line: start.line,
              },
              end: {
                column: start.column - 1 + node.operation.length,
                line: start.line,
              },
            },
            data: {
              operation: node.operation,
            },
            messageId: NO_ANONYMOUS_OPERATIONS,
          });
        }
      },
    };
  },
};

export default rule;
