import { Kind, ObjectTypeDefinitionNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import {
  ARRAY_DEFAULT_OPTIONS,
  englishJoinWords,
  requireGraphQLSchemaFromContext,
  truthy,
} from '../utils.js';

const RULE_ID = 'strict-id-in-types';

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      acceptedIdNames: {
        ...ARRAY_DEFAULT_OPTIONS,
        default: ['id'],
      },
      acceptedIdTypes: {
        ...ARRAY_DEFAULT_OPTIONS,
        default: ['ID'],
      },
      exceptions: {
        type: 'object',
        additionalProperties: false,
        properties: {
          types: {
            ...ARRAY_DEFAULT_OPTIONS,
            description:
              'This is used to exclude types with names that match one of the specified values.',
          },
          suffixes: {
            ...ARRAY_DEFAULT_OPTIONS,
            description:
              'This is used to exclude types with names with suffixes that match one of the specified values.',
          },
        },
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Requires output types to have one unique identifier unless they do not have a logical one. Exceptions can be used to ignore output types that do not have unique identifiers.',
      category: 'Schema',
      recommended: true,
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          usage: [
            {
              acceptedIdNames: ['id', '_id'],
              acceptedIdTypes: ['ID'],
              exceptions: { suffixes: ['Payload'] },
            },
          ],
          code: /* GraphQL */ `
            # Incorrect field name
            type InvalidFieldName {
              key: ID!
            }

            # Incorrect field type
            type InvalidFieldType {
              id: String!
            }

            # Incorrect exception suffix
            type InvalidSuffixResult {
              data: String!
            }

            # Too many unique identifiers. Must only contain one.
            type InvalidFieldName {
              id: ID!
              _id: ID!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [
            {
              acceptedIdNames: ['id', '_id'],
              acceptedIdTypes: ['ID'],
              exceptions: { types: ['Error'], suffixes: ['Payload'] },
            },
          ],
          code: /* GraphQL */ `
            type User {
              id: ID!
            }

            type Post {
              _id: ID!
            }

            type CreateUserPayload {
              data: String!
            }

            type Error {
              message: String!
            }
          `,
        },
      ],
    },
    schema,
  },
  create(context) {
    const options = {
      acceptedIdNames: ['id'],
      acceptedIdTypes: ['ID'],
      exceptions: {},
      ...context.options[0],
    };

    const schema = requireGraphQLSchemaFromContext(context);
    if (!schema) return {};
    const rootTypeNames = [
      schema.getQueryType(),
      schema.getMutationType(),
      schema.getSubscriptionType(),
    ]
      .filter(truthy)
      .map(type => type.name);
    const selector = `ObjectTypeDefinition[name.value!=/^(${rootTypeNames.join('|')})$/]`;

    return {
      [selector](node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) {
        const typeName = node.name.value;

        const shouldIgnoreNode =
          options.exceptions.types?.includes(typeName) ||
          options.exceptions.suffixes?.some(suffix => typeName.endsWith(suffix));

        if (shouldIgnoreNode) {
          return;
        }

        const validIds = node.fields?.filter(field => {
          const fieldNode = field.rawNode();
          const isValidIdName = options.acceptedIdNames.includes(fieldNode.name.value);

          // To be a valid type, it must be non-null and one of the accepted types.
          let isValidIdType = false;
          if (
            fieldNode.type.kind === Kind.NON_NULL_TYPE &&
            fieldNode.type.type.kind === Kind.NAMED_TYPE
          ) {
            isValidIdType = options.acceptedIdTypes.includes(fieldNode.type.type.name.value);
          }

          return isValidIdName && isValidIdType;
        });

        // Usually, there should be only one unique identifier field per type.
        // Some clients allow multiple fields to be used. If more people need this,
        // we can extend this rule later.
        if (validIds?.length !== 1) {
          const pluralNamesSuffix = options.acceptedIdNames.length > 1 ? 's' : '';
          const pluralTypesSuffix = options.acceptedIdTypes.length > 1 ? 's' : '';
          context.report({
            node: node.name,
            message: `${typeName} must have exactly one non-nullable unique identifier. Accepted name${pluralNamesSuffix}: ${englishJoinWords(
              options.acceptedIdNames,
            )}. Accepted type${pluralTypesSuffix}: ${englishJoinWords(options.acceptedIdTypes)}.`,
          });
        }
      },
    };
  },
};
