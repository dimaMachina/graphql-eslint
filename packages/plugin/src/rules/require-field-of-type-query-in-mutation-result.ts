import { Kind, FieldDefinitionNode, isObjectType } from 'graphql';
import { requireGraphQLSchemaFromContext, getTypeName } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const RULE_NAME = 'require-field-of-type-query-in-mutation-result';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Allow the client in one round-trip not only to call mutation but also to get a wagon of data to update their application.\n> Currently, no errors are reported for result type `union`, `interface` and `scalar`.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_NAME}.md`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User { ... }

            type Mutation {
              createUser: User!
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User { ... }

            type Query { ... }

            type CreateUserPayload {
              user: User!
              query: Query!
            }

            type Mutation {
              createUser: CreateUserPayload!
            }
          `,
        },
      ],
    },
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_NAME, context);
    const mutationType = schema.getMutationType();
    const queryType = schema.getQueryType();

    if (!mutationType || !queryType) {
      return {};
    }
    const selector = `:matches(${Kind.OBJECT_TYPE_DEFINITION}, ${Kind.OBJECT_TYPE_EXTENSION})[name.value=${mutationType.name}] > ${Kind.FIELD_DEFINITION}`;

    return {
      [selector](node: GraphQLESTreeNode<FieldDefinitionNode>) {
        const rawNode = node.rawNode();
        const typeName = getTypeName(rawNode);
        const graphQLType = schema.getType(typeName);

        if (isObjectType(graphQLType)) {
          const { fields } = graphQLType.astNode;
          const hasQueryType = fields.some(field => getTypeName(field) === queryType.name);
          if (!hasQueryType) {
            context.report({
              node,
              message: `Mutation result type "${graphQLType.name}" must contain field of type "${queryType.name}".`,
            });
          }
        }
      },
    };
  },
};

export default rule;
