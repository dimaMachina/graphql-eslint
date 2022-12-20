import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule, RuleOptions } from '../src/rules/require-description';

const ruleTester = new GraphQLRuleTester();
const OPERATION = { OperationDefinition: true };

ruleTester.runGraphQLTests<RuleOptions>('require-description', rule, {
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
      errors: [{ message: 'Description is required for `type User`.' }],
    },
    {
      code: 'interface Node { id: ID! }',
      options: [{ InterfaceTypeDefinition: true }],
      errors: [{ message: 'Description is required for `interface Node`.' }],
    },
    {
      code: 'enum Role { ADMIN }',
      options: [{ EnumTypeDefinition: true }],
      errors: [{ message: 'Description is required for `enum Role`.' }],
    },
    {
      code: 'scalar Email',
      options: [{ ScalarTypeDefinition: true }],
      errors: [{ message: 'Description is required for `scalar Email`.' }],
    },
    {
      code: 'input CreateUserInput { email: Email! }',
      options: [{ InputObjectTypeDefinition: true }],
      errors: [{ message: 'Description is required for `input CreateUserInput`.' }],
    },
    {
      code: 'union Media = Book | Movie',
      options: [{ UnionTypeDefinition: true }],
      errors: [{ message: 'Description is required for `union Media`.' }],
    },
    {
      code: 'directive @auth(requires: Role!) on FIELD_DEFINITION',
      options: [{ DirectiveDefinition: true }],
      errors: [{ message: 'Description is required for `directive @auth`.' }],
    },
    {
      code: 'type User { email: Email! }',
      options: [{ FieldDefinition: true }],
      errors: [{ message: 'Description is required for `User.email`.' }],
    },
    {
      code: 'input CreateUserInput { email: Email! }',
      options: [{ InputValueDefinition: true }],
      errors: [{ message: 'Description is required for `CreateUserInput.email`.' }],
    },
    {
      code: 'enum Role { ADMIN }',
      options: [{ EnumValueDefinition: true }],
      errors: [{ message: 'Description is required for `Role.ADMIN`.' }],
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
      errors: [
        { message: 'Description is required for `CreateOneUserPayload.recordId`.' },
        { message: 'Description is required for `CreateOneUserPayload.record`.' },
      ],
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
      errors: [{ message: 'Description is required for `query`.' }],
    },
    {
      name: 'should validate mutation',
      code: 'mutation createUser { foo }',
      options: [OPERATION],
      errors: [{ message: 'Description is required for `mutation createUser`.' }],
    },
    {
      name: 'should validate subscription',
      code: 'subscription commentAdded { foo }',
      options: [OPERATION],
      errors: [{ message: 'Description is required for `subscription commentAdded`.' }],
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
      errors: [{ message: 'Description is required for `query`.' }],
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
      errors: [{ message: 'Description is required for `query`.' }],
    },
    {
      ...useSchema('type Query { user(id: String!): User! }'),
      options: [{ rootField: true }],
      errors: [{ message: 'Description is required for `Query.user`.' }],
    },
    {
      ...useSchema('type Mutation { createUser(id: [ID!]!): User! }'),
      options: [{ rootField: true }],
      errors: [{ message: 'Description is required for `Mutation.createUser`.' }],
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
      errors: [{ message: 'Description is required for `MySubscription.users`.' }],
    },
  ],
});

function useSchema(code: string): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } {
  return {
    code,
    parserOptions: {
      schema: /* GraphQL */ `
        type User {
          id: ID!
        }

        ${code}
      `,
    },
  };
}
