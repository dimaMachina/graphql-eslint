import { rule, RuleOptions } from '../src/rules/require-selections';
import { ParserOptionsForTests, ruleTester } from './test-utils';

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
    author: [User!]!
  }

  type Query {
    user: User
    userOrPost: UserOrPost
  }

  union UserOrPost = User | Post
`;

const WITH_SCHEMA = {
  parserOptions: {
    graphQLConfig: {
      schema: TEST_SCHEMA,
      documents: '{ foo }',
    },
  } satisfies ParserOptionsForTests,
};

const MESSAGE_ID = { messageId: 'require-selections' };

const DOCUMENT_WITH_UNION = /* GraphQL */ `
  {
    userOrPost {
      ... on User {
        title
      }
    }
  }
`;

ruleTester.run<RuleOptions, true>('require-selections', rule, {
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
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: '{ foo }',
        },
      },
    },
    {
      name: "should ignore checking selections on OperationDefinition as it's redundant check",
      code: '{ foo }',
      parserOptions: {
        graphQLConfig: {
          schema: 'type Query { id: ID }',
          documents: '{ foo }',
        },
      },
    },
    { ...WITH_SCHEMA, code: '{ noId { name } }' },
    { ...WITH_SCHEMA, code: '{ hasId { id name } }' },
    {
      name: 'should find selection in fragment',
      code: '{ hasId { ...HasIdFields } }',
      parserOptions: {
        graphQLConfig: {
          schema: TEST_SCHEMA,
          documents: 'fragment HasIdFields on HasId { id }',
        },
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
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
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
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
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
    },
    {
      name: 'should work with nested inline fragments n level',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
            fragment UserLightFields on User {
              ... on User {
                id
              }
            }
            fragment UserMediumFields on User {
              ...UserLightFields
            }
            fragment UserFullFields on User {
              ...UserMediumFields
            }
          `,
        },
      },
    },
    {
      name: 'should work with fragment spread inside inline fragments n level',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
            fragment UserFields on User {
              id
            }
            fragment UserLightFields on User {
              ... on User {
                ...UserFields
                name
              }
            }
            fragment UserMediumFields on User {
              name
              ...UserLightFields
            }
            fragment UserFullFields on User {
              name
              ...UserMediumFields
            }
          `,
        },
      },
    },
    {
      name: 'should work when `id` selected after fragment spread',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
            fragment UserFields on User {
              name
            }
            fragment UserFullFields on User {
              ... on User {
                ...UserFields
                id # order is matter
              }
            }
          `,
        },
      },
    },
    {
      name: 'should work when `id` selected after inline fragment',
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFullFields
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
            fragment UserFields on User {
              name
            }
            fragment UserFullFields on User {
              ... on User {
                ...UserFields
              }
              id # order is matter
            }
          `,
        },
      },
    },
    {
      name: 'should work when `id` is selected by an alias',
      ...WITH_SCHEMA,
      code: '{ hasId {  id: name } }',
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: '{ hasId { name } }',
      errors: [MESSAGE_ID],
    },
    {
      ...WITH_SCHEMA,
      code: '{ hasId { id } }',
      options: [{ fieldName: 'name' }],
      errors: [MESSAGE_ID],
    },
    {
      ...WITH_SCHEMA,
      name: 'support multiple id field names',
      code: '{ hasId { name } }',
      options: [{ fieldName: ['id', '_id'] }],
      errors: [MESSAGE_ID],
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
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
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
      },
      errors: [MESSAGE_ID],
    },
    {
      name: 'should report an error about missing `posts.id` field in fragment',
      code: '{ user { id ...UserFields } }',
      errors: [MESSAGE_ID],
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: 'fragment UserFields on User { posts { title } }',
        },
      },
    },
    {
      name: 'should report an error about missing `user.id`, `posts.id`, `author.id` and `authorPosts.id` selection',
      code: '{ user { ...UserFullFields } }',
      errors: [MESSAGE_ID, MESSAGE_ID, MESSAGE_ID, MESSAGE_ID],
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
            fragment UserFullFields on User {
              posts {
                author {
                  ...UserFields
                  authorPosts: posts {
                    title
                  }
                }
              }
            }
            fragment UserFields on User {
              name
            }
          `,
        },
      },
    },
    {
      name: 'should report an error with union',
      errors: [MESSAGE_ID],
      code: DOCUMENT_WITH_UNION,
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: DOCUMENT_WITH_UNION,
        },
      },
    },
    {
      name: 'should report an error with union and fragment spread',
      errors: [MESSAGE_ID],
      code: /* GraphQL */ `
        {
          userOrPost {
            ... on User {
              ...UserFields
            }
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: USER_POST_SCHEMA,
          documents: /* GraphQL */ `
            fragment UserFields on User {
              name
            }
          `,
        },
      },
    },
  ],
});
