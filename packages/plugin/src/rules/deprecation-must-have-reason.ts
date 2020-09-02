import { GraphQLESLintRule, valueFromNode } from '@graphql-eslint/types';

const rule: GraphQLESLintRule = {
  meta: {},
  create(context) {
    return {
      Directive(node) {
        if (node && node.name && node.name.value === 'deprecated') {
          const args = node.arguments || [];
          const reasonArg = args.find(arg => arg.name && arg.name.value === 'reason');
          const value = reasonArg ? String(valueFromNode(reasonArg.value, {}) || '').trim() : null;

          if (!value) {
            context.report({
              node: node.name,
              message: `Directive "@deprecated" must have a reason!`,
            });
          }
        }
      },
    }
  }
}

export default rule;
