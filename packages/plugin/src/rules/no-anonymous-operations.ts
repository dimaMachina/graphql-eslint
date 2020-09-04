import { GraphQLESLintRule} from '@graphql-eslint/types';

const NO_ANONYMOUS_OPERATIONS = 'NO_ANONYMOUS_OPERATIONS';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      NO_ANONYMOUS_OPERATIONS: `Anonymous GraphQL operations are forbidden. Please make sure to name your {{ operation }}!`
    }
  },
  create(context) {
    return {
      OperationDefinition(node) {
        if (node && (!node.name || node.name.value === '')) {
          context.report({
            loc: {
              start: {
                column: node.loc.start.column - 1,
                line: node.loc.start.line,
              },
              end: {
                column: node.loc.start.column + node.operation.length,
                line: node.loc.start.line,
              }
            },
            data: {
              operation: node.operation,
            },
            messageId: NO_ANONYMOUS_OPERATIONS,
          })
        }
      },
    }
  }
}

export default rule;
