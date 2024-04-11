import { ReactElement, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Linter } from 'eslint';
import uniqWith from 'lodash.uniqwith';
import { parseForESLint, rules } from '@graphql-eslint/eslint-plugin';
import Editor, { OnMount } from '@monaco-editor/react';
import { Anchor, Callout, InformationCircleIcon, useTheme } from '@theguild/components';

const linter = new Linter();

linter.defineParser('@graphql-eslint/eslint-plugin', { parseForESLint });
for (const [ruleId, rule] of Object.entries(rules)) {
  linter.defineRule(`@graphql-eslint/${ruleId}`, rule as any);
}

type GraphQLEditorProps = {
  fileName: `${string}.graphql`;
  schema: string;
  documents: string;
  code: string;
  selectedRules: Record<string, any>;
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
  const editorRef = useRef<Parameters<OnMount>[0]>();
  const monacoRef = useRef<Parameters<OnMount>[1]>();
  const [editorMounted, setEditorMounted] = useState(false);
  let lintMessages = linter.verify(
    code,
    {
      parser: '@graphql-eslint/eslint-plugin',
      // extends: `plugin:@graphql-eslint/schema-recommended`,
      parserOptions: {
        graphQLConfig: { schema, documents },
      },
      rules: selectedRules,
    },
    fileName,
  );
  lintMessages = uniqWith(
    // remove duplicates of graphql-js messages
    lintMessages,
    (a, b) => b.message === a.message && b.line === a.line && b.column === a.column,
  ).map(message => ({
    ...message,
    message: message.message.replace('Parsing error: [graphql-eslint]', 'Parsing error:'),
  }));

  useEffect(() => {
    const model = editorRef.current?.getModel();
    const monaco = monacoRef.current;
    if (!model || !monaco) return;
    monaco.editor.setModelMarkers(
      model,
      'graphql-eslint',
      lintMessages.map(message => ({
        code: '',
        source: '',
        startColumn: message.endColumn == null ? (message.column += 1) : message.column,
        startLineNumber: message.line,
        endColumn: message.endColumn || message.column,
        endLineNumber: message.endLine || message.line,
        severity: 8,
        message: message.message,
      })),
    );
  }, [lintMessages, editorMounted]);

  return (
    <div className="grow overflow-hidden border-l dark:border-neutral-800 md:w-0">
      <div className="truncate border-b bg-gray-100 px-4 py-2 text-xs text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-200">
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
          setEditorMounted(true);
        }}
        onChange={(value = '') => onChange(value)}
      />
      <div
        className={clsx(
          'nextra-scrollbar flex flex-col gap-2 overflow-y-auto border-t p-4 dark:border-neutral-800',
          '[&>div>div:last-child]:leading-5 [&>div]:mt-0 [&>div]:whitespace-pre-wrap',
        )}
        style={{ height }}
      >
        {lintMessages.map(({ message, line, column, ruleId }) => (
          <Callout
            key={`${line}:${column}:${message}`}
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
            {!!ruleId && (
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
