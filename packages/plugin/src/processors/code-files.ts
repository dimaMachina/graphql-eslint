import { extname } from 'path';
import { parseCode } from '@graphql-tools/graphql-tag-pluck';
import {} from 'eslint';

const EXTRACTABLE_FILES_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const RELEVANT_KEYWORDS = ['gql', 'graphql', '/* GraphQL */'];

type Block = {
  text: string;
  filename: string;
  lineOffset?: number;
  offset?: number;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createGraphqlProcessor() {
  const blocksMap = new Map<string, Block[]>();

  return {
    supportsAutofix: true,
    preprocess: (text: string, filename: string): Array<{ text: string; filename: string }> => {
      const blocks: Block[] = [];
      blocksMap.set(filename, blocks);

      if (
        filename &&
        text &&
        EXTRACTABLE_FILES_EXTENSIONS.includes(extname(filename)) &&
        RELEVANT_KEYWORDS.some(keyword => text.includes(keyword))
      ) {
        const extractedDocuments = parseCode({
          code: text,
          filePath: filename,
          options: {
            globalGqlIdentifierName: ['gql', 'graphql'],
            skipIndent: true,
          },
        });

        if (extractedDocuments && extractedDocuments.length > 0) {
          for (const item of extractedDocuments) {
            blocks.push({
              filename: `document.graphql`,
              text: item.content,
              lineOffset: item.loc.start.line - 1,
              offset: item.start + 1,
            });
          }

          blocks.push({ text, filename });

          return blocks;
        }
      }

      return [{ text, filename }];
    },
    postprocess: (messageLists: any[], filename: string): any[] => {
      const blocks = blocksMap.get(filename);

      if (blocks && blocks.length > 0) {
        for (let i = 0; i < messageLists.length; ++i) {
          const messages = messageLists[i];
          const { lineOffset, offset } = blocks[i];

          for (const message of messages) {
            message.line += lineOffset;

            if (message.endLine != null) {
              message.endLine += lineOffset;
            }
            if (message.fix && typeof offset !== 'undefined') {
              message.fix.range[0] = offset + message.fix.range[0];
              message.fix.range[1] = offset + message.fix.range[1];
            }
          }
        }
      }

      return [].concat(...messageLists);
    },
  };
}
