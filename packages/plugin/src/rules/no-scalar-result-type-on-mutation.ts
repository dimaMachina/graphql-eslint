import { isScalarType, NameNode } from 'graphql';
import { requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const RULE_ID = 'no-scalar-result-type-on-mutation';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description: 'Avoid scalar result type on mutation type to make sure to return a valid state.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type Mutation {
              createUser: Boolean
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Mutation {
              createUser: User!
            }
          `,
        },
      ],
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      return {};
    }
    const selector = [
      `:matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=${mutationType.name}]`,
      '> FieldDefinition > .gqlType Name',
    ].join(' ');

    return {
      [selector](node: GraphQLESTreeNode<NameNode>) {
        const typeName = node.value;
        const graphQLType = schema.getType(typeName);
        if (isScalarType(graphQLType)) {
          context.report({
            node,
            message: `Unexpected scalar result type \`${typeName}\`.`,
            suggest: [
              {
                desc: `Remove \`${typeName}\``,
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
