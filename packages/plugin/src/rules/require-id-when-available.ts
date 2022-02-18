import { requireGraphQLSchemaFromContext, requireSiblingsOperations } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLInterfaceType, GraphQLObjectType, Kind, SelectionSetNode } from 'graphql';
import { asArray } from '@graphql-tools/utils';
import { getBaseType, GraphQLESTreeNode } from '../estree-parser';

export type RequireIdWhenAvailableRuleConfig = { fieldName: string | string[] };

const RULE_ID = 'require-id-when-available';
const DEFAULT_ID_FIELD_NAME = 'id';

declare namespace Intl {
  class ListFormat {
    constructor(locales: string, options: any);

    public format: (items: [string]) => string;
  }
}

const englishJoinWords = words => new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);

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
      [RULE_ID]: `Field{{ pluralSuffix }} {{ fieldName }} must be selected when it's available on a type.\nInclude it in your selection set{{ addition }}.`,
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

    // Check selections only in OperationDefinition,
    // skip selections of OperationDefinition and InlineFragment
    const selector = 'OperationDefinition SelectionSet[parent.kind!=/(^OperationDefinition|InlineFragment)$/]';

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

        function checkSelections(selections): boolean {
          let hasIdField = false;
          for (const selection of selections) {
            if (hasIdField) {
              return true;
            }

            if (selection.kind === Kind.FIELD) {
              hasIdField = idNames.includes(selection.name.value);
              continue;
            }

            if (selection.kind === Kind.FRAGMENT_SPREAD) {
              const [foundSpread] = siblings.getFragment(selection.name.value);
              if (foundSpread) {
                const fragmentSpread = foundSpread.document;
                checkedFragmentSpreads.add(fragmentSpread.name.value);
                hasIdField = checkSelections(fragmentSpread.selectionSet.selections);
              }
              continue;
            }

            if (selection.kind === Kind.INLINE_FRAGMENT) {
              hasIdField = checkSelections(selection.selectionSet.selections);
            }
          }
          return hasIdField;
        }

        const idFound = checkSelections(node.selections);
        if (idFound) {
          return;
        }

        const pluralSuffix = idNames.length > 1 ? 's' : '';
        const fieldName = englishJoinWords(idNames.map(name => `\`${name}\``));
        const addition =
          checkedFragmentSpreads.size === 0
            ? ''
            : ` or add to used fragment${checkedFragmentSpreads.size > 1 ? 's' : ''} ${englishJoinWords(
                [...checkedFragmentSpreads].map(name => `\`${name}\``)
              )}`;

        context.report({
          loc: node.loc.start,
          messageId: RULE_ID,
          data: {
            pluralSuffix,
            fieldName,
            addition,
          },
        });
      },
    };
  },
};

export default rule;
