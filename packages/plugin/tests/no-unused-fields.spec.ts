import { rule } from '../src/rules/no-unused-fields';

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

const ruleTester = new RuleTester({ schema: SCHEMA });

ruleTester.run('no-unused-fields', rule, {
  valid: [
    {
      code: SCHEMA,
      parserOptions: {
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
        documents: /* GraphQL */ `
          {
            user(id: 1) {
              id
            }
          }
        `,
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
        documents: /* GraphQL */ `
          {
            user(id: 1) {
              id
            }
          }
        `,
      },
      errors: [{ message: 'Field "deleteUser" is unused' }],
    },
  ],
});
