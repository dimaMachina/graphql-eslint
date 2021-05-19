import { GraphQLESLintRule } from '../types';
import { normalizePath, requireSiblingsOperations } from '../utils';

const UNIQUE_OPERATION_NAME = 'UNIQUE_OPERATION_NAME';

const rule: GraphQLESLintRule<[], false> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: `This rule allow you to enforce unique operation names across your project.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/unique-operation-name.md`,
      requiresSchema: false,
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
      [UNIQUE_OPERATION_NAME]: `Operation named "{{ operationName }}" already defined in:\n{{ operationsSummary }}`,
    },
  },
  create(context) {
    return {
      OperationDefinition: node => {
        const operationName = node.name?.value;
        const siblings = requireSiblingsOperations('unique-operation-name', context);

        if (operationName) {
          const siblingOperations = siblings.getOperation(operationName);

          const conflictingOperations = siblingOperations.filter(
            f =>
              f.document.name?.value === operationName &&
              normalizePath(f.filePath) !== normalizePath(context.getFilename())
          );

          if (conflictingOperations.length > 0) {
            context.report({
              loc: {
                start: {
                  line: node.name.loc.start.line,
                  column: node.name.loc.start.column - 1,
                },
                end: {
                  line: node.name.loc.end.line,
                  column: node.name.loc.end.column - 1,
                },
              },
              messageId: UNIQUE_OPERATION_NAME,
              data: {
                operationName,
                operationsSummary: conflictingOperations.map(f => `\t${f.filePath}`).join('\n'),
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
