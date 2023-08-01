import { ParserOptions } from '../src';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { rule, RuleOptions } from '../src/rules/selection-set-depth';

const WITH_SIBLINGS = {
  parserOptions: {
    documents: 'fragment AlbumFields on Album { id }',
  } as ParserOptions,
};

const ruleTester = new RuleTester();

ruleTester.run<RuleOptions>('selection-set-depth', rule, {
  valid: [
    {
      options: [{ maxDepth: 2 }],
      code: `
        {
          viewer { # Level 0
            albums { # Level 1
              title # Level 2
            }
          }
        }
      `,
    },
    {
      ...WITH_SIBLINGS,
      options: [{ maxDepth: 2 }],
      code: /* GraphQL */ `
        query deep2 {
          viewer {
            albums {
              ...AlbumFields
            }
          }
        }
      `,
    },
    {
      ...WITH_SIBLINGS,
      options: [{ maxDepth: 1, ignore: ['albums'] }],
      code: /* GraphQL */ `
        query deep2 {
          viewer {
            albums {
              ...AlbumFields
            }
          }
        }
      `,
    },
  ],
  invalid: [
    {
      options: [{ maxDepth: 1 }],
      errors: [{ message: "'deep2' exceeds maximum operation depth of 1" }],
      code: /* GraphQL */ `
        query deep2 {
          viewer {
            albums {
              title
            }
          }
        }
      `,
    },
    {
      ...WITH_SIBLINGS,
      options: [{ maxDepth: 1 }],
      errors: [{ message: "'deep2' exceeds maximum operation depth of 1" }],
      code: /* GraphQL */ `
        query deep2 {
          viewer {
            albums {
              ...AlbumFields
            }
          }
        }
      `,
    },
    {
      name: 'suggestions should work with inline fragments',
      ...WITH_SIBLINGS,
      options: [{ maxDepth: 1 }],
      errors: [{ message: "'' exceeds maximum operation depth of 1" }],
      code: /* GraphQL */ `
        {
          viewer {
            albums {
              ... on Album {
                id
              }
            }
          }
        }
      `,
    },
    {
      name: 'suggestions should not throw error when fragment is located in different file',
      parserOptions: {
        documents: /* GraphQL */ `
          fragment AlbumFields on Album {
            id
            modifier {
              date
            }
          }
        `,
      },
      options: [{ maxDepth: 2 }],
      errors: [{ message: "'' exceeds maximum operation depth of 2" }],
      code: /* GraphQL */ `
        {
          viewer {
            albums {
              ...AlbumFields
            }
          }
        }
      `,
    },
  ],
});
