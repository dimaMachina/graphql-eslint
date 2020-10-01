import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/require-description';
import { Kind } from 'graphql';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('require-description', rule, {
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
      options: [{ on: [Kind.ENUM_VALUE_DEFINITION] }],
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
      options: [{ on: [Kind.INPUT_VALUE_DEFINITION] }],
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
      options: [{ on: [Kind.OBJECT_TYPE_DEFINITION] }],
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
      options: [{ on: [Kind.INPUT_VALUE_DEFINITION] }],
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
      options: [
        {
          on: [Kind.ENUM_VALUE_DEFINITION],
        },
      ],
      errors: [
        { message: 'Description is required for nodes of type "EnumValueDefinition"' },
        { message: 'Description is required for nodes of type "EnumValueDefinition"' },
        { message: 'Description is required for nodes of type "EnumValueDefinition"' },
      ],
    },
    {
      code: /* GraphQL */ `
        type CreateOneUserPayload {
          recordId: MongoID
          record: User
        }
      `,
      options: [
        {
          on: [Kind.OBJECT_TYPE_DEFINITION, Kind.FIELD_DEFINITION],
        },
      ],
      errors: 3,
    },
  ],
});
