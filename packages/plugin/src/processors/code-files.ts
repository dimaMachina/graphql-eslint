import { Linter } from 'eslint';
import { parseCode } from '@graphql-tools/graphql-tag-pluck';
import { logger } from '../utils';

const RELEVANT_KEYWORDS = ['gql', 'graphql', '/* GraphQL */'];

type Block = {
  text: string;
  filename: string;
  lineOffset: number;
  offset: number;
};

export function createGraphqlProcessor(): Linter.Processor {
  const blocksMap = new Map<string, Array<Block | string>>();

  return {
    supportsAutofix: true,
    preprocess(text: string, filename: string): (string | Linter.ProcessorFile)[] {
      const blocks: Array<Block | string> = [];
      blocksMap.set(filename, blocks);

      if (filename && text && RELEVANT_KEYWORDS.some(keyword => text.includes(keyword))) {
        try {
          const extractedDocuments = parseCode({
            code: text,
            filePath: filename,
            options: {
              globalGqlIdentifierName: ['gql', 'graphql'],
              skipIndent: true,
            },
          });

          if (extractedDocuments?.length > 0) {
            for (const item of extractedDocuments) {
              blocks.push({
                filename: `document.graphql`,
                text: item.content,
                lineOffset: item.loc.start.line - 1,
                offset: item.start + 1,
              });
            }

            blocks.push(text);

            return blocks;
          }
        } catch (e) {
          logger.warn(`Unable to process file "${filename}"`, e);
        }
      }

      return [text];
    },
    postprocess(messageLists: Linter.LintMessage[][], filename: string): Linter.LintMessage[] {
      const blocks = blocksMap.get(filename);

      if (blocks?.length > 0) {
        for (let i = 0; i < messageLists.length; ++i) {
          const messages = messageLists[i];
          const block = blocks[i];

          if (typeof block === 'string') {
            continue;
          }

          const { lineOffset, offset } = block;

          for (const message of messages) {
            message.line += lineOffset;

            if (message.endLine != null) {
              message.endLine += lineOffset;
            }
            if (message.fix && offset !== undefined) {
              message.fix.range[0] += offset;
              message.fix.range[1] += offset;
            }
          }
        }
      }

      return messageLists.flat();
    },
  };
}
