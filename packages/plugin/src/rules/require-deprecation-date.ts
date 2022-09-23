import { DirectiveNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode, valueFromNode } from '../estree-converter';

// eslint-disable-next-line unicorn/better-regex
const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

const MESSAGE_REQUIRE_DATE = 'MESSAGE_REQUIRE_DATE';
const MESSAGE_INVALID_FORMAT = 'MESSAGE_INVALID_FORMAT';
const MESSAGE_INVALID_DATE = 'MESSAGE_INVALID_DATE';
const MESSAGE_CAN_BE_REMOVED = 'MESSAGE_CAN_BE_REMOVED';

const rule: GraphQLESLintRule<[{ argumentName?: string }]> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description:
        'Require deletion date on `@deprecated` directive. Suggest removing deprecated things after deprecated date.',
      url: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/require-deprecation-date.md',
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              firstname: String @deprecated
              firstName: String
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              firstname: String @deprecated(reason: "Use 'firstName' instead")
              firstName: String
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              firstname: String
                @deprecated(reason: "Use 'firstName' instead", deletionDate: "25/12/2022")
              firstName: String
            }
          `,
        },
      ],
    },
    messages: {
      [MESSAGE_REQUIRE_DATE]: 'Directive "@deprecated" must have a deletion date',
      [MESSAGE_INVALID_FORMAT]: 'Deletion date must be in format "DD/MM/YYYY"',
      [MESSAGE_INVALID_DATE]: 'Invalid "{{ deletionDate }}" deletion date',
      [MESSAGE_CAN_BE_REMOVED]: '"{{ nodeName }}" сan be removed',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          argumentName: {
            type: 'string',
          },
        },
      },
    ],
  },
  create(context) {
    return {
      'Directive[name.value=deprecated]'(node: GraphQLESTreeNode<DirectiveNode>) {
        const argName = context.options[0]?.argumentName || 'deletionDate';
        const deletionDateNode = node.arguments.find(arg => arg.name.value === argName);

        if (!deletionDateNode) {
          context.report({
            node: node.name,
            messageId: MESSAGE_REQUIRE_DATE,
          });
          return;
        }
        const deletionDate = valueFromNode(deletionDateNode.value as any);
        const isValidDate = DATE_REGEX.test(deletionDate);

        if (!isValidDate) {
          context.report({ node: deletionDateNode.value, messageId: MESSAGE_INVALID_FORMAT });
          return;
        }
        let [day, month, year] = deletionDate.split('/');
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');
        const deletionDateInMS = Date.parse(`${year}-${month}-${day}`);

        if (Number.isNaN(deletionDateInMS)) {
          context.report({
            node: deletionDateNode.value,
            messageId: MESSAGE_INVALID_DATE,
            data: {
              deletionDate,
            },
          });
          return;
        }

        const canRemove = Date.now() > deletionDateInMS;

        if (canRemove) {
          const { parent } = node as any;
          const nodeName = parent.name.value;
          context.report({
            node: parent.name,
            messageId: MESSAGE_CAN_BE_REMOVED,
            data: { nodeName },
            suggest: [
              {
                desc: `Remove \`${nodeName}\``,
                fix: fixer => fixer.remove(parent),
              },
            ],
          });
        }
      },
    };
  },
};

export default rule;
