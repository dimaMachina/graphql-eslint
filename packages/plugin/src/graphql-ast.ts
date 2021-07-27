import { GraphQLSchema, TypeInfo, ASTKindToNode, Visitor, visit, visitWithTypeInfo, parse } from 'graphql';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { SiblingOperations } from './sibling-operations';

export type ReachableTypes = Set<string>;

let reachableTypesCache: ReachableTypes;

export function getReachableTypes(schema: GraphQLSchema): ReachableTypes {
  // We don't want cache reachableTypes on test environment
  // Otherwise reachableTypes will be same for all tests
  if (process.env.NODE_ENV !== 'test' && reachableTypesCache) {
    return reachableTypesCache;
  }
  // 👀 `printSchemaWithDirectives` keep all custom directives and `printSchema` from `graphql` not
  const printedSchema = printSchemaWithDirectives(schema); // Returns a string representation of the schema
  const astNode = parse(printedSchema); // Transforms the string into ASTNode
  const cache = Object.create(null);

  const collect = (nodeType: any): void => {
    let node = nodeType;
    while (node.type) {
      node = node.type;
    }
    const typeName = node.name.value;
    cache[typeName] ??= 0;
    cache[typeName] += 1;
  };

  const visitor: Visitor<ASTKindToNode> = {
    SchemaDefinition(node) {
      node.operationTypes.forEach(collect);
    },
    ObjectTypeDefinition(node) {
      [node, ...node.interfaces].forEach(collect);
    },
    UnionTypeDefinition(node) {
      [node, ...node.types].forEach(collect);
    },
    InputObjectTypeDefinition: collect,
    InterfaceTypeDefinition: collect,
    ScalarTypeDefinition: collect,
    InputValueDefinition: collect,
    DirectiveDefinition: collect,
    EnumTypeDefinition: collect,
    FieldDefinition: collect,
    Directive: collect,
  };

  visit(astNode, visitor);

  const operationTypeNames = new Set(['Query', 'Mutation', 'Subscription']);
  const usedTypes = Object.entries(cache)
    .filter(([typeName, usedCount]) => usedCount > 1 || operationTypeNames.has(typeName))
    .map(([typeName]) => typeName);

  reachableTypesCache = new Set(usedTypes);
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
  const usedFields: UsedFields = {};
  const typeInfo = new TypeInfo(schema);
  const allDocuments = [...operations.getOperations(), ...operations.getFragments()];

  const visitor = visitWithTypeInfo(typeInfo, {
    Field: {
      enter(node): false | void {
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
    },
  });

  for (const { document } of allDocuments) {
    visit(document, visitor);
  }
  usedFieldsCache = usedFields;
  return usedFieldsCache;
}
