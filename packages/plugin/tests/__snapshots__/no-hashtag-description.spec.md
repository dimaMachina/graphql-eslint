// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-hashtag-description > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 |         # Bad
      2 |         type Query {
      3 |           foo: String
      4 |         }

#### ❌ Error

    > 1 |         # Bad
        |         ^ Unexpected GraphQL descriptions as hashtag \`#\` for type "Query".
    Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      2 |         type Query {

#### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         """Bad"""
    2 |         type Query {
    3 |           foo: String
    4 |         }

#### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         "Bad"
    2 |         type Query {
    3 |           foo: String
    4 |         }
`;

exports[`no-hashtag-description > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |         # multiline
      2 |         # multiline
      3 |         type Query {
      4 |           foo: String
      5 |         }

#### ❌ Error

      1 |         # multiline
    > 2 |         # multiline
        |         ^ Unexpected GraphQL descriptions as hashtag \`#\` for type "Query".
    Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      3 |         type Query {

#### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         # multiline
    2 |         """multiline"""
    3 |         type Query {
    4 |           foo: String
    5 |         }

#### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         # multiline
    2 |         "multiline"
    3 |         type Query {
    4 |           foo: String
    5 |         }
`;

exports[`no-hashtag-description > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           # Bad
      3 |           foo: String
      4 |         }

#### ❌ Error

      1 |         type Query {
    > 2 |           # Bad
        |           ^ Unexpected GraphQL descriptions as hashtag \`#\` for field "foo" in type "Query".
    Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      3 |           foo: String

#### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         type Query {
    2 |           """Bad"""
    3 |           foo: String
    4 |         }

#### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         type Query {
    2 |           "Bad"
    3 |           foo: String
    4 |         }
`;

exports[`no-hashtag-description > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           bar: ID
      3 |           # Bad
      4 |           foo: ID
      5 |           # Good
      6 |         }

#### ❌ Error

      2 |           bar: ID
    > 3 |           # Bad
        |           ^ Unexpected GraphQL descriptions as hashtag \`#\` for field "foo" in type "Query".
    Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      4 |           foo: ID

#### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         type Query {
    2 |           bar: ID
    3 |           """Bad"""
    4 |           foo: ID
    5 |           # Good
    6 |         }

#### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         type Query {
    2 |           bar: ID
    3 |           "Bad"
    4 |           foo: ID
    5 |           # Good
    6 |         }
`;

exports[`no-hashtag-description > invalid > Invalid #5 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           user(
      3 |             # Bad
      4 |             id: Int!
      5 |           ): User
      6 |         }

#### ❌ Error

      2 |           user(
    > 3 |             # Bad
        |             ^ Unexpected GraphQL descriptions as hashtag \`#\` for input value "id" in field "user".
    Prefer using \`"""\` for multiline, or \`"\` for a single line description.
      4 |             id: Int!

#### 💡 Suggestion 1/2: Replace with \`"""\` description syntax

    1 |         type Query {
    2 |           user(
    3 |             """Bad"""
    4 |             id: Int!
    5 |           ): User
    6 |         }

#### 💡 Suggestion 2/2: Replace with \`"\` description syntax

    1 |         type Query {
    2 |           user(
    3 |             "Bad"
    4 |             id: Int!
    5 |           ): User
    6 |         }
`;
