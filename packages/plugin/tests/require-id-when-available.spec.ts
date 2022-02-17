import { GraphQLRuleTester, ParserOptions } from '../src';
import rule, { RequireIdWhenAvailableRuleConfig } from '../src/rules/require-id-when-available';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    hasId: HasId!
    noId: NoId!
    vehicles: [Vehicle!]!
    flying: [Flying!]!
  }

  type NoId {
    name: String!
  }

  interface Vehicle {
    id: ID!
  }

  type Car implements Vehicle {
    id: ID!
    mileage: Int
  }

  interface Flying {
    hasWings: Boolean!
  }

  type Bird implements Flying {
    id: ID!
    hasWings: Boolean!
  }

  type HasId {
    id: ID!
    _id: ID!
    name: String!
  }
`;

const USER_POST_SCHEMA = /* GraphQL */ `
  type User {
    id: ID
    name: String
    posts: [Post]
  }

  type Post {
    id: ID
    title: String
  }

  type Query {
    user: User
  }
`;

const WITH_SCHEMA = {
  parserOptions: <ParserOptions>{
    schema: TEST_SCHEMA,
    operations: '{ foo }',
  },
};

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests<[RequireIdWhenAvailableRuleConfig]>('require-id-when-available', rule, {
  valid: [
    {
      name: 'should completely ignore FragmentDefinition',
      code: /* GraphQL */ `
        fragment UserFields on User {
          name
          posts {
            title
          }
        }
      `,
      parserOptions: {
        schema: USER_POST_SCHEMA,
        operations: '{ foo }',
      },
    },
    {
      name: "should ignore checking selections on OperationDefinition as it's redundant check",
      code: '{ foo }',
      parserOptions: {
        schema: 'type Query { id: ID }',
        operations: '{ foo }',
      },
    },
    { ...WITH_SCHEMA, code: '{ noId { name } }' },
    { ...WITH_SCHEMA, code: '{ hasId { id name } }' },
    {
      name: 'should find selection in fragment',
      code: '{ hasId { ...HasIdFields } }',
      parserOptions: {
        schema: TEST_SCHEMA,
        operations: 'fragment HasIdFields on HasId { id }',
      },
    },
    { ...WITH_SCHEMA, code: '{ vehicles { id ...on Car { id mileage } } }' },
    { ...WITH_SCHEMA, code: '{ vehicles { ...on Car { id mileage } } }' },
    { ...WITH_SCHEMA, code: '{ flying { ...on Bird { id } } }' },
    {
      ...WITH_SCHEMA,
      code: '{ hasId { name } }',
      options: [{ fieldName: 'name' }],
    },
    {
      ...WITH_SCHEMA,
      code: '{ vehicles { id ...on Car { mileage } } }',
    },
    {
      ...WITH_SCHEMA,
      name: 'support multiple id field names',
      code: '{ hasId { _id } }',
      options: [{ fieldName: ['id', '_id'] }],
    },
    {
      name: 'should work with nested fragments',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        schema: USER_POST_SCHEMA,
        operations: `
          fragment UserLightFields on User {
            id
          }
          fragment UserFullFields on User {
            ...UserLightFields
            name
          }
        `,
      },
    },
    {
      name: 'should work with nested fragments n level also',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        schema: USER_POST_SCHEMA,
        operations: `
          fragment UserLightFields on User {
            id
          }
          fragment UserMediumFields on User {
            ...UserLightFields
            name
          }
          fragment UserFullFields on User {
            ...UserMediumFields
            name
          }
        `,
      },
    },
  ],
  invalid: [
    // TODO: Improve this
    // {
    // name: 'should report an error about missing "posts.id" selection',
    // code: '{ user { id ...UserFields } }',
    // errors: [{ message: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    // parserOptions: {
    //   schema: USER_POST_SCHEMA,
    //   operations: 'fragment UserFields on User { posts { title } }'
    // },
    // },
    {
      ...WITH_SCHEMA,
      code: '{ hasId { name } }',
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      ...WITH_SCHEMA,
      code: '{ hasId { id } }',
      options: [{ fieldName: 'name' }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      ...WITH_SCHEMA,
      name: 'support multiple id field names',
      code: '{ hasId { name } }',
      options: [{ fieldName: ['id', '_id'] }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      name: 'should not work with n nested fragments if you never get the id',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        schema: USER_POST_SCHEMA,
        operations: `
          fragment UserLightFields on User {
            name
          }
          fragment UserMediumFields on User {
            ...UserLightFields
            name
          }
          fragment UserFullFields on User {
            ...UserMediumFields
            name
          }
        `,
      },
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
  ],
});
