import { ArgumentNode, DirectiveNode } from 'graphql';
import { GraphQLESTreeNode, valueFromNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';

export const rule: GraphQLESLintRule = {
  meta: {
    docs: {
      description: 'Require all deprecation directives to specify a reason.',
      category: 'Schema',
      url: 'https://the-guild.dev/graphql/eslint/rules/require-deprecation-reason',
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
        const reasonArgument = node.arguments?.find(
          arg => arg.name.value === 'reason',
        ) as any as ArgumentNode;
        const value = reasonArgument && String(valueFromNode(reasonArgument.value)).trim();

        if (!value) {
          context.report({
            node: node.name,
            message: `Deprecation reason is required for field "${node.parent.name.value}" in type "${node.parent.parent.name.value}".`,
          });
        }
      },
    };
  },
};
