import { ReactElement, KeyboardEvent, useEffect, useRef, useState, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from '@theguild/components';
import eslintPkgJson from 'eslint/package.json';
import { Linter } from 'eslint';
import graphqlESLintPkgJson from '@graphql-eslint/eslint-plugin/package.json';
import { Select, Callout } from '@theguild/components';
import { rules, flatConfigs, parseForESLint } from '@graphql-eslint/eslint-plugin';
// @ts-ignore -- we patched this export
import pkg from 'eslint/linter';
import { asArray } from '@graphql-tools/utils';

const _Linter: typeof Linter = pkg.Linter;

const schemaConfigs = ['schema-recommended', 'schema-all', 'relay'];
const operationsConfigs = ['operations-recommended', 'operations-all'];

const schemaRulesOptions = Object.entries(rules)
  .filter(([, rule]) => asArray(rule.meta.docs!.category).includes('Schema'))
  .map(([ruleId]) => ({ key: ruleId, name: ruleId }));
const operationsRulesOptions = Object.entries(rules)
  .filter(([, rule]) => asArray(rule.meta.docs!.category).includes('Schema'))
  .map(([ruleId]) => ({ key: ruleId, name: ruleId }));

const schemaConfigsOptions = schemaConfigs.map(name => ({ key: name, name }));
const operationsConfigsOptions = operationsConfigs.map(name => ({ key: name, name }));

function dedent(code: string) {
  return code
    .split('\n')
    .map(line => line.slice(2))
    .join('\n')
    .trimStart();
}

const SCHEMA = dedent(/* GraphQL*/ `
  scalar DateTime

  type Post {
    id: ID!
    title: String
    createdAt: DateTime
    modifiedAt: DateTime
  }

  type Query {
    post: Post!
    posts: [Post!]
  }
`);

const OPERATION = dedent(/* GraphQL */ `
  query {
    posts {
      id
      title
    }
  }
`);

// export const getServerSideProps: GetServerSideProps<PlayPageProps> = async () => {
//   const { rules, parseForESLint, flatConfigs } = await import('@graphql-eslint/eslint-plugin');
//   // @ts-expect-error we need to wait when ESLint publish correct types
//   const { FlatESLint } = (await import('eslint/use-at-your-own-risk')) as { FlatESLint: any };
//
//   const eslint = new FlatESLint({
//     overrideConfigFile: true,
//     overrideConfig: [
//       {
//         files: ['*.graphql'],
//         languageOptions: {
//           parser: { parseForESLint },
//           parserOptions: {
//             skipGraphQLConfig: true,
//             schema: SCHEMA,
//             operations: OPERATION,
//           },
//         },
//         plugins: {
//           '@graphql-eslint': { rules },
//         },
//         rules: flatConfigs['schema-all'].rules,
//       },
//     ],
//   });
//
//   return {
//     props: {
//       rules: Object.keys(rules),
//       schemaOutput: await eslint.lintText(SCHEMA, { filePath: 'schema.graphql' }),
//       operationOutput: await eslint.lintText(OPERATION, { filePath: 'operation.graphql' }),
//     },
//   };
// };

type SelectOption = {
  key: string;
  name: ReactElement | string;
};

const linter = new _Linter();
linter.defineParser('@graphql-eslint/eslint-plugin', { parseForESLint });
for (const [ruleId, rule] of Object.entries(rules)) {
  linter.defineRule(`@graphql-eslint/${ruleId}`, rule as any);
}

export function PlayPage(): ReactElement {
  const schemaEditorRef = useRef<any>(null);
  const operationEditorRef = useRef<any>(null);

  const { resolvedTheme } = useTheme();
  const [selectedSchemaRule, setSelectedSchemaRule] = useState<SelectOption>({
    key: '',
    name: 'Choose a schema rule',
  });
  const [selectedSchemaConfig, setSelectedSchemaConfig] = useState<SelectOption>({
    key: '',
    name: 'Choose a schema config',
  });
  const [selectedOperationRule, setSelectedOperationRule] = useState<SelectOption>({
    key: '',
    name: 'Choose a schema rule',
  });
  const [selectedOperationConfig, setSelectedOperationConfig] = useState<SelectOption>({
    key: '',
    name: 'Choose a schema config',
  });
  const [schema, setSchema] = useState(SCHEMA);
  const [operation, setOperation] = useState(OPERATION);
  // const handleSchemaRuleChange = useCallback((option: SelectOption) => {}, []);
  // const handleSchemaConfigChange = useCallback((option: SelectOption) => {}, []);
  // const handleOperationRuleChange = useCallback((option: SelectOption) => {}, []);
  // const handleOperationConfigChange = useCallback((option: SelectOption) => {}, []);

  let schemaResult = linter.verify(
    schema,
    {
      parser: '@graphql-eslint/eslint-plugin',
      // extends: `plugin:@graphql-eslint/schema-recommended`,
      parserOptions: {
        schema,
        documents: operation,
      },
      rules: {
        ...(selectedSchemaConfig.key && flatConfigs[selectedSchemaConfig.key].rules),
        ...(selectedSchemaRule.key && flatConfigs['schema-all'].rules[selectedSchemaRule.key]),
      },
    },
    'schema.graphql',
  );
  let operationResult = linter.verify(
    operation,
    {
      parser: '@graphql-eslint/eslint-plugin',
      // extends: `plugin:@graphql-eslint/schema-recommended`,
      parserOptions: {
        schema,
        documents: operation,
      },
      rules: {
        ...(selectedOperationConfig.key && flatConfigs[selectedOperationConfig.key].rules),
        ...(selectedOperationConfig.key &&
          flatConfigs['operations-all'].rules[selectedOperationConfig.key]),
      },
    },
    'operation.graphql',
  );

  useEffect(() => {
    // console.log(schemaEditorRef.current);
    // var model = schemaEditorRef.current?.getModel();
    // console.log(model, model?.deltaDecorations);
    // model?.deltaDecorations(
    //   [],
    //   [
    //     {
    //       range: [0, 10],
    //       options: {
    //         isWholeLine: true,
    //         inlineClassName: 'highlight',
    //       },
    //     },
    //   ],
    // );
  }, [schemaEditorRef.current]);
  console.log(schemaResult);
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-var(--nextra-navbar-height)*2)]">
      <div className="w-[350px] p-6">
        <div>
          Versioning
          <p>ESLint Version {eslintPkgJson.version}</p>
          <p>GraphQL-ESLint Version {graphqlESLintPkgJson.version}</p>
        </div>
        <div>
          Schema Rules
          <Select
            options={schemaRulesOptions}
            selected={selectedSchemaRule}
            onChange={setSelectedSchemaRule}
          />
        </div>
        <div>
          Schema Config
          <Select
            options={schemaConfigsOptions}
            selected={selectedSchemaConfig}
            onChange={setSelectedSchemaConfig}
          />
        </div>
        <div>
          Operation Rules
          <Select
            options={operationsRulesOptions}
            selected={selectedOperationRule}
            onChange={setSelectedOperationRule}
          />
        </div>
        <div>
          Operation Config
          <Select
            options={operationsConfigsOptions}
            selected={selectedOperationConfig}
            onChange={setSelectedOperationConfig}
          />
        </div>

        <button className="mt-6">Download this config</button>
      </div>
      {Object.entries({ schema, operation }).map(([key, value]) => (
        <div
          key={key}
          className="grow w-0 nx-bg-primary-700/5 dark:nx-bg-primary-300/10 overflow-hidden border-l dark:nx-border-neutral-800"
        >
          <div className="h-full">
            <div className="nx-truncate nx-bg-primary-700/5 nx-py-2 nx-px-4 nx-text-xs nx-text-gray-700 dark:nx-bg-primary-300/10 dark:nx-text-gray-200">
              {`${key.toLowerCase()}.graphql`}
            </div>
            <Editor
              height="calc(50% - 17px)"
              language="graphql"
              theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
              defaultValue={value}
              onMount={(editor, monaco) => {
                // here is the editor instance
                // you can store it in `useRef` for further usage
                if (key === 'schema') {
                  schemaEditorRef.current = editor;
                } else {
                  operationEditorRef.current = editor;
                }
              }}
              onChange={key === 'schema' ? setSchema : setOperation}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
            <div className="px-6 h-[calc(50%-17px)] overflow-y-auto nextra-scrollbar border-t dark:nx-border-neutral-800">
              {(key === 'schema' ? schemaResult : operationResult).map(
                ({ message, line, column }) => (
                  <Callout key={`${message}-${line}-${column}`} type="error" emoji="❌">
                    {message}
                  </Callout>
                ),
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
