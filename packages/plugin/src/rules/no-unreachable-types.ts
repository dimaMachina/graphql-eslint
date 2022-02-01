import { ASTKindToNode, Kind } from 'graphql';
import { GraphQLESLintRule, ValueOf } from '../types';
import { requireReachableTypesFromContext } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';

const UNREACHABLE_TYPE = 'UNREACHABLE_TYPE';
const RULE_ID = 'no-unreachable-types';

const KINDS = [
  Kind.DIRECTIVE_DEFINITION,
  Kind.OBJECT_TYPE_DEFINITION,
  Kind.OBJECT_TYPE_EXTENSION,
  Kind.INTERFACE_TYPE_DEFINITION,
  Kind.INTERFACE_TYPE_EXTENSION,
  Kind.SCALAR_TYPE_DEFINITION,
  Kind.SCALAR_TYPE_EXTENSION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_EXTENSION,
  Kind.UNION_TYPE_DEFINITION,
  Kind.UNION_TYPE_EXTENSION,
  Kind.ENUM_TYPE_DEFINITION,
  Kind.ENUM_TYPE_EXTENSION,
] as const;

type AllowedKind = typeof KINDS[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [UNREACHABLE_TYPE]: 'Type "{{ typeName }}" is unreachable',
    },
    docs: {
      description: `Requires all types to be reachable at some level by root level fields.`,
      category: 'Schema',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
    type: 'suggestion',
    schema: [],
    hasSuggestions: true,
  },
  create(context) {
    const reachableTypes = requireReachableTypesFromContext(RULE_ID, context);
    const selector = KINDS.join(',');

    return {
      [selector](node: GraphQLESTreeNode<ValueOf<AllowedKindToNode>>) {
        const typeName = node.name.value;

        if (!reachableTypes.has(typeName)) {
          context.report({
            node: node.name,
            messageId: UNREACHABLE_TYPE,
            data: { typeName },
            suggest: [
              {
                desc: `Remove ${typeName}`,
                fix: fixer => fixer.remove(node as any),
              },
            ],
          });
        }
      },
    };
  },
};

export default rule;
