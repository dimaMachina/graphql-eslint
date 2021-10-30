import { GraphQLESLintRule } from '../types';
import { getLocation, isMutationType, isQueryType } from '../utils';

type InputNameRuleConfig = {
  checkInputType?: boolean;
  caseSensitiveInputType?: boolean;
  checkQueries?: boolean;
  checkMutations?: boolean;
};

const rule: GraphQLESLintRule<InputNameRuleConfig[]> = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".\nUsing the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
      category: 'Stylistic Issues',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/input-name.md',
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
            default: false,
            description: 'Check that the input type name follows the convention <mutationName>Input',
          },
          caseSensitiveInputType: {
            type: 'boolean',
            default: true,
            description: 'Allow for case discrepancies in the input type name',
          },
          checkQueries: {
            type: 'boolean',
            default: false,
            description: 'Apply the rule to Queries',
          },
          checkMutations: {
            type: 'boolean',
            default: true,
            description: 'Apply the rule to Mutations',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options: InputNameRuleConfig = {
      caseSensitiveInputType: true,
      checkInputType: false,
      checkMutations: true,
      checkQueries: false,
      ...context?.options?.[0],
    };

    const shouldCheckType = node =>
      (options.checkMutations && isMutationType(node)) || (options.checkQueries && isQueryType(node));

    const listeners = {
      'FieldDefinition > InputValueDefinition': node => {
        const name = node.name.value;
        if (name !== 'input' && shouldCheckType(node.parent.parent)) {
          context.report({
            loc: getLocation(node.loc, name),
            message: `Input "${name}" should be called "input"`,
          });
        }
      },
    };

    if (options?.checkInputType) {
      listeners['FieldDefinition > InputValueDefinition NamedType'] = node => {
        const findInputType = item => {
          let currentNode = item;
          while (currentNode.type !== 'InputValueDefinition') {
            currentNode = currentNode.parent;
          }
          return currentNode;
        };

        const inputValueNode = findInputType(node);
        if (shouldCheckType(inputValueNode.parent.parent)) {
          const mutationName = `${inputValueNode.parent.name.value}Input`;
          const name = node.name.value;
          if (
            (options.caseSensitiveInputType && node.name.value !== mutationName) ||
            name.toLowerCase() !== mutationName.toLowerCase()
          ) {
            context.report({
              loc: getLocation(node.loc, name),
              message: `InputType "${name}" name should be "${mutationName}"`,
            });
          }
        }
      };
    }
    return listeners;
  },
};

export default rule;
