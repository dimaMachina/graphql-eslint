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
  GraphQLDirective,
  Kind,
} from 'graphql';
import { SiblingOperations } from './sibling-operations';

export function createReachableTypesService(schema: GraphQLSchema): () => Set<string>;
export function createReachableTypesService(schema?: GraphQLSchema): () => Set<string> | null {
  if (schema) {
    let cache: Set<string> = null;
    return () => {
      if (!cache) {
        cache = collectReachableTypes(schema);
      }

      return cache;
    };
  }

  return () => null;
}

export function collectReachableTypes(schema: GraphQLSchema): Set<string> {
  const reachableTypes = new Set<string>();

  collectFromDirectives(schema.getDirectives());
  collectFrom(schema.getQueryType());
  collectFrom(schema.getMutationType());
  collectFrom(schema.getSubscriptionType());

  return reachableTypes;

  function collectFromDirectives(directives: readonly GraphQLDirective[]) {
    for (const directive of directives || []) {
      reachableTypes.add(directive.name);
      directive.args.forEach(collectFromArgument);
    }
  }

  function collectFrom(type?: GraphQLNamedType): void {
    if (type && shouldCollect(type.name)) {
      if (isObjectType(type)) {
        collectFromFieldMap(type.getFields());
        collectFromInterfaces(type.getInterfaces());
      } else if (isInterfaceType(type)) {
        collectFromFieldMap(type.getFields());
        collectFromInterfaces(type.getInterfaces());
        collectFromImplementations(type);
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
      interfaces.forEach(collectFrom);
    }
  }

  function collectFromOutputType(output: GraphQLOutputType): void {
    collectFrom(schema.getType(resolveName(output)));
  }

  function collectFromInputType(input: GraphQLInputType): void {
    collectFrom(schema.getType(resolveName(input)));
  }

  function collectFromImplementations(type: GraphQLInterfaceType): void {
    schema.getPossibleTypes(type).forEach(collectFrom);
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

export type FieldsCache = Record<string, Set<string>>;

export function createUsedFieldsService(schema: GraphQLSchema, operations: SiblingOperations): () => FieldsCache | null {
  if (!schema || !operations) {
    return () => null;
  }

  let cache: FieldsCache = null;

  return () => {
    if (!cache) {
      cache = collectUsedFields(schema, operations);
    }

    return cache;
  };
}

export function collectUsedFields(schema: GraphQLSchema, operations: SiblingOperations): FieldsCache {
  const typesByOperations = {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType(),
  };

  const cache: FieldsCache = {};

  const addField = (typeName, fieldName) => {
    const fieldType = cache[typeName] ?? (cache[typeName] = new Set());
    fieldType.add(fieldName);
  };

  const visit = (selection, type?: GraphQLNamedType) => {
    switch (selection.kind) {
      case Kind.OPERATION_DEFINITION:
        type = typesByOperations[selection.operation];
        break;
      case Kind.FRAGMENT_DEFINITION:
      case Kind.INLINE_FRAGMENT:
        type = schema.getType(selection.typeCondition.name.value);
        break;
    }

    // Skipping if not found in schema
    if (!type) {
      return;
    }

    for (const node of selection.selectionSet.selections) {
      if (node.kind === Kind.INLINE_FRAGMENT) {
        visit(node);
        continue;
      }

      if (node.kind === Kind.FIELD) {
        const fieldName = node.name.value;
        addField(type.name, fieldName);

        if (node.selectionSet) {
          let parentType = (type.astNode as any).fields.find(n => n.name.value === fieldName);
          // Skipping if not found in schema
          if (parentType) {
            while (parentType.type) {
              parentType = parentType.type;
            }
            const parent = schema.getType(parentType.name.value);
            visit(node, parent);
          }
        }
      }
    }
  };

  for (const { document } of operations.getFragments()) {
    visit(document);
  }

  for (const { document } of operations.getOperations()) {
    visit(document);
  }

  return cache;
}
