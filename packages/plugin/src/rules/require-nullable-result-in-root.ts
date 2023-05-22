import { Kind, ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { requireGraphQLSchemaFromContext, truthy } from '../utils.js';

const RULE_ID = 'no-non-null-in-root';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description: 'Require nullable fields in root query.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: `type Query {
            user: User!
          }
          type User {
            id: ID!
          }`,
        },
        {
          title: 'Correct',
          code: `type Query {
            user: User
          }
          type User {
            id: ID!
          }`,
        },
      ],
    },
    messages: {
      [RULE_ID]: 'Non-null types are not allowed in root',
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const rootTypeNames = [
      schema.getQueryType(),
      schema.getMutationType(),
      schema.getSubscriptionType(),
    ]
      .filter(truthy)
      .map(type => type.name);
    const selector = `ObjectTypeDefinition[name.value=/^(${rootTypeNames.join('|')})$/]`;

    return {
      [selector](node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) {
        const nonNullFields =
          node.fields?.filter(field => {
            return field.gqlType.type === Kind.NON_NULL_TYPE;
          }) || [];

        for (const field of nonNullFields) {
          const sourceCode = context.getSourceCode();
          const typeSource = sourceCode.getText(field.gqlType as any);
          context.report({
            node: field.gqlType,
            messageId: RULE_ID,
            suggest: [
              {
                desc: `Make \`${field.name.value}\` nullable`,
                fix(fixer) {
                  // Cast should succeed here because it only cares about the range
                  return fixer.replaceText(field.gqlType as any, typeSource.replace('!', ''));
                },
              },
            ],
          });
        }
      },
    };
  },
};
