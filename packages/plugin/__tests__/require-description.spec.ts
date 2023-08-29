import { rule, RULE_ID, RuleOptions } from '../src/rules/require-description';
import { ParserOptionsForTests, ruleTester } from './test-utils';

const OPERATION = { OperationDefinition: true };

ruleTester.run<RuleOptions>('require-description', rule, {
  valid: [
    {
      code: /* GraphQL */ `
        enum EnumUserLanguagesSkill {
          """
          basic
          """
          basic
          """
          fluent
          """
          fluent
          """
          native
          """
          native
        }
      `,
      options: [{ EnumValueDefinition: true }],
    },
    {
      code: /* GraphQL */ `
        input SalaryDecimalOperatorsFilterUpdateOneUserInput {
          """
          gt
          """
          gt: BSONDecimal
          """
          in
          """
          in: [BSONDecimal]
          " nin "
          nin: [BSONDecimal]
        }
      `,
      options: [{ InputValueDefinition: true }],
    },
    {
      code: /* GraphQL */ `
        " Test "
        type CreateOneUserPayload {
          "Created document ID"
          recordId: MongoID

          "Created document"
          record: User
        }
      `,
      options: [{ types: true, FieldDefinition: true }],
    },
    {
      code: /* GraphQL */ `
        # OK
        query {
          test
        }
      `,
      options: [OPERATION],
    },
    {
      code: /* GraphQL */ `
        # ignore fragments
        fragment UserFields on User {
          id
        }
      `,
      options: [OPERATION],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          "Get user"
          user(id: ID!): User
        }
      `),
      options: [{ rootField: true }],
    },
    {
      ...useSchema('type Query'),
      options: [{ rootField: true }],
    },
  ],
  invalid: [
    {
      code: 'type User { id: ID }',
      options: [{ ObjectTypeDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'interface Node { id: ID! }',
      options: [{ InterfaceTypeDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'enum Role { ADMIN }',
      options: [{ EnumTypeDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'scalar Email',
      options: [{ ScalarTypeDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'input CreateUserInput { email: Email! }',
      options: [{ InputObjectTypeDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'union Media = Book | Movie',
      options: [{ UnionTypeDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'directive @auth(requires: Role!) on FIELD_DEFINITION',
      options: [{ DirectiveDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'type User { email: Email! }',
      options: [{ FieldDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'input CreateUserInput { email: Email! }',
      options: [{ InputValueDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      code: 'enum Role { ADMIN }',
      options: [{ EnumValueDefinition: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      name: 'should disable description for ObjectTypeDefinition',
      code: /* GraphQL */ `
        type CreateOneUserPayload {
          recordId: MongoID
          record: User
        }
      `,
      options: [
        {
          types: true,
          ObjectTypeDefinition: false,
          FieldDefinition: true,
        },
      ],
      errors: [{ messageId: RULE_ID }, { messageId: RULE_ID }],
    },
    {
      name: 'should report because of linesBefore !== 1',
      code: /* GraphQL */ `
        # linesBefore !== 1

        query {
          foo
        }
      `,
      options: [OPERATION],
      errors: [{ messageId: RULE_ID }],
    },
    {
      name: 'should validate mutation',
      code: 'mutation createUser { foo }',
      options: [OPERATION],
      errors: [{ messageId: RULE_ID }],
    },
    {
      name: 'should validate subscription',
      code: 'subscription commentAdded { foo }',
      options: [OPERATION],
      errors: [{ messageId: RULE_ID }],
    },
    {
      name: 'should report because skips comment that starts with `eslint`',
      code: /* GraphQL */ `
        # eslint-disable-next-line semi
        query {
          foo
        }
      `,
      options: [OPERATION],
      errors: [{ messageId: RULE_ID }],
    },
    {
      name: 'should ignore comments before fragment definition',
      code: /* GraphQL */ `
        # BAD
        fragment UserFields on User {
          id
        }

        query {
          user {
            ...UserFields
          }
        }
      `,
      options: [OPERATION],
      errors: [{ messageId: RULE_ID }],
    },
    {
      ...useSchema('type Query { user(id: String!): User! }'),
      options: [{ rootField: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      ...useSchema('type Mutation { createUser(id: [ID!]!): User! }'),
      options: [{ rootField: true }],
      errors: [{ messageId: RULE_ID }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type MySubscription {
          users: [User!]!
        }
        schema {
          subscription: MySubscription
        }
      `),
      options: [{ rootField: true }],
      errors: [{ messageId: RULE_ID }],
    },
  ],
});

function useSchema(code: string) {
  return {
    code,
    parserOptions: {
      graphQLConfig: {
        schema: /* GraphQL */ `
          type User {
            id: ID!
          }

          ${code}
        `,
      },
    } satisfies ParserOptionsForTests,
  };
}
