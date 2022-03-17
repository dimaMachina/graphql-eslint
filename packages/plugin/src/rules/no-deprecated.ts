import { EnumValueNode, FieldNode, Kind } from 'graphql';
import { requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const RULE_ID = 'no-deprecated';

const rule: GraphQLESLintRule<[], true> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Operations',
      description: 'Enforce that deprecated fields or enum values are not in use by operations.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
      [RULE_ID]: 'This {{ type }} is marked as deprecated in your GraphQL schema (reason: {{ reason }})',
    },
    schema: [],
  },
  create(context) {
    requireGraphQLSchemaFromContext(RULE_ID, context);

    function report(node: GraphQLESTreeNode<EnumValueNode | FieldNode, true>, reason: string): void {
      const nodeName = node.type === Kind.ENUM ? node.value : node.name.value;
      const nodeType = node.type === Kind.ENUM ? 'enum value' : 'field';
      context.report({
        node,
        messageId: RULE_ID,
        data: {
          type: nodeType,
          reason,
        },
        suggest: [
          {
            desc: `Remove \`${nodeName}\` ${nodeType}`,
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
    };
  },
};

export default rule;
