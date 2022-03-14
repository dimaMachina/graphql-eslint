// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
##### ❌ Error

    > 1 |         # Bad
        |         ^ Using hashtag \`#\` for adding GraphQL descriptions is not allowed. Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      2 |         type Query {
      3 |           foo: String
      4 |         }

##### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         """Bad"""
    2 |         type Query {
    3 |           foo: String
    4 |         }

##### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         "Bad"
    2 |         type Query {
    3 |           foo: String
    4 |         }
`;

exports[`Invalid #2 1`] = `
##### ❌ Error

      1 |         # multiline
    > 2 |         # multiline
        |         ^ Using hashtag \`#\` for adding GraphQL descriptions is not allowed. Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      3 |         type Query {
      4 |           foo: String
      5 |         }

##### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         # multiline
    2 |         """multiline"""
    3 |         type Query {
    4 |           foo: String
    5 |         }

##### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         # multiline
    2 |         "multiline"
    3 |         type Query {
    4 |           foo: String
    5 |         }
`;

exports[`Invalid #3 1`] = `
##### ❌ Error

      1 |         type Query {
    > 2 |           # Bad
        |           ^ Using hashtag \`#\` for adding GraphQL descriptions is not allowed. Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      3 |           foo: String
      4 |         }

##### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         type Query {
    2 |           """Bad"""
    3 |           foo: String
    4 |         }

##### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         type Query {
    2 |           "Bad"
    3 |           foo: String
    4 |         }
`;

exports[`Invalid #4 1`] = `
##### ❌ Error

      1 |         type Query {
      2 |           bar: ID
    > 3 |           # Bad
        |           ^ Using hashtag \`#\` for adding GraphQL descriptions is not allowed. Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      4 |           foo: ID
      5 |           # Good
      6 |         }

##### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         type Query {
    2 |           bar: ID
    3 |           """Bad"""
    4 |           foo: ID
    5 |           # Good
    6 |         }

##### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         type Query {
    2 |           bar: ID
    3 |           "Bad"
    4 |           foo: ID
    5 |           # Good
    6 |         }
`;

exports[`Invalid #5 1`] = `
##### ❌ Error

      1 |         type Query {
      2 |           user(
    > 3 |             # Bad
        |             ^ Using hashtag \`#\` for adding GraphQL descriptions is not allowed. Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      4 |             id: Int!
      5 |           ): User
      6 |         }

##### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         type Query {
    2 |           user(
    3 |             """Bad"""
    4 |             id: Int!
    5 |           ): User
    6 |         }

##### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         type Query {
    2 |           user(
    3 |             "Bad"
    4 |             id: Int!
    5 |           ): User
    6 |         }
`;
