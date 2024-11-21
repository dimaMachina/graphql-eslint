import { ArgumentNode, EnumValueNode, FieldNode, ObjectFieldNode } from 'graphql';
import { GraphQLESTreeNode } from '../../estree-converter/index.js';
import { GraphQLESLintRule } from '../../types.js';
import { displayNodeName, requireGraphQLSchemaFromContext } from '../../utils.js';

const RULE_ID = 'no-deprecated';

export const rule: GraphQLESLintRule<[], true> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Operations',
      description: 'Enforce that deprecated fields or enum values are not in use by operations.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect (field)',
          code: /* GraphQL */ `
            # In your schema
            type User {
              id: ID!
              name: String! @deprecated(reason: "old field, please use fullName instead")
              fullName: String!
            }

            # Query
            query user {
              user {
                name # This is deprecated, so you'll get an error
              }
            }
          `,
        },
        {
          title: 'Incorrect (enum value)',
          code: /* GraphQL */ `
            # In your schema
            type Mutation {
              changeSomething(type: SomeType): Boolean!
            }

            enum SomeType {
              NEW
              OLD @deprecated(reason: "old field, please use NEW instead")
            }

            # Mutation
            mutation {
              changeSomething(
                type: OLD # This is deprecated, so you'll get an error
              ) {
                ...
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # In your schema
            type User {
              id: ID!
              name: String! @deprecated(reason: "old field, please use fullName instead")
              fullName: String!
            }

            # Query
            query user {
              user {
                id
                fullName
              }
            }
          `,
        },
      ],
      recommended: true,
    },
    messages: {
      [RULE_ID]: '{{ type }} is marked as deprecated in your GraphQL schema (reason: {{ reason }})',
    },
    schema: [],
  },
  create(context) {
    requireGraphQLSchemaFromContext(RULE_ID, context);

    function report(
      node: GraphQLESTreeNode<EnumValueNode | FieldNode | ArgumentNode | ObjectFieldNode, true>,
      reason: string,
    ): void {
      const nodeType = displayNodeName(node);
      context.report({
        node,
        messageId: RULE_ID,
        data: {
          type: nodeType[0].toUpperCase() + nodeType.slice(1),
          reason,
        },
        suggest: [
          {
            desc: `Remove ${nodeType}`,
            fix: fixer => fixer.remove(node as any),
          },
        ],
      });
    }

    return {
      EnumValue(node) {
        const typeInfo = node.typeInfo();
        const reason = typeInfo.enumValue?.deprecationReason;

        if (reason) {
          report(node, reason);
        }
      },
      Field(node) {
        const typeInfo = node.typeInfo();
        const reason = typeInfo.fieldDef?.deprecationReason;

        if (reason) {
          report(node, reason);
        }
      },
      Argument(node) {
        const typeInfo = node.typeInfo();
        const reason = typeInfo.argument?.deprecationReason;
        if (reason) {
          report(node, reason);
        }
      },
      ObjectValue(node) {
        const { inputType } = node.typeInfo();
        if (!inputType) return;
        if ('getFields' in inputType) {
          const fields = inputType.getFields();
          for (const field of node.fields) {
            const fieldName = field.name.value;
            const reason = fields[fieldName].deprecationReason;
            if (reason) {
              report(field, reason);
            }
          }
        }
      },
    };
  },
};
