import { GraphQLESlintRuleContext } from "./rule";
import { Kind, GraphQLSchema } from 'graphql';
import { GraphQLESTree } from "./estree-ast"; 

export function requireGraphQLSchemaFromContext(
  context: GraphQLESlintRuleContext
): GraphQLSchema {
  if (!context || !context.parserServices) {
    throw new Error(`'You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.schema" property for "@typescript-graphql/parser", or use graphql-config!`)
  }

  if (!context.parserServices.hasTypeInfo) {
    throw new Error(`Found "parserServices" generated, but unable to load your GraphQL schema and it's type-info!`)
  }

  return context.parserServices.schema;
}

export default function keyValMap<T, V>(
  list: ReadonlyArray<T>,
  keyFn: (item: T) => string,
  valFn: (item: T) => V,
): Record<string, V> {
  return list.reduce((map, item) => {
    map[keyFn(item)] = valFn(item);
    return map;
  }, Object.create(null));
}

export function valueFromNode(
  valueNode: GraphQLESTree.ValueNode,
  variables?: Record<string, any>,
): any {
  switch (valueNode.type) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map((node) =>
        valueFromNode(node, variables),
      );
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromNode(field.value, variables),
      );
    case Kind.VARIABLE:
      return variables?.[valueNode.name.value];
  }
}