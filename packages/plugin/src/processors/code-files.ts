import { parseCode } from '@graphql-tools/graphql-tag-pluck';

const RELEVANT_KEYWORDS = ['gql', 'graphql', '/* GraphQL */'];

type Block = {
  text: string;
  filename: string;
  lineOffset: number;
  offset: number;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createGraphqlProcessor() {
  const blocksMap = new Map<string, Array<Block | string>>();

  return {
    supportsAutofix: true,
    preprocess: (text: string, filename: string): Array<{ text: string; filename: string } | string> => {
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

          if (extractedDocuments && extractedDocuments.length > 0) {
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
          // eslint-disable-next-line no-console
          console.warn(`[graphql-eslint/processor]: Unable to process file "${filename}": `, e);
        }
      }

      return [text];
    },
    postprocess: (messageLists: any[], filename: string): any[] => {
      const blocks = blocksMap.get(filename);

      if (blocks && blocks.length > 0) {
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
