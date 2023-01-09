import { ReactElement, KeyboardEvent, useEffect, useRef, useState, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from '@theguild/components';
import eslintPkgJson from 'eslint/package.json';
import { ESLint } from 'eslint';
import graphqlESLintPkgJson from '@graphql-eslint/eslint-plugin/package.json';
import { Select, Callout } from '@theguild/components';
import * as graphqlESLint from '@graphql-eslint/eslint-plugin'
import { Linter } from 'eslint/linter'
console.log({Linter})
const rules = Object.keys(graphqlESLint.rules)
const configs = Object.keys(graphqlESLint.configs)

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

type PlayPageProps = {
  schemaOutput: ESLint.LintResult[];
  operationOutput: ESLint.LintResult[];
};
export function PlayPage({
  schemaOutput = [],
  operationOutput = [],
  ...props
}: PlayPageProps): ReactElement {
  const schemaEditorRef = useRef<any>(null);
  const operationEditorRef = useRef<any>(null);

  const rulesOptions = rules.map(ruleId => ({ key: ruleId, name: ruleId }));
  const configsOptions = configs.map(configName => ({ key: configName, name: configName }));

  const { resolvedTheme } = useTheme();
  const [selectedRule, setSelectedRule] = useState<SelectOption>({
    key: '',
    name: 'Choose a rule'
  });
  const [selectedConfig, setSelectedConfig] = useState<SelectOption>({
    key: '',
    name: 'Choose a config'
  });
  const handleRuleChange = useCallback((option: SelectOption) => {}, []);
  const handleConfigChange = useCallback((option: SelectOption) => {}, []);
  useEffect(() => {
    // console.log(schemaEditorRef.current);
    // var model = schemaEditorRef.current?.getModel();
    // console.log(model, model?.deltaDecorations);
    for (const msg of schemaOutput[0]?.messages || []) {
      console.log(msg);
    }
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

  return (
    <>
      {/*<style global jsx>*/}
      {/*  {`*/}
      {/*    .highlight {*/}
      {/*      background: red;*/}
      {/*    }*/}
      {/*  `}*/}
      {/*</style>*/}
      <div className="flex flex-col md:flex-row gap-0.5">
        {Object.entries({ SCHEMA, OPERATION }).map(([key, value]) => (
          <div
            key={key}
            className="grow nx-bg-primary-700/5 dark:nx-bg-primary-300/10 nx-rounded-t-xl overflow-hidden"
          >
            <div className="nx-truncate nx-bg-primary-700/5 nx-py-2 nx-px-4 nx-text-xs nx-text-gray-700 dark:nx-bg-primary-300/10 dark:nx-text-gray-200">
              {`${key.toLowerCase()}.graphql`}
            </div>
            <Editor
              height={400}
              language="graphql"
              theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
              defaultValue={value}
              onMount={(editor, monaco) => {
                // here is the editor instance
                // you can store it in `useRef` for further usage
                if (key === 'SCHEMA') {
                  schemaEditorRef.current = editor;
                } else {
                  operationEditorRef.current = editor;
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className="container flex">
        <div className="grow w-0">
          <div>
            Versioning
            <p>ESLint Version {eslintPkgJson.version}</p>
            <p>GraphQL-ESLint Version {graphqlESLintPkgJson.version}</p>
          </div>
          <div>
            Rules
            <Select options={rulesOptions} selected={selectedRule} onChange={handleRuleChange} />
            Total rules: {rules.length}
          </div>
          <div>
            Config
            <Select options={configsOptions} selected={selectedConfig} onChange={handleConfigChange} />
          </div>
        </div>
        <div className="grow w-0">
          {schemaOutput[0]?.messages.map(({ message }) => (
            <Callout type="error" emoji="❌">
              {message}
            </Callout>
          ))}
        </div>
      </div>
    </>
  );
}
