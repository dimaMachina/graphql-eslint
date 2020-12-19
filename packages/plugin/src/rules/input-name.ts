import { GraphQLESLintRule } from '../types';

type InputNameRuleConfig = [
  {
    checkInputType?: boolean;
  }
];

const rule: GraphQLESLintRule<InputNameRuleConfig> = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".\nUsing the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
      category: 'Stylistic Issues',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/input-name.md',
      requiresSiblings: false,
      requiresSchema: false,
      examples: [
        {
          title: 'Incorrect',
          usage: [{ checkInputType: true }],
          code: /* GraphQL */ `
            type Mutation {
              SetMessage(message: InputMessage): String
            }
          `,
        },
        {
          title: 'Correct (with checkInputType)',
          usage: [{ checkInputType: true }],
          code: /* GraphQL */ `
            type Mutation {
              SetMessage(input: SetMessageInput): String
            }
          `,
        },
        {
          title: 'Correct (without checkInputType)',
          usage: [{ checkInputType: false }],
          code: /* GraphQL */ `
            type Mutation {
              SetMessage(input: AnyInputTypeName): String
            }
          `,
        },
      ],
    },
    schema: [
      {
        type: 'object',
        properties: {
          checkInputType: {
            type: 'boolean',
            default: 'true',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const isMutationType = node => {
      return (
        (node.type === 'ObjectTypeDefinition' || node.type === 'ObjectTypeExtension') && node.name.value === 'Mutation'
      );
    };

    const listeners = {
      'FieldDefinition > InputValueDefinition': node => {
        if (node.name.value !== 'input' && isMutationType(node.parent.parent)) {
          context.report({
            node: node.name,
            message: `Input "${node.name.value}" should be called "input"`,
          });
        }
      },
    };
    if (context.options && context.options[0] && context.options[0].checkInputType) {
      listeners['FieldDefinition > InputValueDefinition NamedType'] = node => {
        const findInputType = item => {
          let currentNode = item;
          while (currentNode.type !== 'InputValueDefinition') {
            currentNode = currentNode.parent;
          }
          return currentNode;
        };

        const inputValueNode = findInputType(node);
        if (isMutationType(inputValueNode.parent.parent)) {
          const mutationName = `${inputValueNode.parent.name.value}Input`;

          if (node.name.value !== mutationName) {
            context.report({ node, message: `InputType "${node.name.value}" name should be "${mutationName}"` });
          }
        }
      };
    }

    return listeners;
  },
};

export default rule;
