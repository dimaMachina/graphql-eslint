import { GraphQLESLintRule } from '../types';
import { valueFromNode } from '../estree-parser/utils';

const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

const MESSAGE_REQUIRE_DATE = 'MESSAGE_REQUIRE_DATE';
const MESSAGE_INVALID_FORMAT = 'MESSAGE_INVALID_FORMAT';
const MESSAGE_INVALID_DATE = 'MESSAGE_INVALID_DATE';
const MESSAGE_CAN_BE_REMOVED = 'MESSAGE_CAN_BE_REMOVED';

const rule: GraphQLESLintRule<[{ argumentName?: string }]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Require deletion date on `@deprecated` directive. Suggest removing deprecated things after deprecated date.',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-deprecation-date.md',
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
              firstname: String @deprecated(reason: "Use 'firstName' instead", deletionDate: "25/12/2022")
              firstName: String
            }
          `,
        },
      ],
    },
    messages: {
      [MESSAGE_REQUIRE_DATE]: 'Directive "@deprecated" must have a deletion date.',
      [MESSAGE_INVALID_FORMAT]: 'Deletion date must be in format "DD/MM/YYYY".',
      [MESSAGE_INVALID_DATE]: 'Invalid "{{ deletionDate }}" deletion date.',
      [MESSAGE_CAN_BE_REMOVED]: '"{{ nodeName }}" сan be removed.',
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
      'Directive[name.value=deprecated]'(node) {
        const argName = context.options[0]?.argumentName || 'deletionDate';
        const deletionDateNode = node.arguments.find(arg => arg.name.value === argName);

        if (!deletionDateNode) {
          context.report({ node: node.name, messageId: MESSAGE_REQUIRE_DATE });
          return;
        }
        const deletionDate = valueFromNode(deletionDateNode.value);
        const isValidDate = DATE_REGEX.test(deletionDate);

        if (!isValidDate) {
          context.report({ node: node.name, messageId: MESSAGE_INVALID_FORMAT });
          return;
        }
        let [day, month, year] = deletionDate.split('/');
        day = day.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        const deletionDateInMS = Date.parse(`${year}-${month}-${day}`);

        if (Number.isNaN(deletionDateInMS)) {
          context.report({
            node: node.name,
            messageId: MESSAGE_INVALID_DATE,
            data: {
              deletionDate,
            },
          });
          return;
        }

        const canRemove = Date.now() > deletionDateInMS;

        if (canRemove) {
          context.report({
            node: node.name,
            messageId: MESSAGE_CAN_BE_REMOVED,
            data: {
              nodeName: node.parent.name.value,
            },
          });
        }
      },
    };
  },
};

export default rule;
