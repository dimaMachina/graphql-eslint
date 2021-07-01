import { FieldDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types';

const AVOID_TYPENAME_PREFIX = 'AVOID_TYPENAME_PREFIX';

function checkNode(
  context: GraphQLESLintRuleContext<any>,
  typeName: string,
  fields: GraphQLESTreeNode<FieldDefinitionNode>[]
) {
  const lowerTypeName = (typeName || '').toLowerCase();

  for (const field of fields) {
    const fieldName = field.name.value || '';

    if (fieldName && lowerTypeName && fieldName.toLowerCase().startsWith(lowerTypeName)) {
      context.report({
        node: field.name,
        data: {
          fieldName,
          typeName,
        },
        messageId: AVOID_TYPENAME_PREFIX,
      });
    }
  }
}

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: 'Enforces users to avoid using the type name in a field name while defining your schema.',
      recommended: true,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/avoid-typename-prefix.md',
      requiresSiblings: false,
      requiresSchema: false,
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
      [AVOID_TYPENAME_PREFIX]: `Field "{{ fieldName }}" starts with the name of the parent type "{{ typeName }}"`,
    },
  },
  create(context) {
    return {
      ObjectTypeDefinition(node) {
        checkNode(context, node.name.value, node.fields);
      },
      ObjectTypeExtension(node) {
        checkNode(context, node.name.value, node.fields);
      },
      InterfaceTypeDefinition(node) {
        checkNode(context, node.name.value, node.fields);
      },
      InterfaceTypeExtension(node) {
        checkNode(context, node.name.value, node.fields);
      },
    };
  },
};

export default rule;
