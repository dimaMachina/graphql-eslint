import { getLocation, requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';

const NO_DEPRECATED = 'NO_DEPRECATED';

const rule: GraphQLESLintRule<[], true> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: `Enforce that deprecated fields or enum values are not in use by operations.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-deprecated.md`,
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
      [NO_DEPRECATED]: `This {{ type }} is marked as deprecated in your GraphQL schema {{ reason }}`,
    },
    schema: [],
  },
  create(context) {
    return {
      EnumValue(node) {
        requireGraphQLSchemaFromContext('no-deprecated', context);
        const typeInfo = node.typeInfo();

        if (typeInfo && typeInfo.enumValue) {
          if (typeInfo.enumValue.deprecationReason) {
            const enumValueName = node.value;
            context.report({
              loc: getLocation(node.loc, enumValueName),
              messageId: NO_DEPRECATED,
              data: {
                type: 'enum value',
                reason: typeInfo.enumValue.deprecationReason ? `(reason: ${typeInfo.enumValue.deprecationReason})` : '',
              },
            });
          }
        }
      },
      Field(node) {
        requireGraphQLSchemaFromContext('no-deprecated', context);
        const typeInfo = node.typeInfo();

        if (typeInfo && typeInfo.fieldDef) {
          if (typeInfo.fieldDef.deprecationReason) {
            const fieldName = node.name.value;
            context.report({
              loc: getLocation(node.loc, fieldName),
              messageId: NO_DEPRECATED,
              data: {
                type: 'field',
                reason: typeInfo.fieldDef.deprecationReason ? `(reason: ${typeInfo.fieldDef.deprecationReason})` : '',
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
