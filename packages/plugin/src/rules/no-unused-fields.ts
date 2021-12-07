import { GraphQLESLintRule } from '../types';
import { getLocation, requireUsedFieldsFromContext } from '../utils';

const UNUSED_FIELD = 'UNUSED_FIELD';
const RULE_ID = 'no-unused-fields';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [UNUSED_FIELD]: `Field "{{fieldName}}" is unused`,
    },
    docs: {
      description: `Requires all fields to be used at some level by siblings operations.`,
      category: 'Schema',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      requiresSiblings: true,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
              someUnusedField: String
            }

            type Query {
              me: User
            }

            query {
              me {
                id
                name
              }
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

            query {
              me {
                id
                name
              }
            }
          `,
        },
      ],
    },
    type: 'suggestion',
    schema: [],
    hasSuggestions: true,
  },
  create(context) {
    const usedFields = requireUsedFieldsFromContext(RULE_ID, context);

    return {
      FieldDefinition(node) {
        const fieldName = node.name.value;
        const parentTypeName = (node as any).parent.name.value;
        const isUsed = usedFields[parentTypeName]?.has(fieldName);

        if (isUsed) {
          return;
        }

        context.report({
          loc: getLocation(node.loc, fieldName),
          messageId: UNUSED_FIELD,
          data: { fieldName },
          suggest: [
            {
              desc: `Remove "${fieldName}" field`,
              fix(fixer) {
                const sourceCode = context.getSourceCode() as any;
                const tokenBefore = sourceCode.getTokenBefore(node);
                const tokenAfter = sourceCode.getTokenAfter(node);
                const isEmptyType = tokenBefore.type === '{' && tokenAfter.type === '}';

                return isEmptyType ? fixer.remove((node as any).parent) : fixer.remove(node as any);
              },
            },
          ],
        });
      },
    };
  },
};

export default rule;
