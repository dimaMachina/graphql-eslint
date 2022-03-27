import type { ArgumentNode, DirectiveNode } from 'graphql';
import type { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode, valueFromNode } from '../estree-converter';

const rule: GraphQLESLintRule = {
  meta: {
    docs: {
      description: 'Require all deprecation directives to specify a reason.',
      category: 'Schema',
      url: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/require-deprecation-reason.md',
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
      'Directive[name.value=deprecated]'(node: GraphQLESTreeNode<DirectiveNode>) {
        const reasonArgument = node.arguments.find(arg => arg.name.value === 'reason') as any as ArgumentNode;
        const value = reasonArgument && String(valueFromNode(reasonArgument.value)).trim();

        if (!value) {
          context.report({
            node: node.name,
            message: 'Directive "@deprecated" must have a reason!',
          });
        }
      },
    };
  },
};

export default rule;
