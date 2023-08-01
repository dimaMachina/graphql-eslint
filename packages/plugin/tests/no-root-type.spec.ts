import { ParserOptions } from '../src';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { rule, RuleOptions } from '../src/rules/no-root-type';

const useSchema = (
  code: string,
  schema = '',
): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } => ({
  code,
  parserOptions: {
    schema: schema + code,
  },
});

const ruleTester = new RuleTester();

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
