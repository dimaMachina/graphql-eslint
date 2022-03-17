import { NameNode } from 'graphql';
import { ARRAY_DEFAULT_OPTIONS, requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const ROOT_TYPES: ('mutation' | 'subscription')[] = ['mutation', 'subscription'];

type NoRootTypeConfig = { disallow: typeof ROOT_TYPES };

const rule: GraphQLESLintRule<[NoRootTypeConfig]> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description: 'Disallow using root types `mutation` and/or `subscription`.',
      url: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-root-type.md',
      requiresSchema: true,
      isDisabledForAllConfig: true,
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
    },
    schema: {
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
              enum: ROOT_TYPES,
            },
          },
        },
      },
    },
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext('no-root-type', context);
    const disallow = new Set(context.options[0].disallow);

    const rootTypeNames = [
      disallow.has('mutation') && schema.getMutationType(),
      disallow.has('subscription') && schema.getSubscriptionType(),
    ]
      .filter(Boolean)
      .map(type => type.name);

    if (rootTypeNames.length === 0) {
      return {};
    }

    const selector = [
      `:matches(ObjectTypeDefinition, ObjectTypeExtension)`,
      '>',
      `Name[value=/^(${rootTypeNames.join('|')})$/]`,
    ].join(' ');

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

export default rule;
