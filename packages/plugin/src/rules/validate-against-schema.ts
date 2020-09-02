import { GraphQLESLintRule, requireGraphQLSchemaFromContext, GraphQLESlintRuleContext } from '@graphql-eslint/types';
import { Kind, validate, parse, GraphQLSchema, DocumentNode } from "graphql";

function validateDoc(context: GraphQLESlintRuleContext, schema: GraphQLSchema, documentNode: DocumentNode) {
  if (documentNode && documentNode.definitions && documentNode.definitions.length > 0) {
    const validationErrors = validate(schema, documentNode);

    for (const error of validationErrors) {
      context.report({
        loc: {
          line: error.locations[0].line,
          column: error.locations[0].column,
        },
        message: error.message,
      })
    }
  }
}

const rule: GraphQLESLintRule = {
  meta: {
    type: "problem",
  },
  create(context) {
    return {
      Document() {
        const schema = requireGraphQLSchemaFromContext(context);
        const documentNode = parse(context.getSourceCode().text);
        
        validateDoc(context, schema, {
          kind: Kind.DOCUMENT,
          definitions: documentNode.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION || d.kind === Kind.FRAGMENT_DEFINITION),
        });
      },
    }
  }
}

export default rule;
