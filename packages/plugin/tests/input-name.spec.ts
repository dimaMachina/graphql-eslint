import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/input-name';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('input-name', rule, {
  valid: [
    {
      code: 'type Mutation { SetMessage(input: SetMessageInput): String }',
      options: [{ checkInputType: true }],
    },
    {
      code:
        'type Mutation { CreateMessage(input: CreateMessageInput): String DeleteMessage(input: DeleteMessageInput): Boolean }',
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
  ],
  invalid: [
    {
      code: 'type Mutation { SetMessage(message: String): String }',
      options: [{ checkInputType: true }],
      errors: [
        { message: 'Input "message" should be called "input"' },
        { message: 'InputType "String" name should be "SetMessageInput"' },
      ],
    },
    {
      code: 'type Mutation { SetMessage(input: String): String }',
      options: [{ checkInputType: true }],
      errors: [{ message: 'InputType "String" name should be "SetMessageInput"' }],
    },
    {
      code: 'type Mutaton { SetMessage(hello: SetMessageInput): String }',
      options: [{ checkInputType: true }],
      errors: [{ message: 'Input "hello" should be called "input"' }],
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
  ],
});
