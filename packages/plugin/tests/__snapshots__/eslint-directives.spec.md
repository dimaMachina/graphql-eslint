// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

      1 |         # eslint-disable-next-line non-existing-rule
      2 |         query {
      3 |           a
      4 |         }

❌ Error 1/2

    > 1 |         # eslint-disable-next-line non-existing-rule
        |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Definition for rule 'non-existing-rule' was not found.
      2 |         query {

❌ Error 2/2

      1 |         # eslint-disable-next-line non-existing-rule
    > 2 |         query {
        |         ^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your query!
      3 |           a

💡 Suggestion: Rename to \`a\`

    1 |         # eslint-disable-next-line non-existing-rule
    2 |         query a {
    3 |           a
    4 |         }
`;

exports[` 2`] = `
❌ Error

    > 1 | query { a }
        | ^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your query!

💡 Suggestion: Rename to \`a\`

    1 | query a { a }
`;
