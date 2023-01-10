import { ReactElement, useRef } from 'react';
import { flatConfigs, rules } from '@graphql-eslint/eslint-plugin';
import graphqlESLintPkgJson from '@graphql-eslint/eslint-plugin/package.json';
import { asArray } from '@graphql-tools/utils';
import { clsx } from 'clsx';
import eslintPkgJson from 'eslint/package.json';
import debounce from 'lodash.debounce';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { GraphQLEditor } from './graphql-editor';
import { Select } from './select';
import { Button } from './button';

const schemaConfigs = ['schema-recommended', 'schema-all', 'relay'];
const operationsConfigs = ['operations-recommended', 'operations-all'];
let i = 0;
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
  console.info(++i, 'rerender');
  const [schemaConfig, setSchemaConfig] = useDebouncedQueryParams(
    'schemaConfig',
    withDefault(StringParam, ''),
  );
  const [operationConfig, setOperationConfig] = useDebouncedQueryParams(
    'operationConfig',
    withDefault(StringParam, ''),
  );
  const [schemaRule, setSchemaRule] = useDebouncedQueryParams(
    'schemaRule',
    withDefault(StringParam, ''),
  );
  const [operationRule, setOperationRule] = useDebouncedQueryParams(
    'operationRule',
    withDefault(StringParam, ''),
  );
  const [schema, setSchema] = useDebouncedQueryParams(
    'schema',
    withDefault(StringParam, DEFAULT_SCHEMA),
  );
  const [operation, setOperation] = useDebouncedQueryParams(
    'operation',
    withDefault(StringParam, DEFAULT_OPERATION),
  );

  return (
    <div className="flex h-[calc(100vh-var(--nextra-navbar-height)-68px)] flex-col bg-gradient-to-br from-pink-300/20 via-fuchsia-200/20 to-purple-300/20 dark:from-pink-800/20 dark:via-fuchsia-900/20 dark:to-purple-800/20 md:flex-row">
      <div className="nextra-scrollbar flex w-[300px] flex-col gap-4 overflow-y-auto p-6 text-xs">
        <div>
          <h3 className={classes.heading}>VERSIONING</h3>
          <span className="flex justify-between text-sm">
            <span>ESLint</span>
            <span>{eslintPkgJson.version}</span>
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
        <Button className="mt-6">Download this config</Button>
      </div>
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={schema}
        fileName="schema.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          ...(schemaConfig && flatConfigs[schemaConfig].rules),
          ...(schemaRule && flatConfigs['schema-all'].rules[schemaRule]),
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
          ...(operationConfig && flatConfigs[operationConfig].rules),
          ...(operationRule && flatConfigs['operations-all'].rules[operationRule]),
        }}
        onChange={setOperation}
      />
    </div>
  );
}
