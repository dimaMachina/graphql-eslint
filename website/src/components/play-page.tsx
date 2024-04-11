import { ReactElement, useRef } from 'react';
import { clsx } from 'clsx';
import { Linter } from 'eslint';
import debounce from 'lodash.debounce';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { ConfigName, flatConfigs, rules } from '@graphql-eslint/eslint-plugin';
import graphqlESLintPkgJson from '@graphql-eslint/eslint-plugin/package.json';
import { asArray } from '@graphql-tools/utils';
import { GraphQLEditor } from './graphql-editor';
import { Select } from './select';

const schemaConfigs: ReadonlyArray<ConfigName> = [
  'schema-recommended',
  'schema-all',
  'schema-relay',
] as const;
const operationsConfigs: ReadonlyArray<ConfigName> = [
  'operations-recommended',
  'operations-all',
] as const;

const schemaRulesOptions = Object.entries(rules)
  .filter(([, rule]) => asArray(rule.meta.docs!.category).includes('Schema'))
  .map(([ruleId]) => ({ key: ruleId, name: ruleId }))
  .sort(({ key: a }, { key: b }) => a.localeCompare(b));
const operationsRulesOptions = Object.entries(rules)
  .filter(([, rule]) => asArray(rule.meta.docs!.category).includes('Operations'))
  .map(([ruleId]) => ({ key: ruleId, name: ruleId }))
  .sort(({ key: a }, { key: b }) => a.localeCompare(b));

const schemaConfigsOptions = schemaConfigs.map(name => ({ key: name, name }));
const operationsConfigsOptions = operationsConfigs.map(name => ({ key: name, name }));

function dedent(code: string) {
  return code
    .split('\n')
    .map(line => line.slice(2))
    .join('\n')
    .trimStart();
}

const DEFAULT_SCHEMA = dedent(/* GraphQL*/ `
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

const DEFAULT_OPERATION = dedent(/* GraphQL */ `
  query {
    posts {
      id
      title
    }
  }
`);

function useDebouncedQueryParams<TypeToEncode, TypeFromDecode = TypeToEncode>(
  ...args: Parameters<typeof useQueryParam<TypeToEncode, TypeFromDecode>>
): ReturnType<typeof useQueryParam<TypeToEncode, TypeFromDecode>> {
  const [query, setQuery] = useQueryParam(...args);
  const fn = useRef<typeof setQuery>();
  fn.current ||= debounce(setQuery, 500);

  return [query, fn.current];
}

const classes = {
  heading: clsx('font-medium mb-2'),
};

export function PlayPage(): ReactElement {
  const [schemaConfig, setSchemaConfig] = useDebouncedQueryParams(
    'sc',
    withDefault(StringParam, 'schema-recommended'),
  );
  const [schemaRule, setSchemaRule] = useDebouncedQueryParams<string>('sr');
  const [operationConfig, setOperationConfig] = useDebouncedQueryParams(
    'oc',
    withDefault(StringParam, 'operations-recommended'),
  );
  const [operationRule, setOperationRule] = useDebouncedQueryParams<string>('or');
  const [schema, setSchema] = useDebouncedQueryParams(
    's',
    withDefault(StringParam, DEFAULT_SCHEMA),
  );
  const [operation, setOperation] = useDebouncedQueryParams(
    'o',
    withDefault(StringParam, DEFAULT_OPERATION),
  );

  return (
    <div
      className={clsx(
        'h-[calc(100dvh-var(--nextra-navbar-height))]',
        'flex flex-row bg-gradient-to-br from-fuchsia-200/60 via-pink-300/60 to-purple-300/60 dark:from-pink-800/30 dark:via-fuchsia-900/30 dark:to-purple-800/30 max-md:min-w-[1280px]',
      )}
    >
      <div className="nextra-scrollbar flex w-72 flex-col gap-4 overflow-y-auto p-5 text-xs">
        <div>
          <h3 className={classes.heading}>VERSIONING</h3>
          <span className="flex justify-between text-sm">
            <span>ESLint</span>
            <span>{Linter.version}</span>
          </span>
          <span className="flex justify-between text-sm">
            <span>GraphQL-ESLint</span>
            <span>{graphqlESLintPkgJson.version}</span>
          </span>
        </div>
        <div>
          <h3 className={classes.heading}>SCHEMA CONFIG</h3>
          <Select
            options={schemaConfigsOptions}
            value={schemaConfig}
            onChange={setSchemaConfig}
            placeholder="Choose a schema config"
          />
        </div>
        <div>
          <h3 className={classes.heading}>SCHEMA RULE</h3>
          <Select
            options={schemaRulesOptions}
            value={schemaRule}
            onChange={setSchemaRule}
            placeholder="Choose a schema rule"
          />
        </div>
        <hr className="dark:border-neutral-800" />
        <div>
          <h3 className={classes.heading}>OPERATION CONFIG</h3>
          <Select
            options={operationsConfigsOptions}
            value={operationConfig}
            onChange={setOperationConfig}
            placeholder="Choose an operation config"
          />
        </div>
        <div>
          <h3 className={classes.heading}>OPERATION RULE</h3>
          <Select
            options={operationsRulesOptions}
            value={operationRule}
            onChange={setOperationRule}
            placeholder="Choose an operation rule"
          />
        </div>
        {/*<Button className="mt-auto">Download this config</Button>*/}
      </div>
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={schema}
        fileName="schema.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          // @ts-expect-error -- TODO: fix type error
          ...(schemaConfig && flatConfigs[schemaConfig].rules),
          ...(schemaRule && {
            [`@graphql-eslint/${schemaRule}`]:
              // @ts-expect-error -- TODO: fix type error
              flatConfigs['schema-all'].rules[`@graphql-eslint/${schemaRule}`],
          }),
        }}
        onChange={setSchema}
      />
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={operation}
        fileName="operation.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          // @ts-expect-error -- TODO: fix type error
          ...(operationConfig && flatConfigs[operationConfig].rules),
          ...(operationRule && {
            [`@graphql-eslint/${operationRule}`]:
              // @ts-expect-error -- TODO: fix type error
              flatConfigs['operations-all'].rules[`@graphql-eslint/${operationRule}`],
          }),
        }}
        onChange={setOperation}
      />
    </div>
  );
}
