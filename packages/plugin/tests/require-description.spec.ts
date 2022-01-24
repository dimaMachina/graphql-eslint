import { GraphQLRuleTester } from '../src';
import rule, { RequireDescriptionRuleConfig } from '../src/rules/require-description';

const ruleTester = new GraphQLRuleTester();

const ERROR = { message: 'Description is required for nodes of type "OperationDefinition"' };
const OPERATION = { OperationDefinition: true };

ruleTester.runGraphQLTests<[RequireDescriptionRuleConfig]>('require-description', rule, {
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
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        input SalaryDecimalOperatorsFilterUpdateOneUserInput {
          gt: BSONDecimal
          gte: BSONDecimal
          lt: BSONDecimal
          lte: BSONDecimal
          ne: BSONDecimal
          in: [BSONDecimal]
          nin: [BSONDecimal]
        }
      `,
      options: [{ InputValueDefinition: true }],
      errors: 7,
    },
    {
      code: /* GraphQL */ `
        enum EnumUserLanguagesSkill {
          basic
          fluent
          native
        }
      `,
      options: [{ EnumValueDefinition: true }],
      errors: [
        { message: 'Description is required for nodes of type "EnumValueDefinition"' },
        { message: 'Description is required for nodes of type "EnumValueDefinition"' },
        { message: 'Description is required for nodes of type "EnumValueDefinition"' },
      ],
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
      errors: 2,
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
      errors: [ERROR],
    },
    {
      name: 'should validate mutation',
      code: 'mutation { test }',
      options: [OPERATION],
      errors: [ERROR],
    },
    {
      name: 'should validate subscription',
      code: 'subscription { test }',
      options: [OPERATION],
      errors: [ERROR],
    },
    {
      name: 'should report because skips previous comment that starts with `eslint`',
      code: /* GraphQL */ `
        # eslint-disable-next-line semi
        query {
          foo
        }
      `,
      options: [OPERATION],
      errors: [ERROR],
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
      errors: [ERROR],
    },
  ],
});
