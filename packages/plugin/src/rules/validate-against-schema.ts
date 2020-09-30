import { Kind, validate, GraphQLSchema, DocumentNode } from "graphql";
import { GraphQLESTreeNode } from "../estree-parser";
import { GraphQLESLintRule, GraphQLESlintRuleContext } from "../types";
import { requireGraphQLSchemaFromContext } from "../utils";

function validateDoc(
  context: GraphQLESlintRuleContext,
  schema: GraphQLSchema,
  documentNode: DocumentNode
) {
  if (
    documentNode &&
    documentNode.definitions &&
    documentNode.definitions.length > 0
  ) {
    const validationErrors = validate(schema, documentNode);

    for (const error of validationErrors) {
      const node = (error.nodes[0] as any) as GraphQLESTreeNode<
        typeof error.nodes[0]
      >;

      context.report({
        loc: node.loc,
        message: error.message,
      });
    }
  }
}

const rule: GraphQLESLintRule = {
  meta: {
    type: "problem",
  },
  create(context) {
    return {
      OperationDefinition(node) {
        const schema = requireGraphQLSchemaFromContext(context);

        validateDoc(context, schema, {
          kind: Kind.DOCUMENT,
          definitions: [node.rawNode()],
        });
      },
      FragmentDefinition(node) {
        const schema = requireGraphQLSchemaFromContext(context);

        validateDoc(context, schema, {
          kind: Kind.DOCUMENT,
          definitions: [node.rawNode()],
        });
      },
    };
  },
};

export default rule;
