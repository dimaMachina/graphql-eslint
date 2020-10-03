import { requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLInterfaceType, GraphQLObjectType } from 'graphql';
import { getBaseType } from '../estree-parser';

const REQUIRE_ID_WHEN_AVAILABLE = 'REQUIRE_ID_WHEN_AVAILABLE';
const DEFAULT_ID_FIELD_NAME = 'id';

type RequireIdWhenAvailableRuleConfig = [{ fieldName: string }];

const rule: GraphQLESLintRule<RequireIdWhenAvailableRuleConfig, true> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: `This rule allow you to enforce selecting specific fields when they are available on the GraphQL type.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-id-when-available.md`,
    },
    messages: {
      [REQUIRE_ID_WHEN_AVAILABLE]: `Field "{{ fieldName }}" must be selected when it's available on a type. Please make sure to include it in your selection set!`,
    },
    schema: {
      type: 'array',
      additionalItems: false,
      minItems: 0,
      maxItems: 1,
      items: {
        type: 'object',
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
        requireGraphQLSchemaFromContext(context);

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

            if (hasIdFieldInType) {
              const hasIdFieldInSelectionSet = !!node.selections.find(
                s => s.kind === 'Field' && s.name.value === fieldName
              );

              if (!hasIdFieldInSelectionSet) {
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
