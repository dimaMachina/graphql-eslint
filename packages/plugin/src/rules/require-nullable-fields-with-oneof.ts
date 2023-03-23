import { DirectiveNode, Kind } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { getNodeName } from '../utils.js';

const RULE_ID = 'require-nullable-fields-with-oneof';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Schema',
      description: 'Require `input` or `type` fields to be non-nullable with `@oneOf` directive.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            input Input @oneOf {
              foo: String!
              b: Int
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            input Input @oneOf {
              foo: String
              bar: Int
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: '{{ nodeName }} must be nullable when "@oneOf" is in use',
    },
    schema: [],
  },
  create(context) {
    return {
      'Directive[name.value=oneOf]'({ parent }: GraphQLESTreeNode<DirectiveNode>) {
        const isTypeOrInput = [
          Kind.OBJECT_TYPE_DEFINITION,
          Kind.INPUT_OBJECT_TYPE_DEFINITION,
        ].includes(parent.kind);
        if (!isTypeOrInput) {
          return;
        }

        for (const field of parent.fields || []) {
          if (field.gqlType.kind === Kind.NON_NULL_TYPE) {
            context.report({
              node: field.name,
              messageId: RULE_ID,
              data: { nodeName: getNodeName(field) },
            });
          }
        }
      },
    };
  },
};
