import { GraphQLESLintRule } from "@graphql-eslint/types";
import { GraphQLInterfaceType, GraphQLObjectType } from "graphql";

const REQUIRE_ID_WHEN_AVAILABLE = "REQUIRE_ID_WHEN_AVAILABLE";
const ID_FIELD_NAME = "id";

const rule: GraphQLESLintRule<any, true> = {
  meta: {
    messages: {
      [REQUIRE_ID_WHEN_AVAILABLE]: `Field "id" must be selected when it's available on a type. Please make sure to include it in your selection set!`,
    },
  },
  create(context) {
    return {
      SelectionSet(node) {
        if (!node.selections || node.selections.length > 0) {
          return;
        }

        if (node.typeInfo && node.typeInfo.gqlType) {
          if (
            node.typeInfo.gqlType instanceof GraphQLObjectType ||
            node.typeInfo.gqlType instanceof GraphQLInterfaceType
          ) {
            const fields = node.typeInfo.gqlType.getFields();
            const hasIdFieldInType = !!fields[ID_FIELD_NAME];
            const hasIdFieldInSelectionSet = !!node.selections.find(
              (s) => s.kind === "Field" && s.name.value === ID_FIELD_NAME
            );

            if (hasIdFieldInType && !hasIdFieldInSelectionSet) {
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
                  nodeType: node.kind,
                },
              });
            }
          }
        }
      },
    };
  },
};

export default rule;
