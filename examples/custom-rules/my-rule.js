// @ts-check

/** @type {import("@graphql-eslint/eslint-plugin").GraphQLESLintRule} */
export const rule = {
  meta: {
    schema: []
  },
  create(context) {
    return {
      OperationDefinition(node) {
        if (!node.name?.value) {
          context.report({
            node,
            message: 'Oops, name is required!',
          });
        }
      },
    };
  },
};
