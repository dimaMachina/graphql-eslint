import { requireGraphQLSchemaFromContext, requireSiblingsOperations } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLInterfaceType, GraphQLObjectType } from 'graphql';
import { getBaseType } from '../estree-parser';

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
      [REQUIRE_ID_WHEN_AVAILABLE]: `Field "{{ fieldName }}" must be selected when it's available on a type. Please make sure to include it in your selection set!\nIf you are using fragments, make sure that all used fragments {{ checkedFragments }} specifies the field "{{ fieldName }}".`,
    },
    schema: {
      type: 'array',
      maxItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          fieldName: {
            type: 'string',
            default: DEFAULT_ID_FIELD_NAME,
          },
        },
      },
    },
  },
  create(context) {
    return {
      SelectionSet(node) {
        requireGraphQLSchemaFromContext('require-id-when-available', context);
        const siblings = requireSiblingsOperations('require-id-when-available', context);

        const fieldName = (context.options[0] || {}).fieldName || DEFAULT_ID_FIELD_NAME;

        if (!node.selections || node.selections.length === 0) {
          return;
        }

        const typeInfo = node.typeInfo();
        if (typeInfo && typeInfo.gqlType) {
          const rawType = getBaseType(typeInfo.gqlType);
          if (rawType instanceof GraphQLObjectType || rawType instanceof GraphQLInterfaceType) {
            const fields = rawType.getFields();
            const hasIdFieldInType = !!fields[fieldName];
            const checkedFragmentSpreads: Set<string> = new Set();

            if (hasIdFieldInType) {
              let found = false;

              for (const selection of node.selections) {
                if (selection.kind === 'Field' && selection.name.value === fieldName) {
                  found = true;
                } else if (selection.kind === 'InlineFragment') {
                  found = (selection.selectionSet?.selections || []).some(
                    s => s.kind === 'Field' && s.name.value === fieldName
                  );
                } else if (selection.kind === 'FragmentSpread') {
                  const foundSpread = siblings.getFragment(selection.name.value);

                  if (foundSpread[0]) {
                    checkedFragmentSpreads.add(foundSpread[0].document.name.value);

                    found = (foundSpread[0].document.selectionSet?.selections || []).some(
                      s => s.kind === 'Field' && s.name.value === fieldName
                    );
                  }
                }

                if (found) {
                  break;
                }
              }

              const { parent } = node as any;
              const hasIdFieldInInterfaceSelectionSet =
                parent &&
                parent.kind === 'InlineFragment' &&
                parent.parent &&
                parent.parent.kind === 'SelectionSet' &&
                parent.parent.selections.some(s => s.kind === 'Field' && s.name.value === fieldName);

              if (!found && !hasIdFieldInInterfaceSelectionSet) {
                context.report({
                  loc: {
                    start: {
                      line: node.loc.start.line,
                      column: node.loc.start.column - 1,
                    },
                    end: {
                      line: node.loc.end.line,
                      column: node.loc.end.column - 1,
                    },
                  },
                  messageId: REQUIRE_ID_WHEN_AVAILABLE,
                  data: {
                    checkedFragments:
                      checkedFragmentSpreads.size === 0 ? '' : `(${Array.from(checkedFragmentSpreads).join(', ')})`,
                    fieldName,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
