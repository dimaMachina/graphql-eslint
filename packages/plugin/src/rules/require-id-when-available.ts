import { getLocation, requireGraphQLSchemaFromContext, requireSiblingsOperations } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLInterfaceType, GraphQLObjectType, Kind, SelectionNode, SelectionSetNode } from 'graphql';
import { asArray } from '@graphql-tools/utils';
import { getBaseType, GraphQLESTreeNode } from '../estree-parser';

export type RequireIdWhenAvailableRuleConfig = { fieldName: string | string[] };

const RULE_ID = 'require-id-when-available';
const MESSAGE_ID = 'REQUIRE_ID_WHEN_AVAILABLE';
const DEFAULT_ID_FIELD_NAME = 'id';

const rule: GraphQLESLintRule<[RequireIdWhenAvailableRuleConfig], true> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: 'Enforce selecting specific fields when they are available on the GraphQL type.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
            query {
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
            query {
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
      [MESSAGE_ID]: [
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
    requireGraphQLSchemaFromContext(RULE_ID, context);
    const siblings = requireSiblingsOperations(RULE_ID, context);
    const { fieldName = DEFAULT_ID_FIELD_NAME } = context.options[0] || {};
    const idNames = asArray(fieldName);

    const isFound = (s: GraphQLESTreeNode<SelectionNode> | SelectionNode) =>
      s.kind === Kind.FIELD && idNames.includes(s.name.value);

    // Skip check selections in FragmentDefinition
    const selector = 'OperationDefinition SelectionSet[parent.kind!=OperationDefinition]';

    return {
      [selector](node: GraphQLESTreeNode<SelectionSetNode, true>) {
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

        for (const selection of node.selections) {
          if (isFound(selection)) {
            return;
          }
          if (selection.kind === Kind.INLINE_FRAGMENT && selection.selectionSet.selections.some(isFound)) {
            return;
          }
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            const [foundSpread] = siblings.getFragment(selection.name.value);
            if (foundSpread) {
              checkedFragmentSpreads.add(foundSpread.document.name.value);
              if (foundSpread.document.selectionSet.selections.some(isFound)) {
                return;
              }
            }
          }
        }

        const { parent } = node as any;
        const hasIdFieldInInterfaceSelectionSet =
          parent?.kind === Kind.INLINE_FRAGMENT &&
          parent.parent?.kind === Kind.SELECTION_SET &&
          parent.parent.selections.some(isFound);
        if (hasIdFieldInInterfaceSelectionSet) {
          return;
        }

        context.report({
          loc: getLocation(node.loc),
          messageId: MESSAGE_ID,
          data: {
            checkedFragments: checkedFragmentSpreads.size === 0 ? '' : `(${[...checkedFragmentSpreads].join(', ')}) `,
            fieldName: idNames.map(name => `"${name}"`).join(' or '),
          },
        });
      },
    };
  },
};

export default rule;
