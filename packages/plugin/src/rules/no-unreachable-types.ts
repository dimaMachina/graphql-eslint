import { Kind } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { getLocation, requireReachableTypesFromContext } from '../utils';

const UNREACHABLE_TYPE = 'UNREACHABLE_TYPE';
const RULE_NAME = 'no-unreachable-types';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [UNREACHABLE_TYPE]: 'Type "{{ typeName }}" is unreachable',
    },
    docs: {
      description: `Requires all types to be reachable at some level by root level fields.`,
      category: 'Schema',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_NAME}.md`,
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
      recommended: true,
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    const reachableTypes = requireReachableTypesFromContext(RULE_NAME, context);

    function ensureReachability(node): void {
      const typeName = node.name.value;

      if (!reachableTypes.has(typeName)) {
        context.report({
          loc: getLocation(node.name.loc, typeName, { offsetStart: node.kind === Kind.DIRECTIVE_DEFINITION ? 2 : 1 }),
          messageId: UNREACHABLE_TYPE,
          data: { typeName },
          fix: fixer => fixer.remove(node),
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
