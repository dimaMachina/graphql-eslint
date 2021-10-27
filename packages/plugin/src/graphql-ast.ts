import {
  ASTNode,
  ASTVisitor,
  TypeInfo,
  GraphQLSchema,
  visit,
  isInterfaceType,
  visitWithTypeInfo,
} from 'graphql';
import { SiblingOperations } from './sibling-operations';
import { getTypeName } from './utils';

export type ReachableTypes = Set<string>;

let reachableTypesCache: ReachableTypes;

export function getReachableTypes(schema: GraphQLSchema): ReachableTypes {
  // We don't want cache reachableTypes on test environment
  // Otherwise reachableTypes will be same for all tests
  if (process.env.NODE_ENV !== 'test' && reachableTypesCache) {
    return reachableTypesCache;
  }
  const reachableTypes: ReachableTypes = new Set();

  const collect = (node: ASTNode): false | void => {
    const typeName = getTypeName(node);
    if (reachableTypes.has(typeName)) {
      return;
    }
    reachableTypes.add(typeName);
    const type = schema.getType(typeName) || schema.getDirective(typeName);

    if (isInterfaceType(type)) {
      const { objects, interfaces } = schema.getImplementations(type);
      for (const { astNode } of [...objects, ...interfaces]) {
        visit(astNode, visitor);
      }
    } else {
      visit(type.astNode, visitor);
    }
  };

  const visitor: ASTVisitor = {
    InterfaceTypeDefinition: collect,
    ObjectTypeDefinition: collect,
    InputValueDefinition: collect,
    UnionTypeDefinition: collect,
    FieldDefinition: collect,
    Directive: collect,
    NamedType: collect,
  };

  for (const type of [schema.getQueryType(), schema.getMutationType(), schema.getSubscriptionType()]) {
    if (type) {
      visit(type.astNode, visitor);
    }
  }
  reachableTypesCache = reachableTypes;
  return reachableTypesCache;
}

export type UsedFields = Record<string, Set<string>>;

let usedFieldsCache: UsedFields;

export function getUsedFields(schema: GraphQLSchema, operations: SiblingOperations): UsedFields {
  // We don't want cache usedFields on test environment
  // Otherwise usedFields will be same for all tests
  if (process.env.NODE_ENV !== 'test' && usedFieldsCache) {
    return usedFieldsCache;
  }
  const usedFields: UsedFields = Object.create(null);
  const typeInfo = new TypeInfo(schema);

  const visitor = visitWithTypeInfo(typeInfo, {
    Field(node): false | void {
      const fieldDef = typeInfo.getFieldDef();
      if (!fieldDef) {
        // skip visiting this node if field is not defined in schema
        return false;
      }
      const parentTypeName = typeInfo.getParentType().name;
      const fieldName = node.name.value;

      usedFields[parentTypeName] ??= new Set();
      usedFields[parentTypeName].add(fieldName);
    },
  });

  const allDocuments = [...operations.getOperations(), ...operations.getFragments()];
  for (const { document } of allDocuments) {
    visit(document, visitor);
  }
  usedFieldsCache = usedFields;
  return usedFieldsCache;
}
