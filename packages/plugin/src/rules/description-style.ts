import { StringValueNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

type DescriptionStyleRuleConfig = { style: 'inline' | 'block' };

const rule: GraphQLESLintRule<[DescriptionStyleRuleConfig]> = {
  meta: {
    type: 'suggestion',
    docs: {
      examples: [
        {
          title: 'Incorrect',
          usage: [{ style: 'inline' }],
          code: /* GraphQL */ `
            """ Description """
            type someTypeName {
              # ...
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ style: 'inline' }],
          code: /* GraphQL */ `
            " Description "
            type someTypeName {
              # ...
            }
          `,
        },
      ],
      description: 'Require all comments to follow the same style (either block or inline).',
      category: 'Schema',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/description-style.md',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          style: {
            enum: ['block', 'inline'],
            default: 'block',
          },
        },
      },
    ],
  },
  create(context) {
    const { style = 'block' } = context.options[0] || {};
    const isBlock = style === 'block';
    return {
      [`.description[type=StringValue][block!=${isBlock}]`](node: GraphQLESTreeNode<StringValueNode>) {
        context.report({
          loc: isBlock ? node.loc : node.loc.start,
          message: `Unexpected ${isBlock ? 'inline' : 'block'} description`,
        });
      },
    };
  },
};

export default rule;
