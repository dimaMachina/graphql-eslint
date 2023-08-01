import {
  ASTNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  NamedTypeNode,
  NameNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule, GraphQLESLintRuleListener } from '../types.js';

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      checkInputType: {
        type: 'boolean',
        default: false,
        description: 'Check that the input type name follows the convention \\<mutationName>Input',
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
} as const;

export type RuleOptions = FromSchema<typeof schema>;

type ObjectTypeNode = GraphQLESTreeNode<ObjectTypeDefinitionNode | ObjectTypeExtensionNode>;

const isObjectType = (node: GraphQLESTreeNode<ASTNode>): node is ObjectTypeNode =>
  // TODO: remove `as any` when drop support of graphql@15
  [Kind.OBJECT_TYPE_DEFINITION, Kind.OBJECT_TYPE_EXTENSION].includes(node.type as any);
const isQueryType = (node: GraphQLESTreeNode<ASTNode>): boolean =>
  isObjectType(node) && node.name.value === 'Query';
const isMutationType = (node: GraphQLESTreeNode<ASTNode>): boolean =>
  isObjectType(node) && node.name.value === 'Mutation';

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      description:
        'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".\nUsing the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
      category: 'Schema',
      url: 'https://the-guild.dev/graphql/eslint/rules/input-name',
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
          title: 'Correct (with `checkInputType`)',
          usage: [{ checkInputType: true }],
          code: /* GraphQL */ `
            type Mutation {
              SetMessage(input: SetMessageInput): String
            }
          `,
        },
        {
          title: 'Correct (without `checkInputType`)',
          usage: [{ checkInputType: false }],
          code: /* GraphQL */ `
            type Mutation {
              SetMessage(input: AnyInputTypeName): String
            }
          `,
        },
      ],
    },
    schema,
  },
  create(context) {
    const options: RuleOptions[0] = {
      checkInputType: false,
      caseSensitiveInputType: true,
      checkMutations: true,
      ...context.options[0],
    };

    const shouldCheckType = (node: GraphQLESTreeNode<ASTNode>): boolean =>
      (options.checkMutations && isMutationType(node)) ||
      (options.checkQueries && isQueryType(node)) ||
      false;

    const listeners: GraphQLESLintRuleListener = {
      'FieldDefinition > InputValueDefinition[name.value!=input] > Name'(
        node: GraphQLESTreeNode<NameNode>,
      ) {
        const fieldDef = node.parent.parent as GraphQLESTreeNode<FieldDefinitionNode>;
        if (shouldCheckType(fieldDef.parent)) {
          const inputName = node.value;
          context.report({
            node,
            message: `Input "${inputName}" should be named "input" for "${fieldDef.parent.name.value}.${fieldDef.name.value}"`,
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
        node: GraphQLESTreeNode<NamedTypeNode>,
      ) => {
        const findInputType = (
          item: GraphQLESTreeNode<ASTNode>,
        ): GraphQLESTreeNode<InputValueDefinitionNode> => {
          let currentNode = item;
          while (currentNode.type !== Kind.INPUT_VALUE_DEFINITION) {
            // @ts-expect-error TODO try fix type error
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
