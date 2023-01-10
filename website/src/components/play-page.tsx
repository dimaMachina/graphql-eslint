import { ReactElement, useState } from 'react';
import eslintPkgJson from 'eslint/package.json';
import graphqlESLintPkgJson from '@graphql-eslint/eslint-plugin/package.json';
import { Select } from '@theguild/components';
import { rules, flatConfigs } from '@graphql-eslint/eslint-plugin';
import { asArray } from '@graphql-tools/utils';
import { GraphQLEditor } from './graphql-editor';

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

type SelectOption = {
  key: string;
  name: ReactElement | string;
};

export function PlayPage(): ReactElement {
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
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-var(--nextra-navbar-height)-68px)]">
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
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={schema}
        fileName="schema.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          ...flatConfigs['schema-all'].rules,
          ...(selectedSchemaConfig.key && flatConfigs[selectedSchemaConfig.key].rules),
          ...(selectedSchemaRule.key && flatConfigs['schema-all'].rules[selectedSchemaRule.key]),
        }}
        onChange={(value = '') => setSchema(value)}
      />
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={operation}
        fileName="operation.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          ...flatConfigs['operations-all'].rules,
          ...(selectedOperationConfig.key && flatConfigs[selectedOperationConfig.key].rules),
          ...(selectedOperationRule.key &&
            flatConfigs['operations-all'].rules[selectedOperationRule.key]),
        }}
        onChange={(value = '') => setOperation(value)}
      />
    </div>
  );
}
