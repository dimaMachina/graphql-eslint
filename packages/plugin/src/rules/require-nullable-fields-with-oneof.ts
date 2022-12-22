import { GraphQLESLintRule } from '../types';
import { InputObjectTypeDefinitionNode, Kind, ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter';

const RULE_ID = 'require-nullable-fields-with-oneof';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Schema',
      description: 'Require are `input` or `type` fields be non nullable with `@oneOf` directive.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
      [RULE_ID]: 'Field `{{fieldName}}` must be nullable.',
    },
    schema: [],
  },
  create(context) {
    return {
      'Directive[name.value=oneOf]'(node: {
        parent: GraphQLESTreeNode<InputObjectTypeDefinitionNode | ObjectTypeDefinitionNode>;
      }) {
        const isTypeOrInput = [
          Kind.OBJECT_TYPE_DEFINITION,
          Kind.INPUT_OBJECT_TYPE_DEFINITION,
        ].includes(node.parent.kind);
        if (!isTypeOrInput) {
          return;
        }
        for (const field of node.parent.fields) {
          if (field.gqlType.kind === Kind.NON_NULL_TYPE) {
            context.report({
              node: field.name,
              messageId: RULE_ID,
              data: { fieldName: field.name.value },
            });
          }
        }
      },
    };
  },
};
