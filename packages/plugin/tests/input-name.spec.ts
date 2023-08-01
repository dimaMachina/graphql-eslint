import { rule, RuleOptions } from '../src/rules/input-name';
import { ruleTester } from './test-utils';

ruleTester.run<RuleOptions>('input-name', rule, {
  valid: [
    {
      code: 'type Mutation { SetMessage(input: SetMessageInput): String }',
      options: [{ checkInputType: true }],
    },
    {
      code: 'type Mutation { CreateMessage(input: CreateMessageInput): String DeleteMessage(input: DeleteMessageInput): Boolean }',
      options: [{ checkInputType: true }],
    },
    {
      code: 'type Mutation { CreateMessage(input: CreateMessageInput!): String }',
      options: [{ checkInputType: true }],
    },
    {
      code: 'type Mutation { CreateMessage(input: [CreateMessageInput]): String }',
      options: [{ checkInputType: true }],
    },
    'type Mutation { CreateMessage(input: String): String }',
    'extend type Mutation { CreateMessage(input: String): String }',
    'type Query { message(id: ID): Message }',
    'extend type Query { message(id: ID): Message }',
    {
      code: 'type Mutation { userCreate(input: UserCreateInput): String }',
      options: [{ checkInputType: true, caseSensitiveInputType: false }],
    },
    {
      code: 'type Mutation { userCreate(input: userCreateInput): String }',
      options: [{ checkInputType: true, caseSensitiveInputType: true }],
    },
    {
      code: 'type Mutation { SetMessage(input: NonConforming): String }',
      options: [{ checkMutations: false, checkInputType: true }],
    },
    {
      code: 'type Mutation { SetMessage(input: String): String }',
      options: [{ checkMutations: true, checkInputType: false }],
    },
    {
      code: 'type Query { getMessage(input: NonConforming): String }',
      options: [{ checkQueries: false, checkInputType: true }],
    },
    {
      code: 'type Query { getMessage(input: String): String }',
      options: [{ checkQueries: true, checkInputType: false }],
    },
  ],
  invalid: [
    {
      code: 'type Mutation { SetMessage(message: String): String }',
      options: [{ checkInputType: true }],
      errors: 2,
    },
    {
      code: 'type Mutation { SetMessage(input: String): String }',
      options: [{ checkInputType: true }],
      errors: 1,
    },
    {
      code: 'type Mutation { SetMessage(hello: SetMessageInput): String }',
      options: [{ checkInputType: true }],
      errors: 1,
    },
    {
      code: 'type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }',
      options: [{ checkInputType: true }],
      errors: 2,
    },
    {
      code: 'type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }',
      options: [{ checkInputType: true }],
      errors: 2,
    },
    {
      code: 'type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }',
      options: [{ checkInputType: true }],
      errors: 2,
    },
    {
      code: 'type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }',
      options: [{ checkInputType: true }],
      errors: 2,
    },
    {
      code: 'type Mutation { userCreate(record: String, test: String): String }',
      options: [{ checkInputType: true }],
      errors: 4,
    },
    {
      code: 'type Mutation { userCreate(record: String, test: String): String }',
      options: [{ checkInputType: false }],
      errors: 2,
    },
    {
      code: 'type Mutation { userCreate(input: String): String }',
      options: [{ checkInputType: true, caseSensitiveInputType: false }],
      errors: 1,
    },
    {
      code: 'type Mutation { userCreate(input: UserCreateInput): String }',
      options: [{ checkInputType: true, caseSensitiveInputType: true }],
      errors: 1,
    },
    {
      code: 'type Query { getUser(input: GetUserInput): String }',
      options: [{ checkQueries: true, checkInputType: true, caseSensitiveInputType: true }],
      errors: 1,
    },
  ],
});
