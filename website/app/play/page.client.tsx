'use client';

import { FC, ReactNode, useRef } from 'react';
import debounce from 'lodash.debounce';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { ConfigName, configs, rules } from '@graphql-eslint/eslint-plugin';
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

function useDebouncedQueryParams<TypeToEncode, TypeFromDecode = TypeToEncode>(
  ...args: Parameters<typeof useQueryParam<TypeToEncode, TypeFromDecode>>
): ReturnType<typeof useQueryParam<TypeToEncode, TypeFromDecode>> {
  const [query, setQuery] = useQueryParam(...args);
  const fn = useRef<typeof setQuery>();
  fn.current ||= debounce(setQuery, 500);

  return [query, fn.current];
}

export const ClientPage: FC<{
  defaultSchema: string;
  defaultOperation: string;
  children: ReactNode;
  headingClass: string;
}> = ({ defaultSchema, defaultOperation, children, headingClass }) => {
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
  const [schema, setSchema] = useDebouncedQueryParams('s', withDefault(StringParam, defaultSchema));
  const [operation, setOperation] = useDebouncedQueryParams(
    'o',
    withDefault(StringParam, defaultOperation),
  );

  return (
    <>
      <div className="nextra-scrollbar flex w-72 flex-col gap-4 overflow-y-auto p-5 text-xs">
        {children}
        <div>
          <h3 className={headingClass}>SCHEMA CONFIG</h3>
          <Select
            options={schemaConfigsOptions}
            value={schemaConfig}
            onChange={setSchemaConfig}
            placeholder="Choose a schema config"
          />
        </div>
        <div>
          <h3 className={headingClass}>SCHEMA RULE</h3>
          <Select
            options={schemaRulesOptions}
            value={schemaRule}
            onChange={setSchemaRule}
            placeholder="Choose a schema rule"
          />
        </div>
        <hr className="dark:border-neutral-800" />
        <div>
          <h3 className={headingClass}>OPERATION CONFIG</h3>
          <Select
            options={operationsConfigsOptions}
            value={operationConfig}
            onChange={setOperationConfig}
            placeholder="Choose an operation config"
          />
        </div>
        <div>
          <h3 className={headingClass}>OPERATION RULE</h3>
          <Select
            options={operationsRulesOptions}
            value={operationRule}
            onChange={setOperationRule}
            placeholder="Choose an operation rule"
          />
        </div>
      </div>
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={schema}
        fileName="schema.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          // @ts-expect-error -- TODO: fix type error
          ...(schemaConfig && configs[`flat/${schemaConfig}`].rules),
          ...(schemaRule && {
            [`@graphql-eslint/${schemaRule}`]:
              // @ts-expect-error -- TODO: fix type error
              configs['flat/schema-all'].rules[`@graphql-eslint/${schemaRule}`],
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
          ...(operationConfig && configs[`flat/${operationConfig}`].rules),
          ...(operationRule && {
            [`@graphql-eslint/${operationRule}`]:
              // @ts-expect-error -- TODO: fix type error
              configs['flat/operations-all'].rules[`@graphql-eslint/${operationRule}`],
          }),
        }}
        onChange={setOperation}
      />
    </>
  );
};
