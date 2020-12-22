import {
  GraphQLSchema,
  GraphQLFieldMap,
  GraphQLInputFieldMap,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLNamedType,
  GraphQLInterfaceType,
  GraphQLArgument,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isInputObjectType,
  isListType,
  isNonNullType,
} from 'graphql';

export function getReachableTypes(schema: GraphQLSchema): Set<string>
export function getReachableTypes(schema?: GraphQLSchema): Set<string> | null {
  if (schema) {
    return collectReachableTypes(schema);
  }
  
  return null;
}

export function collectReachableTypes(schema: GraphQLSchema): Set<string> {
  const reachableTypes = new Set<string>();

  collectFrom(schema.getQueryType());
  collectFrom(schema.getMutationType());
  collectFrom(schema.getSubscriptionType());

  return reachableTypes;

  function collectFrom(type?: GraphQLNamedType): void {
    if (type && shouldCollect(type.name)) {
      if (isObjectType(type) || isInterfaceType(type)) {
        collectFromFieldMap(type.getFields());
        collectFromInterfaces(type.getInterfaces());
      } else if (isUnionType(type)) {
        type.getTypes().forEach(collectFrom);
      } else if (isInputObjectType(type)) {
        collectFromInputFieldMap(type.getFields());
      }
    }
  }

  function collectFromFieldMap(fieldMap: GraphQLFieldMap<any, any>): void {
    for (const fieldName in fieldMap) {
      collectFromField(fieldMap[fieldName]);
    }
  }

  function collectFromField(field: GraphQLField<any, any>): void {
    collectFromOutputType(field.type);
    field.args.forEach(collectFromArgument);
  }

  function collectFromArgument(arg: GraphQLArgument): void {
    collectFromInputType(arg.type);
  }

  function collectFromInputFieldMap(fieldMap: GraphQLInputFieldMap): void {
    for (const fieldName in fieldMap) {
      collectFromInputField(fieldMap[fieldName]);
    }
  }

  function collectFromInputField(field: GraphQLInputField): void {
    collectFromInputType(field.type);
  }

  function collectFromInterfaces(interfaces: GraphQLInterfaceType[]): void {
    if (interfaces) {
      interfaces.forEach(interfaceType => {
        collectFromFieldMap(interfaceType.getFields());
        collectFromInterfaces(interfaceType.getInterfaces());
      });
    }
  }

  function collectFromOutputType(output: GraphQLOutputType): void {
    collectFrom(schema.getType(resolveName(output)));
  }

  function collectFromInputType(input: GraphQLInputType): void {
    collectFrom(schema.getType(resolveName(input)));
  }

  function resolveName(type: GraphQLOutputType | GraphQLInputType) {
    if (isListType(type) || isNonNullType(type)) {
      return resolveName(type.ofType);
    }

    return type.name;
  }

  function shouldCollect(name: string): boolean {
    if (!reachableTypes.has(name)) {
      reachableTypes.add(name);
      return true;
    }

    return false;
  }
}
