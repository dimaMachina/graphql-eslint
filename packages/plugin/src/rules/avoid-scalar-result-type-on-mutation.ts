import { Kind, FieldDefinitionNode, isScalarType } from 'graphql';
import { getLocation, requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: 'Avoid scalar result type on mutation type to make sure to return a valid state.',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/avoid-scalar-result-type-on-mutation.md',
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
    const schema = requireGraphQLSchemaFromContext('avoid-scalar-result-type-on-mutation', context);
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      return {};
    }
    const selector = [
      `:matches(${Kind.OBJECT_TYPE_DEFINITION}, ${Kind.OBJECT_TYPE_EXTENSION})[name.value=${mutationType.name}]`,
      '>',
      Kind.FIELD_DEFINITION,
      Kind.NAMED_TYPE,
    ].join(' ');

    return {
      [selector](node: GraphQLESTreeNode<FieldDefinitionNode>) {
        const typeName = node.name.value;
        const graphQLType = schema.getType(typeName);
        if (isScalarType(graphQLType)) {
          context.report({
            loc: getLocation(node.loc, typeName),
            message: `Unexpected scalar result type "${typeName}"`,
          });
        }
      },
    };
  },
};

export default rule;
