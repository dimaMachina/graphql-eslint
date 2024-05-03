import { FieldDefinitionNode, GraphQLSchema, TypeInfo, visit, visitWithTypeInfo } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode } from '../estree-converter/types.js';
import { SiblingOperations } from '../siblings.js';
import { GraphQLESLintRule, GraphQLESLintRuleListener } from '../types.js';
import { requireGraphQLSchemaFromContext, requireSiblingsOperations } from '../utils.js';

const RULE_ID = 'no-unused-fields';

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      ignoredFieldSelectors: {
        type: 'array',
        uniqueItems: true,
        minItems: 1,
        description: [
          'Fields that will be ignored and are allowed to be unused.',
          '',
          '> These fields are defined by ESLint [`selectors`](https://eslint.org/docs/developer-guide/selectors). Paste or drop code into the editor in [ASTExplorer](https://astexplorer.net) and inspect the generated AST to compose your selector.',
        ].join('\n'),
        items: {
          type: 'string',
          pattern: '^FieldDefinition(.+)$',
        },
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

type UsedFields = Record<string, Set<string>>;

let usedFieldsCache: UsedFields;

function getUsedFields(schema: GraphQLSchema, operations: SiblingOperations): UsedFields {
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
      const parentTypeName = typeInfo.getParentType()!.name;
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

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    messages: {
      [RULE_ID]: 'Field "{{fieldName}}" is unused',
    },
    docs: {
      description: 'Requires all fields to be used at some level by siblings operations.',
      category: 'Schema',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      requiresSiblings: true,
      requiresSchema: true,
      // Requires documents to be set
      isDisabledForAllConfig: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
              someUnusedField: String
            }

            type Query {
              me: User
            }

            query {
              me {
                id
                name
              }
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

            query {
              me {
                id
                name
              }
            }
          `,
        },
        {
          title: 'Correct (ignoring fields)',
          usage: [{ ignoredFieldSelectors: ['FieldDefinition[name.value=lastName]'] }],
          code: /* GraphQL */ `
            type User {
              id: ID!
              firstName: String
              lastName: String
            }

            type Query {
              me: User
            }

            query {
              me {
                id
                firstName
              }
            }
          `,
        },
      ],
    },
    type: 'suggestion',
    schema,
    hasSuggestions: true,
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const siblingsOperations = requireSiblingsOperations(RULE_ID, context);
    const usedFields = getUsedFields(schema, siblingsOperations);
    const { ignoredFieldSelectors } = context.options[0] || {};
    const selector = (ignoredFieldSelectors || []).reduce(
      (acc, selector) => `${acc}:not(${selector})`,
      'FieldDefinition',
    );

    const listener: GraphQLESLintRuleListener = (node: GraphQLESTreeNode<FieldDefinitionNode>) => {
      const fieldName = node.name.value;
      const parentTypeName = node.parent.name.value;
      const isUsed = usedFields[parentTypeName]?.has(fieldName);

      if (isUsed) {
        return;
      }

      context.report({
        node: node.name,
        messageId: RULE_ID,
        data: { fieldName },
        suggest: [
          {
            desc: `Remove \`${fieldName}\` field`,
            fix(fixer) {
              const sourceCode = context.getSourceCode() as any;
              const tokenBefore = sourceCode.getTokenBefore(node);
              const tokenAfter = sourceCode.getTokenAfter(node);
              const isEmptyType = tokenBefore.type === '{' && tokenAfter.type === '}';
              return fixer.remove((isEmptyType ? node.parent : node) as any);
            },
          },
        ],
      });
    };

    return {
      [selector]: listener,
    };
  },
};
