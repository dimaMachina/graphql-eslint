import type { Linter } from 'eslint';
import { parseCode, GraphQLTagPluckOptions } from '@graphql-tools/graphql-tag-pluck';
import { loadConfigSync } from 'graphql-config';

type Block = Linter.ProcessorFile & {
  lineOffset: number;
  offset: number;
};

const defaultGraphqlConfig = loadConfigSync({ throwOnMissing: false })?.getDefault();
const graphqlTagPluckOptions = defaultGraphqlConfig?.extensions?.graphqlTagPluck as GraphQLTagPluckOptions;
const graphqlTagModuleIdentifiers =
  graphqlTagPluckOptions?.modules.map(({ identifier }) => identifier).filter(identifier => identifier) ?? [];
const graphqlTagModuleNames = graphqlTagPluckOptions?.modules.map(({ name }) => name).filter(name => name) ?? [];
const globalGqlIdentifierNames = graphqlTagPluckOptions?.globalGqlIdentifierName
  ? Array.isArray(graphqlTagPluckOptions.globalGqlIdentifierName)
    ? graphqlTagPluckOptions.globalGqlIdentifierName
    : [graphqlTagPluckOptions.globalGqlIdentifierName]
  : ['gql', 'graphql'];
const gqlMagicComment = graphqlTagPluckOptions?.gqlMagicComment ?? '/* GraphQL */';
const RELEVANT_KEYWORDS = [
  ...new Set([
    ...graphqlTagModuleIdentifiers,
    ...graphqlTagModuleNames,
    ...globalGqlIdentifierNames,
    ...(gqlMagicComment ? [gqlMagicComment] : []),
  ]),
] as const;
const blocksMap = new Map<string, Block[]>();
console.log(
  'HERE',
  loadConfigSync,
  loadConfigSync({ throwOnMissing: false }),
  loadConfigSync({ throwOnMissing: false })?.getDefault()
);

export const processor: Linter.Processor<Block | string> = {
  supportsAutofix: true,
  preprocess(code, filePath) {
    if (RELEVANT_KEYWORDS.every(keyword => !code.includes(keyword))) {
      return [code];
    }
    const extractedDocuments = parseCode({
      code,
      filePath,
      options: {
        skipIndent: true,
        ...graphqlTagPluckOptions,
      },
    });

    const blocks: Block[] = extractedDocuments.map(item => ({
      filename: 'document.graphql',
      text: item.content,
      lineOffset: item.loc.start.line - 1,
      offset: item.start + 1,
    }));
    blocksMap.set(filePath, blocks);

    return [...blocks, code /* source code must be provided and be last */];
  },
  postprocess(messages, filePath) {
    const blocks = blocksMap.get(filePath) || [];
    for (let i = 0; i < blocks.length; i += 1) {
      const { lineOffset, offset } = blocks[i];

      for (const message of messages[i]) {
        message.line += lineOffset;
        // endLine can not exist if only `loc: { start, column }` was provided to context.report
        if (typeof message.endLine === 'number') {
          message.endLine += lineOffset;
        }
        if (message.fix) {
          message.fix.range[0] += offset;
          message.fix.range[1] += offset;
        }
        for (const suggestion of message.suggestions || []) {
          suggestion.fix.range[0] += offset;
          suggestion.fix.range[1] += offset;
        }
      }
    }

    return messages.flat();
  },
};
