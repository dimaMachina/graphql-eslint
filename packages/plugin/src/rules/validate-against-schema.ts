import { Kind, validate, GraphQLSchema, DocumentNode, ASTNode, ValidationRule, specifiedRules } from 'graphql';
import { validateSDL } from 'graphql/validation/validate';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRule, GraphQLESlintRuleContext } from '../types';
import { requireGraphQLSchemaFromContext } from '../utils';

function extractRuleName(stack: string | undefined): string | null {
  const match = (stack || '').match(/validation[/\\\\]rules[/\\\\](.*?)\.js:/);

  if (!match) {
    return null;
  }

  return match[1] || null;
}

export function validateDoc(
  sourceNode: GraphQLESTreeNode<ASTNode>,
  context: GraphQLESlintRuleContext,
  schema: GraphQLSchema | null,
  documentNode: DocumentNode,
  rules: ReadonlyArray<ValidationRule>,
  ruleName: string | null = null
): void {
  if (documentNode && documentNode.definitions && documentNode.definitions.length > 0) {
    try {
      const validationErrors = schema ? validate(schema, documentNode, rules) : validateSDL(documentNode, null, rules);

      for (const error of validationErrors) {
        const validateRuleName = ruleName || `[${extractRuleName(error.stack)}]`;

        context.report({
          loc: error.locations[0],
          message: ruleName ? error.message : `${validateRuleName} ${error.message}`,
        });
      }
    } catch (e) {
      context.report({
        node: sourceNode,
        message: e.message,
      });
    }
  }
}

export type ValidateAgainstSchemaRuleConfig = [
  {
    overrideRules?: string[];
    disableRules?: string[];
  }
];

const rule: GraphQLESLintRule<ValidateAgainstSchemaRuleConfig> = {
  meta: {
    deprecated: true,
    docs: {
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/validate-against-schema.md`,
      description: `This rule validates GraphQL operations against your GraphQL schema, and reflects the error as lint errors.\n\n> This rule is deprecated, all validations are available as standalone rules since v0.6.0.`,
      requiresSchema: true,
      requiresSiblings: false,
    },
    schema: [
      {
        allOf: [
          {
            type: 'object',
            title: 'overrideRules',
            properties: {
              overrideRules: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
          {
            type: 'object',
            title: 'disableRules',
            properties: {
              disableRules: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
        ],
      },
    ],
    type: 'problem',
  },
  create(context) {
    const config = context.options[0] || {};
    let rulesArr = specifiedRules;

    if (config.disableRules && config.disableRules.length > 0) {
      rulesArr = specifiedRules.filter(r => !config.disableRules.includes(r.name));
    } else if (config.overrideRules && config.overrideRules.length > 0) {
      rulesArr = specifiedRules.filter(r => config.overrideRules.includes(r.name));
    }

    return {
      OperationDefinition(node) {
        const schema = requireGraphQLSchemaFromContext('validate-against-schema', context);

        validateDoc(
          node,
          context,
          schema,
          {
            kind: Kind.DOCUMENT,
            definitions: [node.rawNode()],
          },
          rulesArr.filter(r => r.name !== 'KnownFragmentNamesRule')
        );
      },
      FragmentDefinition(node) {
        const schema = requireGraphQLSchemaFromContext('validate-against-schema', context);

        validateDoc(
          node,
          context,
          schema,
          {
            kind: Kind.DOCUMENT,
            definitions: [node.rawNode()],
          },
          rulesArr.filter(r => r.name !== 'NoUnusedFragmentsRule')
        );
      },
    };
  },
};

export default rule;
