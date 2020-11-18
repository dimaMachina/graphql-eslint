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
        'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input"',
      category: 'Stylistic Issues',
      recommended: false,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/input-name.md',
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
