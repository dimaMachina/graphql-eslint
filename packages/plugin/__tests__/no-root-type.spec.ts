import { rule, RuleOptions } from '../src/rules/no-root-type';
import { ParserOptionsForTests, ruleTester } from './test-utils';

const useSchema = (code: string, schema = '') => ({
  code,
  parserOptions: {
    graphQLConfig: {
      schema: schema + code,
    },
  } satisfies ParserOptionsForTests,
});

ruleTester.run<RuleOptions>('no-root-type', rule, {
  valid: [
    {
      ...useSchema('type Query'),
      options: [{ disallow: ['mutation', 'subscription'] }],
    },
  ],
  invalid: [
    {
      ...useSchema('type Mutation'),
      name: 'disallow mutation',
      options: [{ disallow: ['mutation'] }],
      errors: [{ message: 'Root type `Mutation` is forbidden.' }],
    },
    {
      ...useSchema('type Subscription'),
      name: 'disallow subscription',
      options: [{ disallow: ['subscription'] }],
      errors: [{ message: 'Root type `Subscription` is forbidden.' }],
    },
    {
      ...useSchema('extend type Mutation { foo: ID }', 'type Mutation'),
      name: 'disallow with extend',
      options: [{ disallow: ['mutation'] }],
      errors: [{ message: 'Root type `Mutation` is forbidden.' }],
    },
    {
      ...useSchema('type MyMutation', 'schema { mutation: MyMutation }'),
      name: 'disallow when root type name is renamed',
      options: [{ disallow: ['mutation'] }],
      errors: [{ message: 'Root type `MyMutation` is forbidden.' }],
    },
  ],
});
