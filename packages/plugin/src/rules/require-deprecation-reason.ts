import { GraphQLESLintRule } from '../types';
import { valueFromNode } from '../estree-parser/utils';
import { getLocation } from '../utils';

const rule: GraphQLESLintRule = {
  meta: {
    docs: {
      description: `Require all deprecation directives to specify a reason.`,
      category: 'Best Practices',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-deprecation-reason.md`,
      recommended: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type MyType {
              name: String @deprecated
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type MyType {
              name: String @deprecated(reason: "")
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type MyType {
              name: String @deprecated(reason: "no longer relevant, please use fullName field")
            }
          `,
        },
      ],
    },
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      'Directive[name.value=deprecated]'(node) {
        const args = node.arguments || [];
        const reasonArg = args.find(arg => arg.name && arg.name.value === 'reason');
        const value = reasonArg ? String(valueFromNode(reasonArg.value) || '').trim() : null;

        if (!value) {
          context.report({
            loc: getLocation(node.loc, node.name.value, { offsetEnd: 0 }),
            message: 'Directive "@deprecated" must have a reason!',
          });
        }
      },
    };
  },
};

export default rule;
