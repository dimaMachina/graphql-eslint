import { Kind, NameNode } from 'graphql';
import { getLocation, requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const ROOT_TYPES: ('query' | 'mutation' | 'subscription')[] = ['query', 'mutation', 'subscription'];

type NoRootTypeConfig = { disallow: typeof ROOT_TYPES };

const rule: GraphQLESLintRule<[NoRootTypeConfig]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Schema',
      description: 'Disallow using root types for `read-only` or `write-only` schemas.',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-root-type.md',
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect (`read-only` schema)',
          usage: [{ disallow: ['mutation', 'subscription'] }],
          code: /* GraphQL */ `
            type Mutation {
              createUser(input: CreateUserInput!): User!
            }
          `,
        },
        {
          title: 'Incorrect (`write-only` schema)',
          usage: [{ disallow: ['query'] }],
          code: /* GraphQL */ `
            type Query {
              users: [User!]!
            }
          `,
        },
        {
          title: 'Correct (`read-only` schema)',
          usage: [{ disallow: ['mutation', 'subscription'] }],
          code: /* GraphQL */ `
            type Query {
              users: [User!]!
            }
          `,
        },
      ],
      configOptions: {
        schema: [{ disallow: ['subscription'] }]
      },
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
            type: 'array',
            uniqueItems: true,
            minItems: 1,
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
      disallow.has('query') && schema.getQueryType(),
      disallow.has('mutation') && schema.getMutationType(),
      disallow.has('subscription') && schema.getSubscriptionType(),
    ]
      .filter(Boolean)
      .map(type => type.name);

    if (rootTypeNames.length === 0) {
      return {};
    }

    const selector = [
      `:matches(${Kind.OBJECT_TYPE_DEFINITION}, ${Kind.OBJECT_TYPE_EXTENSION})`,
      '>',
      `${Kind.NAME}[value=/^(${rootTypeNames.join('|')})$/]`,
    ].join(' ');

    return {
      [selector](node: GraphQLESTreeNode<NameNode>) {
        const typeName = node.value;
        context.report({
          loc: getLocation(node.loc, typeName),
          message: `Root type "${typeName}" is forbidden`,
        });
      },
    };
  },
};

export default rule;
