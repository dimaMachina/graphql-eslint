import { GraphQLESLintRule } from '../types';
import { requireUsedFieldsFromContext } from '../utils';

const UNUSED_FIELD = 'UNUSED_FIELD';
const RULE_NAME = 'no-unused-fields';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [UNUSED_FIELD]: `Field "{{fieldName}}" is unused`,
    },
    docs: {
      description: `Requires all fields to be used at some level by siblings operations.`,
      category: 'Best Practices',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_NAME}.md`,
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
    fixable: 'code',
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    const usedFields = requireUsedFieldsFromContext(RULE_NAME, context);

    return {
      FieldDefinition(node) {
        const fieldName = node.name.value;
        const parentTypeName = (node as any).parent.name.value;
        const isUsed = usedFields[parentTypeName]?.has(fieldName);

        if (isUsed) {
          return;
        }

        context.report({
          node,
          messageId: UNUSED_FIELD,
          data: { fieldName },
          fix(fixer) {
            const sourceCode = context.getSourceCode();
            const tokenBefore = (sourceCode as any).getTokenBefore(node);
            const tokenAfter = (sourceCode as any).getTokenAfter(node);
            const isEmptyType = tokenBefore.type === '{' && tokenAfter.type === '}';

            if (isEmptyType) {
              // Remove type
              const { parent } = node as any;
              const parentBeforeToken = sourceCode.getTokenBefore(parent);
              return parentBeforeToken
                ? fixer.removeRange([parentBeforeToken.range[1], parent.range[1]])
                : fixer.remove(parent);
            }

            // Remove whitespace before token
            return fixer.removeRange([tokenBefore.range[1], node.range[1]]);
          },
        });
      },
    };
  },
};

export default rule;
