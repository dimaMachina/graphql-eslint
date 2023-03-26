import { ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { displayNodeName } from '../utils.js';

const RULE_ID = 'require-type-pattern-with-oneof';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Schema',
      description: 'Enforce types with `@oneOf` directive have `error` and `ok` fields.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
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
      [RULE_ID]:
        '{{ nodeName }} is defined as output with "@oneOf" and must be defined with "{{ fieldName }}" field',
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
          if (!parent.fields?.some(field => field.name.value === fieldName)) {
            context.report({
              node: parent.name,
              messageId: RULE_ID,
              data: {
                nodeName: displayNodeName(parent),
                fieldName,
              },
            });
          }
        }
      },
    };
  },
};
