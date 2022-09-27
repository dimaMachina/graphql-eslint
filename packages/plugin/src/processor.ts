import { Linter } from 'eslint';
import { parseCode, GraphQLTagPluckOptions } from '@graphql-tools/graphql-tag-pluck';
import { asArray } from '@graphql-tools/utils';
import { GraphQLConfig } from 'graphql-config';
import { loadOnDiskGraphQLConfig } from './graphql-config';

export type Block = Linter.ProcessorFile & {
  lineOffset: number;
  offset: number;
};

const blocksMap = new Map<string, Block[]>();

let onDiskConfig: GraphQLConfig;
let pluckConfig: GraphQLTagPluckOptions;
let RELEVANT_KEYWORDS: string[];

export const processor: Linter.Processor<Block | string> = {
  supportsAutofix: true,
  preprocess(code, filePath) {
    if (!pluckConfig) {
      onDiskConfig = loadOnDiskGraphQLConfig(filePath);
      const {
        modules = [],
        globalGqlIdentifierName = ['gql', 'graphql'],
        gqlMagicComment = 'GraphQL',
      } = onDiskConfig?.getProjectForFile(filePath).extensions.pluckConfig || {};

      pluckConfig = {
        skipIndent: true,
        modules,
        globalGqlIdentifierName,
        gqlMagicComment,
      };

      RELEVANT_KEYWORDS = [
        ...new Set(
          [
            ...modules.map(({ identifier }) => identifier),
            ...asArray(globalGqlIdentifierName),
            gqlMagicComment,
          ].filter(Boolean)
        ),
      ];
    }

    if (RELEVANT_KEYWORDS.every(keyword => !code.includes(keyword))) {
      return [code];
    }

    try {
      const extractedDocuments = parseCode({
        code,
        filePath,
        options: pluckConfig,
      });

      const blocks: Block[] = extractedDocuments.map(item => ({
        filename: 'document.graphql',
        text: item.content,
        lineOffset: item.loc.start.line - 1,
        offset: item.start + 1,
      }));
      blocksMap.set(filePath, blocks);

      return [...blocks, code /* source code must be provided and be last */];
    } catch {
      // in case of parsing error return code as is
      return [code];
    }
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

    const result = messages.flat();
    // sort eslint/graphql-eslint messages by line/column
    return result.sort((a, b) => a.line - b.line || a.column - b.column);
  },
};
