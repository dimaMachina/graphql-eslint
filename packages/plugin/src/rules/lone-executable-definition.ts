import { GraphQLESLintRule } from '../types';
import { ExecutableDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter';
import { ARRAY_DEFAULT_OPTIONS, pascalCase, getLocation } from '../utils';
import { FromSchema } from 'json-schema-to-ts';

const RULE_ID = 'lone-executable-definition';

const definitionTypes = ['fragment', 'query', 'mutation', 'subscription'] as const;

type Definition = (typeof definitionTypes)[number];
type DefinitionESTreeNode = GraphQLESTreeNode<ExecutableDefinitionNode>;

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    minProperties: 1,
    additionalProperties: false,
    properties: {
      ignore: {
        ...ARRAY_DEFAULT_OPTIONS,
        maxItems: 3, // ignore all 4 types is redundant
        items: {
          enum: definitionTypes,
        },
        description: 'Allow certain definitions to be placed alongside others.',
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description:
        'Require all queries, mutations, subscriptions and fragments to be located in separate files.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query Foo {
              id
            }
            fragment Bar on Baz {
              id
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            query Foo {
              id
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: '{{name}} should be in a separate file.',
    },
    schema,
  },
  create(context) {
    const ignore = new Set(context.options[0]?.ignore || []);
    const definitions: { type: Definition; node: DefinitionESTreeNode }[] = [];
    return {
      ':matches(OperationDefinition, FragmentDefinition)'(node: DefinitionESTreeNode) {
        const type = 'operation' in node ? node.operation : 'fragment';
        if (!ignore.has(type)) {
          definitions.push({ type, node });
        }
      },
      'Program:exit'() {
        for (const { node, type } of definitions.slice(1) /* ignore first definition */) {
          let name = pascalCase(type);
          const definitionName = node.name?.value;
          if (definitionName) {
            name += ` "${definitionName}"`;
          }
          context.report({
            loc: node.name?.loc || getLocation(node.loc.start, type),
            messageId: RULE_ID,
            data: { name },
          });
        }
      },
    };
  },
};
