import {
  ASTNode,
  FieldDefinitionNode,
  GraphQLCompositeType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchema,
  GraphQLUnionType,
  ListTypeNode,
} from 'graphql';
import { GraphQLESTreeNode } from '../../estree-converter/types.js';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../../types.js';
import { requireGraphQLSchemaFromContext } from '../../utils.js';

const RULE_ID = 'nullable-records';

type GraphQLObjectLikeType = Exclude<GraphQLCompositeType, GraphQLUnionType>;

function getInnerType(type: GraphQLOutputType): GraphQLCompositeType | null {
  if (type instanceof GraphQLList || type instanceof GraphQLNonNull) {
    return getInnerType(type.ofType);
  }

  if (
    type instanceof GraphQLObjectType ||
    type instanceof GraphQLInterfaceType ||
    type instanceof GraphQLUnionType
  ) {
    return type;
  }

  return null;
}

/**
 * Recursively collects all used types in the schema that can be accessed from the given type
 */
function collectAllUsedTypes({
  type,
  collection,
  schema,
}: {
  type: GraphQLNamedType;
  collection: Map<string, GraphQLObjectLikeType>;
  schema: GraphQLSchema;
}) {
  if (type instanceof GraphQLObjectType) {
    collection.set(type.name, type);
    for (const fieldType of Object.values(type.getFields())) {
      const innerType = getInnerType(fieldType.type);

      if (!innerType) {
        continue;
      }

      if (collection.has(innerType.name)) {
        continue;
      }

      collectAllUsedTypes({ type: innerType, collection, schema });
    }
  }

  if (type instanceof GraphQLInterfaceType) {
    collection.set(type.name, type);
    for (const possibleType of schema.getPossibleTypes(type)) {
      if (collection.has(possibleType.name)) {
        continue;
      }

      collectAllUsedTypes({ type: possibleType, collection, schema });
    }
  }

  if (type instanceof GraphQLUnionType) {
    for (const unionType of type.getTypes()) {
      if (collection.has(unionType.name)) {
        continue;
      }

      collectAllUsedTypes({ type: unionType, collection, schema });
    }
  }
}

function getQueryRecordsTypes({ schema }: { schema: GraphQLSchema }) {
  const typesUsedOnlyInQuery = new Map<string, GraphQLObjectLikeType>();

  const queryType = schema.getType('Query');
  if (!queryType) {
    return null;
  }

  collectAllUsedTypes({
    type: queryType,
    collection: typesUsedOnlyInQuery,
    schema,
  });

  // filter out only types that have id field
  return new Map([...typesUsedOnlyInQuery].filter(([_typeName, type]) => 'id' in type.getFields()));
}

const docsLink = `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`;

export const unionTypesWithIdHasToBeNullable = (unionName: string, typeNames: string[]) =>
  `Union type \`${unionName}\` has to be nullable, because types \`${typeNames
    .sort()
    .join('`, `')}\` have \`id\` field and can be deleted in the client runtime. ${docsLink}`;

export const objectWithIdHasToBeNullable = (typeName: string) =>
  `Type \`${typeName}\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. ${docsLink}`;

export const getErrorMessage = ({
  typeName,
  allTypesWithId,
  schema,
}: {
  typeName: string;
  allTypesWithId: Map<string, GraphQLObjectLikeType>;
  schema: GraphQLSchema;
}) => {
  let errorMessage: string | null = null;
  if (allTypesWithId.has(typeName)) {
    errorMessage = objectWithIdHasToBeNullable(typeName);
  }

  const fieldInnerType = schema.getType(typeName);
  if (fieldInnerType && fieldInnerType instanceof GraphQLUnionType) {
    const unionTypesWithId = fieldInnerType
      .getTypes()
      .filter(({ name }) => allTypesWithId.has(name))
      .map(({ name }) => name);

    if (unionTypesWithId.length) {
      errorMessage = unionTypesWithIdHasToBeNullable(typeName, unionTypesWithId);
    }
  }

  return errorMessage;
};

/**
 * Recursively gets the inner type of a wrapping type
 */
function getOuterListType(typeNode: GraphQLESTreeNode<ASTNode>) {
  if (typeNode.kind === 'ListType') {
    return getOuterListType(typeNode.parent);
  }

  if (typeNode.kind === 'NonNullType') {
    return getOuterListType(typeNode.parent);
  }

  if (typeNode.kind === 'FieldDefinition') {
    return typeNode.parent;
  }

  return null;
}

function isWhiteListedParentType(parentType: string, whitelistPatterns: string[]): boolean {
  if (whitelistPatterns.length === 0) {
    return false;
  }

  for (const pattern of whitelistPatterns) {
    if (new RegExp(pattern).test(parentType)) {
      return true;
    }
  }

  return false;
}

function handleFieldDefinitionNode({
  context,
  fieldNode,
  allTypesWithId,
  schema,
}: {
  fieldNode: GraphQLESTreeNode<FieldDefinitionNode>;
  allTypesWithId: NonNullable<ReturnType<typeof getQueryRecordsTypes>>;
  schema: GraphQLSchema;
  context: GraphQLESLintRuleContext<Options>;
}) {
  const { options } = context;
  const whitelistPatterns = options[0]?.whitelistPatterns || [];
  if (isWhiteListedParentType(fieldNode.parent.name.value, whitelistPatterns)) {
    return;
  }

  const rawFieldNode = fieldNode.rawNode();

  // don't check fields that are nullable
  if (rawFieldNode.type.kind !== 'NonNullType') {
    return;
  }

  const nonNullableFieldType = rawFieldNode.type;
  // don't check types that are not type names
  if (nonNullableFieldType.type.kind !== 'NamedType') {
    return;
  }

  const fieldTypeName = nonNullableFieldType.type.name.value;

  const errorMessage = getErrorMessage({
    typeName: fieldTypeName,
    allTypesWithId,
    schema,
  });

  if (errorMessage) {
    context.report({
      node: fieldNode,
      message: errorMessage,
      fix(fixer) {
        return fixer.replaceTextRange(
          [nonNullableFieldType.loc?.start, nonNullableFieldType.loc?.end] as [number, number],
          fieldTypeName,
        );
      },
    });
  }
}

function handleListTypeNode({
  context,
  listTypeNode,
  allTypesWithId,
  schema,
}: {
  listTypeNode: GraphQLESTreeNode<ListTypeNode>;
  allTypesWithId: NonNullable<ReturnType<typeof getQueryRecordsTypes>>;
  schema: GraphQLSchema;
  context: GraphQLESLintRuleContext<Options>;
}) {
  // naive way to filter out fields that are in mutation Success type
  if (getOuterListType(listTypeNode)?.name.value.endsWith('Success')) {
    return;
  }

  const listItemNode = listTypeNode.rawNode().type;
  // don't check items in the list that are nullable
  if (listItemNode.kind !== 'NonNullType') {
    return;
  }

  // don't check items in the list that are not type names
  if (listItemNode.type.kind !== 'NamedType') {
    return;
  }

  const innerTypeName = listItemNode.type.name.value;

  const errorMessage = getErrorMessage({
    typeName: innerTypeName,
    allTypesWithId,
    schema,
  });

  if (errorMessage) {
    context.report({
      node: listTypeNode,
      message: errorMessage,
      fix(fixer) {
        return fixer.replaceTextRange(listTypeNode.range as [number, number], `[${innerTypeName}]`);
      },
    });
  }
}

type Options = [{ whitelistPatterns: string[] }];

export const rule: GraphQLESLintRule<Options> = {
  meta: {
    schema: {
      $id: 'https://the-guild.dev/graphql/eslint/rules/nullable-records',
      properties: {
        whitelistPatterns: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    docs: {
      category: 'Schema',
      description:
        'Enforces users to return types that conform to Node interface as nullable. These types can usually be deleted from Relay cache and schema should reflect that.',
      recommended: true,
      url: docsLink,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String!
            }

            type Query {
              me: User!
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
            }

            type Query {
              me: User
            }
          `,
        },
      ],
    },
    type: 'problem',
    hasSuggestions: true,
    fixable: 'code',
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const allTypesWithId = getQueryRecordsTypes({ schema });

    // if there are no types with id, there is nothing to check
    if (!allTypesWithId) {
      return {};
    }

    return {
      // check that all fields that return object with id are nullable
      FieldDefinition(fieldNode) {
        handleFieldDefinitionNode({
          fieldNode,
          allTypesWithId,
          schema,
          context,
        });
      },
      // check that all items in lists that return object with id are nullable
      ListType(listTypeNode) {
        handleListTypeNode({ listTypeNode, allTypesWithId, schema, context });
      },
    };
  },
};
