import { ReactElement, useEffect, useRef } from 'react';
import { parseForESLint, rules } from '@graphql-eslint/eslint-plugin';
import Editor, { OnMount } from '@monaco-editor/react';
import { Anchor, Callout, useTheme } from '@theguild/components';
import { Linter } from 'eslint';
// @ts-expect-error -- we patched this export
import pkg from 'eslint/linter';
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
  onChange: (value: string) => void;
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
  const lintMessages = linter
    .verify(
      code,
      {
        parser: '@graphql-eslint/eslint-plugin',
        // extends: `plugin:@graphql-eslint/schema-recommended`,
        parserOptions: { schema, documents },
        rules: selectedRules,
      },
      fileName,
    )
    .map(message => ({
      ...message,
      message: message.message.replace('Parsing error: [graphql-eslint]', 'Parsing error:'),
    }));

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
  }, [lintMessages]);

  return (
    <div className="grow overflow-hidden border-l dark:border-neutral-800 md:w-0">
      <div className="truncate border-b bg-gray-100 py-2 px-4 text-xs text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-200">
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
        onChange={(value = '') => onChange(value)}
      />
      <div
        className={clsx(
          'nextra-scrollbar flex flex-col gap-2 overflow-y-auto border-t p-4 dark:border-neutral-800',
          '[&>div]:mt-0 [&>div]:whitespace-pre-wrap [&>div>div:last-child]:leading-5',
        )}
        style={{ height }}
      >
        {lintMessages.map(({ message, line, column, ruleId }) => (
          <Callout
            key={`${message}-${line}-${column}`}
            type="error"
            emoji={
              <div className="flex items-center gap-1">
                <InformationCircleIcon />
                {typeof line === 'number' && typeof column === 'number' && (
                  <span className="font-sans text-xs font-bold underline underline-offset-4">
                    {line}:{column}
                  </span>
                )}
              </div>
            }
          >
            {message}
            {ruleId && (
              <>
                {' \n'}
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
  );
}
