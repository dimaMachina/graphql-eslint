import { rule } from '../src/rules/no-unused-fields';
// @ts-expect-error
import { RuleTester } from '@theguild/eslint-rule-tester';
import { DEFAULT_CONFIG } from './test-utils';
import { ParserOptions } from '../src/types';

const SCHEMA = /* GraphQL */ `
  type User {
    id: ID!
    firstName: String
    lastName: String
    age: Int
    address: Address
  }

  type Address {
    country: String!
    zip: String!
    events: [Event!]!
  }

  enum EventName {
    CREATE
    UPDATE
    DELETE
  }

  type Event {
    by: User
    name: EventName
    data: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!): User
    deleteUser(id: ID!): User
  }
`;

const ruleTester = new RuleTester<Partial<ParserOptions>>({
  ...DEFAULT_CONFIG,
  parserOptions: {
    graphQLConfig: {
      schema: SCHEMA,
    },
  },
});

ruleTester.run('no-unused-fields', rule, {
  valid: [
    {
      code: SCHEMA,
      parserOptions: {
        graphQLConfig: {
          schema: '',
          documents: /* GraphQL */ `
            {
              user(id: 1) {
                ... on User {
                  address {
                    zip
                    events {
                      ... on Event {
                        by {
                          id
                        }
                        can_rename: name
                        data
                      }
                    }
                  }
                }
              }
            }

            fragment UserFields on User {
              can_rename: firstName
              lastName
            }

            mutation {
              deleteUser(id: 2) {
                age
              }
              createUser(firstName: "Foo") {
                address {
                  country
                }
              }
            }
          `,
        },
      },
    },
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        type User {
          id: ID!
          firstName: String
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: '',
          documents: /* GraphQL */ `
            {
              user(id: 1) {
                id
              }
            }
          `,
        },
      },
      errors: [{ message: 'Field "firstName" is unused' }],
    },
    {
      code: /* GraphQL */ `
        type Query {
          user(id: ID!): User
        }

        type Mutation {
          deleteUser(id: ID!): User
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: '',
          documents: /* GraphQL */ `
            {
              user(id: 1) {
                id
              }
            }
          `,
        },
      },
      errors: [{ message: 'Field "deleteUser" is unused' }],
    },
  ],
});
