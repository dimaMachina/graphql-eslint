import { Kind, ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESLintRule } from '../types.js';
import { getNodeName, requireGraphQLSchemaFromContext, truthy } from '../utils.js';
import { GraphQLESTreeNode } from '../estree-converter';

const RULE_ID = 'require-nullable-result-in-root';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description: 'Require nullable fields in root types.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type Query {
              user: User!
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Query {
              foo: User
              baz: [User]!
              bar: [User!]!
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: 'Unexpected non-null result {{ resultType }} in {{ rootType }}',
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const rootTypeNames = new Set(
      [schema.getQueryType(), schema.getMutationType(), schema.getSubscriptionType()]
        .filter(truthy)
        .map(type => type.name),
    );
    const sourceCode = context.getSourceCode();

    return {
      'ObjectTypeDefinition,ObjectTypeExtension'(
        node: GraphQLESTreeNode<ObjectTypeDefinitionNode>,
      ) {
        if (!rootTypeNames.has(node.name.value)) return;
        for (const field of node.fields || []) {
          if (field.gqlType.type !== Kind.NON_NULL_TYPE) return;
          const resultType = schema.getType((field.gqlType.gqlType as any).name.value);
          context.report({
            node: field.gqlType,
            messageId: RULE_ID,
            data: {
              resultType: resultType ? getNodeName(resultType.astNode as any) : '',
              rootType: getNodeName(node),
            },
            suggest: [
              {
                desc: `Make \`${field.name.value}\` nullable`,
                // Cast should succeed here because it only cares about the range
                fix(fixer) {
                  const text = sourceCode.getText(field.gqlType as any);

                  return fixer.replaceText(field.gqlType as any, text.replace('!', ''));
                },
              },
            ],
          });
        }
      },
    };
  },
};
