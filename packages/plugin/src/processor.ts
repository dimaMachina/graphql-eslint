import type { Linter } from 'eslint';
import { parseCode } from '@graphql-tools/graphql-tag-pluck';

type Block = Linter.ProcessorFile & {
  lineOffset: number;
  offset: number;
};

const RELEVANT_KEYWORDS = ['gql', 'graphql', '/* GraphQL */'] as const;
const blocksMap = new Map<string, Block[]>();

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
        globalGqlIdentifierName: ['gql', 'graphql'],
        skipIndent: true,
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
