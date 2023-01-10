import { ReactElement, useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Callout, useTheme, Anchor } from '@theguild/components';
import { Linter } from 'eslint';
// @ts-ignore -- we patched this export
import pkg from 'eslint/linter';
import { rules, parseForESLint } from '@graphql-eslint/eslint-plugin';
import RulesRecord = Linter.RulesRecord;
import clsx from 'clsx';
import { InformationCircleIcon } from 'nextra/icons';

const linter: Linter = new pkg.Linter();

linter.defineParser('@graphql-eslint/eslint-plugin', { parseForESLint });
for (const [ruleId, rule] of Object.entries(rules)) {
  linter.defineRule(`@graphql-eslint/${ruleId}`, rule as any);
}

type GraphQLEditorProps = {
  fileName: `${string}.graphql`;
  schema: string;
  documents: string;
  code: string;
  selectedRules: RulesRecord;
  height: string;
  onChange: (value?: string) => void;
};

export function GraphQLEditor({
  fileName,
  schema,
  documents,
  code,
  selectedRules,
  height,
  onChange,
}: GraphQLEditorProps): ReactElement {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<Parameters<OnMount>[0]>(null);
  const monacoRef = useRef<Parameters<OnMount>[1]>(null);
  const lintMessages = linter.verify(
    code,
    {
      parser: '@graphql-eslint/eslint-plugin',
      // extends: `plugin:@graphql-eslint/schema-recommended`,
      parserOptions: { schema, documents },
      rules: selectedRules,
    },
    fileName,
  );

  useEffect(() => {
    const model = editorRef.current?.getModel();
    const monaco = monacoRef.current;
    if (!model) return;

    monaco.editor.setModelMarkers(
      model,
      'graphql-eslint',
      lintMessages.map(message => ({
        code: null,
        source: null,
        startColumn: message.endColumn == null ? (message.column += 1) : message.column,
        startLineNumber: message.line,
        endColumn: message.endColumn || message.column,
        endLineNumber: message.endLine || message.line,
        severity: 8,
        message: message.message,
      })),
    );
  }, [lintMessages, editorRef.current, monacoRef.current]);

  return (
    <div className="grow w-0 nx-bg-primary-700/5 dark:nx-bg-primary-300/10 overflow-hidden border-l dark:nx-border-neutral-800">
      <div className="h-full">
        <div className="nx-truncate nx-bg-primary-700/5 nx-py-2 nx-px-4 nx-text-xs nx-text-gray-700 dark:nx-bg-primary-300/10 dark:nx-text-gray-200">
          {fileName}
        </div>
        <Editor
          language="graphql"
          theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: {
              enabled: false,
            },
            fixedOverflowWidgets: true,
          }}
          height={height}
          defaultValue={code}
          onMount={(editor, monaco) => {
            // here is the editor instance
            // you can store it in `useRef` for further usage
            editorRef.current = editor;
            monacoRef.current = monaco;
          }}
          onChange={onChange}
        />
        <div
          className={clsx(
            'flex h-1/2 flex-col gap-2 p-4 overflow-y-auto nextra-scrollbar border-t dark:nx-border-neutral-800',
            '[&>div]:mt-0 [&>div]:py-1',
          )}
          style={{ height }}
        >
          {lintMessages.map(({ message, line, column, ruleId }) => (
            <Callout
              key={`${message}-${line}-${column}`}
              type="error"
              emoji={
                <div className="flex items-center mt-1 gap-1">
                  <InformationCircleIcon />
                  {typeof line === 'number' && typeof column === 'number' && (
                    <span className="text-xs font-sans underline underline-offset-4 font-bold">
                      {line}:{column}
                    </span>
                  )}
                </div>
              }
            >
              {message}{' '}
              {ruleId && (
                <>
                  <br />
                  <Anchor
                    href={`/rules/${ruleId.replace('@graphql-eslint/', '')}`}
                    className="text-primary-600 underline decoration-from-font [text-underline-position:from-font]"
                  >
                    {ruleId}
                  </Anchor>
                </>
              )}
            </Callout>
          ))}
        </div>
      </div>
    </div>
  );
}
