import { GraphQLRuleTester } from '../src';
import rule from '../src/rules/no-duplicate-fields';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-duplicate-fields', rule, {
  valid: [],
  invalid: [
    {
      code: /* GraphQL */ `
        query ($v: String, $t: String, $v: String) {
          id
        }
      `,
      errors: [{ message: 'Variable `v` already defined.' }],
    },
    {
      code: /* GraphQL */ `
        {
          users(first: 100, after: 10, filter: "test", first: 50) {
            id
          }
        }
      `,
      errors: [{ message: 'Argument `first` already defined.' }],
    },
    {
      code: /* GraphQL */ `
        {
          users {
            id
            name
            email
            name
          }
        }
      `,
      errors: [{ message: 'Field `name` already defined.' }],
    },
    {
      code: /* GraphQL */ `
        {
          users {
            id
            name
            email
            email: somethingElse
          }
        }
      `,
      errors: [{ message: 'Field `email` already defined.' }],
    },
    {
      code: /* GraphQL */ `
        {
          users {
            id
            ...UserFullFields # email #email
            name #3
            ...UserFields # email firstName
            ... on User {
              id #6
              name #7
              email #8
            }
            posts {
              title
              content
              createdAt
            }
            id: name #9
          }
        }
      `,
      parserOptions: {
        operations: /* GraphQL */ `
          fragment UserFullFields on User {
            name
            ... on User {
              email
            }
            email
            ...UserFields
          }

          fragment UserFields on User {
            email
            firstName
          }
        `,
      },
      errors: [
        { message: 'Field `email` already defined in `User` inline fragment.' },
        { message: 'Field `email` already defined in `User` inline fragment.' },
        { message: 'Field `name` already defined in `UserFullFields` fragment.' },
        { message: 'Field `email` already defined in `User` inline fragment.' },
        { message: 'Field `firstName` already defined in `UserFields` fragment.' },
        { message: 'Field `id` already defined.' },
        { message: 'Field `name` already defined in `UserFullFields` fragment.' },
        { message: 'Field `email` already defined in `User` inline fragment.' },
        { message: 'Field `id` already defined.' },
      ],
    },
  ],
});
