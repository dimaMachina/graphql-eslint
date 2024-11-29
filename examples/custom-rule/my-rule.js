export const rule = {
  create(context) {
    return {
      OperationDefinition(node) {
        if (!node.name?.value) {
          context.report({
            node,
            message: 'Oops, name is required!'
          })
        }
      }
    }
  }
}
