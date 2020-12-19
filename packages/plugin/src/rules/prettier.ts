import { GraphQLESLintRule } from '../types';

declare global {
  interface SyntaxError extends Error {
    codeFrame?: string;
    loc?: any;
  }
}

/**
 * @fileoverview Runs `prettier` as an ESLint rule.
 * @author Andres Suarez
 * This file is shamelessly borrowed from https://github.com/prettier/eslint-plugin-prettier/blob/master/eslint-plugin-prettier.js
 */

const { showInvisibles, generateDifferences } = require('prettier-linter-helpers');
const { INSERT, DELETE, REPLACE } = generateDifferences;
let prettier;

/**
 * Reports an "Insert ..." issue where text must be inserted.
 * @param {RuleContext} context - The ESLint rule context.
 * @param {number} offset - The source offset where to insert text.
 * @param {string} text - The text to be inserted.
 * @returns {void}
 */
function reportInsert(context, offset, text) {
  const pos = context.getSourceCode().getLocFromIndex(offset);
  const range = [offset, offset];
  context.report({
    message: 'Insert `{{ code }}`',
    data: { code: showInvisibles(text) },
    loc: { start: pos, end: pos },
    fix(fixer) {
      return fixer.insertTextAfterRange(range, text);
    },
  });
}

/**
 * Reports a "Delete ..." issue where text must be deleted.
 * @param {RuleContext} context - The ESLint rule context.
 * @param {number} offset - The source offset where to delete text.
 * @param {string} text - The text to be deleted.
 * @returns {void}
 */
function reportDelete(context, offset, text) {
  const start = context.getSourceCode().getLocFromIndex(offset);
  const end = context.getSourceCode().getLocFromIndex(offset + text.length);
  const range = [offset, offset + text.length];
  context.report({
    message: 'Delete `{{ code }}`',
    data: { code: showInvisibles(text) },
    loc: { start, end },
    fix(fixer) {
      return fixer.removeRange(range);
    },
  });
}

/**
* Reports a "Replace ... with ..." issue where text must be replaced.
* @param {RuleContext} context - The ESLint rule context.
* @param {number} offset - The source offset where to replace deleted text
with inserted text.
* @param {string} deleteText - The text to be deleted.
* @param {string} insertText - The text to be inserted.
* @returns {void}
*/
function reportReplace(context, offset, deleteText, insertText) {
  const start = context.getSourceCode().getLocFromIndex(offset);
  const end = context.getSourceCode().getLocFromIndex(offset + deleteText.length);
  const range = [offset, offset + deleteText.length];
  context.report({
    message: 'Replace `{{ deleteCode }}` with `{{ insertCode }}`',
    data: {
      deleteCode: showInvisibles(deleteText),
      insertCode: showInvisibles(insertText),
    },
    loc: { start, end },
    fix(fixer) {
      return fixer.replaceTextRange(range, insertText);
    },
  });
}

type PrettierRuleConfig = [
  Record<string, any>,
  {
    usePrettierrc?: boolean;
    fileInfoOptions?: Record<string, any>;
  }
];

const rule: GraphQLESLintRule<PrettierRuleConfig> = {
  meta: {
    docs: {
      description: `Having all your code follow the same styling guidelines makes it easier to read and understand the code.`,
      recommended: true,
      category: 'Stylistic Issues',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/prettier.md',
      requiresSiblings: false,
      requiresSchema: false,
    },
    type: 'layout',
    fixable: 'code',
    schema: [
      // Prettier options:
      {
        type: 'object',
        properties: {},
        additionalProperties: true,
      },
      {
        type: 'object',
        properties: {
          usePrettierrc: { type: 'boolean' },
          fileInfoOptions: {
            type: 'object',
            properties: {},
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    ],
  },
  create(context) {
    const usePrettierrc = !context.options[1] || context.options[1].usePrettierrc !== false;
    const eslintFileInfoOptions = (context.options[1] && context.options[1].fileInfoOptions) || {};
    const sourceCode = context.getSourceCode();
    const filepath = context.getFilename();
    const source = sourceCode.text;

    if (prettier && prettier.clearConfigCache) {
      prettier.clearConfigCache();
    }

    return {
      Document() {
        if (!prettier) {
          // Prettier is expensive to load, so only load it if needed.
          prettier = require('prettier'); // eslint-disable-line global-require
        }

        const eslintPrettierOptions = context.options[0] || {};

        const prettierRcOptions = usePrettierrc
          ? prettier.resolveConfig.sync(filepath, {
              editorconfig: true,
            })
          : null;

        const prettierFileInfo = prettier.getFileInfo.sync(filepath, {
          resolveConfig: true,
          ignorePath: '.prettierignore',
          ...eslintFileInfoOptions,
        });

        // Skip if file is ignored using a .prettierignore file
        if (prettierFileInfo.ignored) {
          return;
        }

        const initialOptions = {
          parser: 'graphql',
        };

        const prettierOptions = {
          ...initialOptions,
          ...prettierRcOptions,
          ...eslintPrettierOptions,
          filepath,
        };

        // prettier.format() may throw a SyntaxError if it cannot parse the
        // source code it is given. Usually for JS files this isn't a
        // problem as ESLint will report invalid syntax before trying to
        // pass it to the prettier plugin. However this might be a problem
        // for non-JS languages that are handled by a plugin. Notably Vue
        // files throw an error if they contain unclosed elements, such as
        // `<template><div></template>. In this case report an error at the
        // point at which parsing failed.
        let prettierSource;
        try {
          prettierSource = prettier.format(source, prettierOptions);
        } catch (err) {
          if (!(err instanceof SyntaxError)) {
            throw err;
          }

          let message = `Parsing error: ${err.message}`;

          // Prettier's message contains a codeframe style preview of the
          // invalid code and the line/column at which the error occurred.
          // ESLint shows those pieces of information elsewhere already so
          // remove them from the message
          if (err.codeFrame) {
            message = message.replace(`\n${err.codeFrame}`, '');
          }
          if (err.loc) {
            message = message.replace(/ \(\d+:\d+\)$/, '');
          }

          context.report({ message, loc: err.loc });

          return;
        }

        if (source !== prettierSource) {
          const differences = generateDifferences(source, prettierSource);

          differences.forEach(difference => {
            switch (difference.operation) {
              case INSERT:
                reportInsert(context, difference.offset, difference.insertText);
                break;
              case DELETE:
                reportDelete(context, difference.offset, difference.deleteText);
                break;
              case REPLACE:
                reportReplace(context, difference.offset, difference.deleteText, difference.insertText);
                break;
              default:
                throw new Error('Unknown action');
            }
          });
        }
      },
    };
  },
};

export default rule;
