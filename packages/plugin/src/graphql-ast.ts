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
  GraphQLDirective,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isInputObjectType,
  isListType,
  isNonNullType,
  TypeInfo,
  visit,
  visitWithTypeInfo,
} from 'graphql';
import { SiblingOperations } from './sibling-operations';

export type ReachableTypes = Set<string>;

let reachableTypesCache: ReachableTypes;

export function getReachableTypes(schema: GraphQLSchema): ReachableTypes {
  // We don't want cache reachableTypes on test environment
  // Otherwise reachableTypes will be same for all tests
  if (process.env.NODE_ENV !== 'test' && reachableTypesCache) {
    return reachableTypesCache
  }

  const reachableTypes: ReachableTypes = new Set();

  collectFromDirectives(schema.getDirectives());
  collectFrom(schema.getQueryType());
  collectFrom(schema.getMutationType());
  collectFrom(schema.getSubscriptionType());

  reachableTypesCache = reachableTypes;
  return reachableTypesCache;

  function collectFromDirectives(directives: readonly GraphQLDirective[]): void {
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
    if (reachableTypes.has(name)) {
      return false;
    }
    reachableTypes.add(name);
    return true;
  }
}

export type UsedFields = Record<string, Set<string>>;

let usedFieldsCache: UsedFields;

export function getUsedFields(schema: GraphQLSchema, operations: SiblingOperations): UsedFields {
  // We don't want cache usedFields on test environment
  // Otherwise usedFields will be same for all tests
  if (process.env.NODE_ENV !== 'test' && usedFieldsCache) {
    return usedFieldsCache;
  }

  const usedFields: UsedFields = {};

  const addField = (typeName, fieldName) => {
    const fieldType = usedFields[typeName] ?? (usedFields[typeName] = new Set());
    fieldType.add(fieldName);
  };

  const typeInfo = new TypeInfo(schema);

  const visitor = visitWithTypeInfo(typeInfo, {
    Field: {
      enter(node) {
        const fieldDef = typeInfo.getFieldDef();

        if (!fieldDef) {
          // skip visiting this node if field is not defined in schema
          return false;
        }

        const parent = typeInfo.getParentType();
        const fieldName = node.name.value;
        addField(parent.name, fieldName);

        return undefined;
      },
    },
  });

  const allDocuments = [...operations.getOperations(), ...operations.getFragments()];

  for (const { document } of allDocuments) {
    visit(document, visitor);
  }

  usedFieldsCache = usedFields;
  return usedFieldsCache;
}
