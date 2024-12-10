import { RuleTester } from '@theguild/eslint-rule-tester';
import { DEFAULT_CONFIG, ParserOptionsForTests } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

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

const ruleTester = new RuleTester<ParserOptionsForTests>({
  languageOptions: {
    ...DEFAULT_CONFIG.languageOptions,
    parserOptions: {
      graphQLConfig: {
        schema: SCHEMA,
      },
    },
  },
});

const example = rule.meta!.docs!.examples!.find(example => example.title.includes('ignoring'));
const [RELAY_SCHEMA, RELAY_QUERY] = example!.code.split('### 2️⃣ YOUR QUERY');

ruleTester.run('no-unused-fields', rule, {
  valid: [
    {
      code: SCHEMA,
      parserOptions: {
        graphQLConfig: {
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
    {
      name: 'should do not report unused fields for Relay',
      options: example!.usage,
      code: RELAY_SCHEMA,
      parserOptions: {
        graphQLConfig: {
          documents: RELAY_QUERY,
          schema: RELAY_SCHEMA,
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
