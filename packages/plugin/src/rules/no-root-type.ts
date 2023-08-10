import { NameNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { ARRAY_DEFAULT_OPTIONS, requireGraphQLSchemaFromContext, truthy } from '../utils.js';

const schema = {
  type: 'array',
  minItems: 1,
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    required: ['disallow'],
    properties: {
      disallow: {
        ...ARRAY_DEFAULT_OPTIONS,
        items: {
          enum: ['mutation', 'subscription'],
        },
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description: 'Disallow using root types `mutation` and/or `subscription`.',
      url: 'https://the-guild.dev/graphql/eslint/rules/no-root-type',
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          usage: [{ disallow: ['mutation', 'subscription'] }],
          code: /* GraphQL */ `
            type Mutation {
              createUser(input: CreateUserInput!): User!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ disallow: ['mutation', 'subscription'] }],
          code: /* GraphQL */ `
            type Query {
              users: [User!]!
            }
          `,
        },
      ],
      configOptions: [{ disallow: ['mutation', 'subscription'] }],
    },
    schema,
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext('no-root-type', context);
    const disallow = new Set(context.options[0].disallow);

    const rootTypeNames = [
      disallow.has('mutation') && schema.getMutationType(),
      disallow.has('subscription') && schema.getSubscriptionType(),
    ]
      .filter(truthy)
      .map(type => type.name)
      .join('|');

    if (!rootTypeNames) {
      return {};
    }

    const selector = `:matches(ObjectTypeDefinition, ObjectTypeExtension) > .name[value=/^(${rootTypeNames})$/]`;

    return {
      [selector](node: GraphQLESTreeNode<NameNode>) {
        const typeName = node.value;
        context.report({
          node,
          message: `Root type \`${typeName}\` is forbidden.`,
          suggest: [
            {
              desc: `Remove \`${typeName}\` type`,
              fix: fixer => fixer.remove(node.parent as any),
            },
          ],
        });
      },
    };
  },
};
