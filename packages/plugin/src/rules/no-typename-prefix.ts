import {
  InterfaceTypeDefinitionNode,
  InterfaceTypeExtensionNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from 'graphql';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRule } from '../types';

const NO_TYPENAME_PREFIX = 'NO_TYPENAME_PREFIX';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description: 'Enforces users to avoid using the type name in a field name while defining your schema.',
      recommended: true,
      url: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-typename-prefix.md',
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              userId: ID!
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              id: ID!
            }
          `,
        },
      ],
    },
    messages: {
      [NO_TYPENAME_PREFIX]: `Field "{{ fieldName }}" starts with the name of the parent type "{{ typeName }}"`,
    },
    schema: [],
  },
  create(context) {
    return {
      'ObjectTypeDefinition, ObjectTypeExtension, InterfaceTypeDefinition, InterfaceTypeExtension'(
        node: GraphQLESTreeNode<
          ObjectTypeDefinitionNode | ObjectTypeExtensionNode | InterfaceTypeDefinitionNode | InterfaceTypeExtensionNode
        >
      ) {
        const typeName = node.name.value;
        const lowerTypeName = typeName.toLowerCase();

        for (const field of node.fields) {
          const fieldName = field.name.value;

          if (fieldName.toLowerCase().startsWith(lowerTypeName)) {
            context.report({
              data: {
                fieldName,
                typeName,
              },
              messageId: NO_TYPENAME_PREFIX,
              node: field.name,
              suggest: [
                {
                  desc: `Remove \`${fieldName.slice(0, typeName.length)}\` prefix`,
                  fix: fixer =>
                    fixer.replaceText(field.name as any, fieldName.replace(new RegExp(`^${typeName}`, 'i'), '')),
                },
              ],
            });
          }
        }
      },
    };
  },
};

export default rule;
