import {
  asFed2SubgraphDocument,
  buildSchemaFromAST,
  FederationBlueprint,
  Subgraph,
} from '@apollo/federation-internals';
import { GraphQLESLintRule } from '../types.js';

const RULE_ID = 'federation-subgraph';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: 'Enforce subgraph to be valid according Federation 2 spec.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      // examples: [
      //   {
      //     title: 'Incorrect',
      //     code: /* GraphQL */ ``,
      //   },
      //   {
      //     title: 'Correct',
      //     code: /* GraphQL */ ``,
      //   },
      // ],
    },
    schema: [],
  },
  create(context) {
    return {
      Document(node) {
        const withRootTypeRenaming = true;

        const buildOptions = {
          blueprint: new FederationBlueprint(withRootTypeRenaming),
          validate: false,
        };
        const doc = asFed2SubgraphDocument(node.rawNode());

        const subgraphSchema = buildSchemaFromAST(doc, buildOptions);

        const name = 'graphql-eslint-subgraph';

        const subgraph = new Subgraph(name, `http://${name}`, subgraphSchema);

        try {
          subgraph.validate();
        } catch (error) {
          context.report({
            node,
            // Remove `[graphql-eslint-subgraph] ` suffix in error message
            message: (error as Error).message.slice(name.length + '[] '.length),
          });
        }
      },
    };
  },
};
