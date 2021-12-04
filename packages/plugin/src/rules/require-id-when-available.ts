import { getLocation, requireGraphQLSchemaFromContext, requireSiblingsOperations } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLInterfaceType, GraphQLObjectType, Kind, SelectionNode } from 'graphql';
import { getBaseType, GraphQLESTreeNode } from '../estree-parser';

const REQUIRE_ID_WHEN_AVAILABLE = 'REQUIRE_ID_WHEN_AVAILABLE';
const DEFAULT_ID_FIELD_NAME = 'id';

type RequireIdWhenAvailableRuleConfig = { fieldName: string };

const rule: GraphQLESLintRule<[RequireIdWhenAvailableRuleConfig], true> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: 'Enforce selecting specific fields when they are available on the GraphQL type.',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-id-when-available.md',
      requiresSchema: true,
      requiresSiblings: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # In your schema
            type User {
              id: ID!
              name: String!
            }

            # Query
            query user {
              user {
                name
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
              name: String!
            }

            # Query
            query user {
              user {
                id
                name
              }
            }
          `,
        },
      ],
      recommended: true,
    },
    messages: {
      [REQUIRE_ID_WHEN_AVAILABLE]: [
        `Field {{ fieldName }} must be selected when it's available on a type. Please make sure to include it in your selection set!`,
        `If you are using fragments, make sure that all used fragments {{ checkedFragments }}specifies the field {{ fieldName }}.`,
      ].join('\n'),
    },
    schema: {
      definitions: {
        asString: {
          type: 'string',
        },
        asArray: {
          type: 'array',
          minItems: 1,
          uniqueItems: true,
        },
      },
      type: 'array',
      maxItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          fieldName: {
            oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asArray' }],
            default: DEFAULT_ID_FIELD_NAME,
          },
        },
      },
    },
  },
  create(context) {
    requireGraphQLSchemaFromContext('require-id-when-available', context);
    const siblings = requireSiblingsOperations('require-id-when-available', context);
    const { fieldName = DEFAULT_ID_FIELD_NAME } = context.options[0] || {};
    const idNames = Array.isArray(fieldName) ? fieldName : [fieldName];

    const isFound = (s: GraphQLESTreeNode<SelectionNode> | SelectionNode) =>
      s.kind === Kind.FIELD && idNames.includes(s.name.value);

    return {
      SelectionSet(node) {
        const typeInfo = node.typeInfo();
        if (!typeInfo.gqlType) {
          return;
        }

        const rawType = getBaseType(typeInfo.gqlType);
        const isObjectType = rawType instanceof GraphQLObjectType;
        const isInterfaceType = rawType instanceof GraphQLInterfaceType;
        if (!isObjectType && !isInterfaceType) {
          return;
        }

        const fields = rawType.getFields();
        const hasIdFieldInType = idNames.some(name => fields[name]);
        if (!hasIdFieldInType) {
          return;
        }

        const checkedFragmentSpreads = new Set<string>();
        let found = false;

        for (const selection of node.selections) {
          if (isFound(selection)) {
            found = true;
          } else if (selection.kind === Kind.INLINE_FRAGMENT) {
            found = selection.selectionSet?.selections.some(s => isFound(s));
          } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
            const [foundSpread] = siblings.getFragment(selection.name.value);

            if (foundSpread) {
              checkedFragmentSpreads.add(foundSpread.document.name.value);
              found = foundSpread.document.selectionSet?.selections.some(s => isFound(s));
            }
          }

          if (found) {
            break;
          }
        }

        const { parent } = node as any;
        const hasIdFieldInInterfaceSelectionSet =
          parent &&
          parent.kind === Kind.INLINE_FRAGMENT &&
          parent.parent &&
          parent.parent.kind === Kind.SELECTION_SET &&
          parent.parent.selections.some(s => isFound(s));

        if (!found && !hasIdFieldInInterfaceSelectionSet) {
          context.report({
            loc: getLocation(node.loc),
            messageId: REQUIRE_ID_WHEN_AVAILABLE,
            data: {
              checkedFragments: checkedFragmentSpreads.size === 0 ? '' : `(${[...checkedFragmentSpreads].join(', ')}) `,
              fieldName: idNames.map(name => `"${name}"`).join(' or '),
            },
          });
        }
      },
    };
  },
};

export default rule;
