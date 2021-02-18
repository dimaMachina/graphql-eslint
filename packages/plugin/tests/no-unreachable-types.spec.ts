import { GraphQLRuleTester } from '../src/testkit';
import { ParserOptions } from '../src/types';
import rule from '../src/rules/no-unreachable-types';

const ruleTester = new GraphQLRuleTester();

function useSchema(
  schema: string
): {
  code: string;
  parserOptions: ParserOptions;
} {
  return {
    parserOptions: {
      schema,
    },
    code: schema,
  };
}

ruleTester.runGraphQLTests('no-unreachable-types', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        me: User
      }

      type User {
        id: ID
        name: String
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        me: User
      }

      interface Address {
        city: String
      }

      type User implements Address {
        city: String
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        me: User!
      }

      interface User {
        name: String
      }

      type SuperUser implements User {
        address: String
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        node(id: ID!): Node!
      }

      interface Node {
        id: ID!
      }

      interface User implements Node {
        id: ID!
        name: String
      }

      type SuperUser implements User & Node {
        id: ID!
        name: String
        address: String
      }
    `),
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          me: String
        }

        type User {
          id: ID
          name: String
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        type Query {
          me: String
        }
      `,
      errors: [
        {
          message: `Type "User" is unreachable`,
        },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          users: [User]
        }

        type User {
          id: ID
          name: String
        }

        input UsersFilter {
          limit: Int
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        type Query {
          users: [User]
        }

        type User {
          id: ID
          name: String
        }
      `,
      errors: [
        {
          message: `Type "UsersFilter" is unreachable`,
        },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          me: User
        }

        type User {
          id: ID
          name: String
        }

        type Articles {
          id: ID
          title: String
          author: User
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql

        type Query {
          me: User
        }

        type User {
          id: ID
          name: String
        }
      `,
      errors: [
        {
          message: `Type "Articles" is unreachable`,
        },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        # normalize graphql

        type Query {
          me: User
        }

        type User {
          id: ID
          name: String
          articles: [Article]
        }

        type Article {
          id: ID
          title: String
          author: User
        }

        type Comment {
          id: ID
          article: Article
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql

        type Query {
          me: User
        }

        type User {
          id: ID
          name: String
          articles: [Article]
        }

        type Article {
          id: ID
          title: String
          author: User
        }
      `,
      errors: [
        {
          message: `Type "Comment" is unreachable`,
        },
      ],
    },
  ],
});
