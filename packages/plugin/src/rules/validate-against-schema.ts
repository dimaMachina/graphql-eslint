import { Kind, validate, GraphQLSchema, DocumentNode, ASTNode, ValidationRule, specifiedRules } from 'graphql';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRule, GraphQLESlintRuleContext } from '../types';
import { requireGraphQLSchemaFromContext } from '../utils';

function validateDoc(
  sourceNode: GraphQLESTreeNode<ASTNode>,
  context: GraphQLESlintRuleContext,
  schema: GraphQLSchema,
  documentNode: DocumentNode,
  rules: ReadonlyArray<ValidationRule>
) {
  if (documentNode && documentNode.definitions && documentNode.definitions.length > 0) {
    try {
      const validationErrors = validate(schema, documentNode, rules);

      for (const error of validationErrors) {
        const node = (error.nodes[0] as any) as GraphQLESTreeNode<ASTNode>;

        context.report({
          loc: node.loc,
          message: error.message,
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
    docs: {
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/validate-against-schema.md`,
      recommended: true,
      description: `This rule validates GraphQL operations against your GraphQL schema, and reflects the error as lint errors.`,
    },
    schema: {
      type: 'array',
      minItems: 0,
      maxItems: 1,
      items: {
        allOf: [
          {
            type: 'object',
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
    },
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
        const schema = requireGraphQLSchemaFromContext(context);
        validateDoc(
          node,
          context,
          schema,
          {
            kind: Kind.DOCUMENT,
            definitions: [node.rawNode()],
          },
          rulesArr
        );
      },
      FragmentDefinition(node) {
        const schema = requireGraphQLSchemaFromContext(context);
        validateDoc(
          node,
          context,
          schema,
          {
            kind: Kind.DOCUMENT,
            definitions: [node.rawNode()],
          },
          rulesArr
        );
      },
    };
  },
};

export default rule;
