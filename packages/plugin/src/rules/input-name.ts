import {
  Kind,
  NamedTypeNode,
  ObjectTypeExtensionNode,
  ObjectTypeDefinitionNode,
  NameNode,
} from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-converter';
import { GraphQLESLintRuleListener } from '../testkit';

type InputNameRuleConfig = {
  checkInputType?: boolean;
  caseSensitiveInputType?: boolean;
  checkQueries?: boolean;
  checkMutations?: boolean;
};

type ObjectTypeNode = GraphQLESTreeNode<ObjectTypeDefinitionNode | ObjectTypeExtensionNode>;

const isObjectType = (node: ObjectTypeNode): boolean =>
  [Kind.OBJECT_TYPE_DEFINITION, Kind.OBJECT_TYPE_EXTENSION].includes(node.type);
const isQueryType = (node: ObjectTypeNode): boolean =>
  isObjectType(node) && node.name.value === 'Query';
const isMutationType = (node: ObjectTypeNode): boolean =>
  isObjectType(node) && node.name.value === 'Mutation';

const rule: GraphQLESLintRule<[InputNameRuleConfig]> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      description:
        'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".\nUsing the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
      category: 'Schema',
      url: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/input-name.md',
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
        additionalProperties: false,
        properties: {
          checkInputType: {
            type: 'boolean',
            default: false,
            description:
              'Check that the input type name follows the convention <mutationName>Input',
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
      },
    ],
  },
  create(context) {
    const options: InputNameRuleConfig = {
      checkInputType: false,
      caseSensitiveInputType: true,
      checkQueries: false,
      checkMutations: true,
      ...context.options[0],
    };

    const shouldCheckType = node =>
      (options.checkMutations && isMutationType(node)) ||
      (options.checkQueries && isQueryType(node));

    const listeners: GraphQLESLintRuleListener = {
      'FieldDefinition > InputValueDefinition[name.value!=input] > Name'(
        node: GraphQLESTreeNode<NameNode>
      ) {
        if (shouldCheckType((node as any).parent.parent.parent)) {
          const inputName = node.value;
          context.report({
            node,
            message: `Input \`${inputName}\` should be called \`input\`.`,
            suggest: [
              {
                desc: 'Rename to `input`',
                fix: fixer => fixer.replaceText(node as any, 'input'),
              },
            ],
          });
        }
      },
    };

    if (options.checkInputType) {
      listeners['FieldDefinition > InputValueDefinition NamedType'] = (
        node: GraphQLESTreeNode<NamedTypeNode>
      ) => {
        const findInputType = item => {
          let currentNode = item;
          while (currentNode.type !== Kind.INPUT_VALUE_DEFINITION) {
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
              node: node.name,
              message: `Input type \`${name}\` name should be \`${mutationName}\`.`,
              suggest: [
                {
                  desc: `Rename to \`${mutationName}\``,
                  fix: fixer => fixer.replaceText(node as any, mutationName),
                },
              ],
            });
          }
        }
      };
    }
    return listeners;
  },
};

export default rule;
