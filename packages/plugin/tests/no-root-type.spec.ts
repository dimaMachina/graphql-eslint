import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule } from '../src/rules/no-root-type';

const useSchema = (
  code: string,
  schema = '',
): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } => ({
  code,
  parserOptions: {
    schema: schema + code,
  },
});

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-root-type', rule, {
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
