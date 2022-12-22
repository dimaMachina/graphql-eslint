import { GraphQLESLintRule } from '../types.js';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { ObjectTypeDefinitionNode } from 'graphql';

const RULE_ID = 'require-type-pattern-with-oneof';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Schema',
      description: 'Enforce types with `@oneOf` directive have `error` and `ok` fields.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Mutation {
              doSomething: DoSomethingMutationResult!
            }

            interface Error {
              message: String!
            }

            type DoSomethingMutationResult @oneOf {
              ok: DoSomethingSuccess
              error: Error
            }

            type DoSomethingSuccess {
              # ...
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: 'Type `{{typeName}}` should have `{{fieldName}}` field.',
    },
    schema: [],
  },
  create(context) {
    return {
      'Directive[name.value=oneOf][parent.kind=ObjectTypeDefinition]'({
        parent,
      }: {
        parent: GraphQLESTreeNode<ObjectTypeDefinitionNode>;
      }) {
        const requiredFields = ['error', 'ok'];
        for (const fieldName of requiredFields) {
          if (!parent.fields.some(field => field.name.value === fieldName)) {
            context.report({
              node: parent.name,
              messageId: RULE_ID,
              data: {
                typeName: parent.name.value,
                fieldName,
              },
            });
          }
        }
      },
    };
  },
};
