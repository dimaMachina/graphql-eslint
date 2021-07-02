import { GraphQLESLintRule } from '../types';
import { requireReachableTypesFromContext } from '../utils';

const UNREACHABLE_TYPE = 'UNREACHABLE_TYPE';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [UNREACHABLE_TYPE]: `Type "{{ typeName }}" is unreachable`,
    },
    docs: {
      description: `Requires all types to be reachable at some level by root level fields.`,
      category: 'Best Practices',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-unreachable-types.md`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
            }

            type Query {
              me: String
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
            }

            type Query {
              me: User
            }
          `,
        },
      ],
    },
    fixable: 'code',
    type: 'suggestion',
  },
  create(context) {
    function ensureReachability(node) {
      const typeName = node.name.value;
      const reachableTypes = requireReachableTypesFromContext('no-unreachable-types', context);

      if (!reachableTypes.has(typeName)) {
        context.report({
          node,
          messageId: UNREACHABLE_TYPE,
          data: {
            typeName,
          },
          fix: fixer => fixer.removeRange(node.range),
        });
      }
    }

    return {
      DirectiveDefinition: ensureReachability,
      ObjectTypeDefinition: ensureReachability,
      ObjectTypeExtension: ensureReachability,
      InterfaceTypeDefinition: ensureReachability,
      InterfaceTypeExtension: ensureReachability,
      ScalarTypeDefinition: ensureReachability,
      ScalarTypeExtension: ensureReachability,
      InputObjectTypeDefinition: ensureReachability,
      InputObjectTypeExtension: ensureReachability,
      UnionTypeDefinition: ensureReachability,
      UnionTypeExtension: ensureReachability,
      EnumTypeDefinition: ensureReachability,
      EnumTypeExtension: ensureReachability,
    };
  },
};

export default rule;
