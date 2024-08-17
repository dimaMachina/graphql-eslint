// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-deprecated > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | mutation { something(t: OLD) }

#### ❌ Error

    > 1 | mutation { something(t: OLD) }
        |                         ^^^ This enum value is marked as deprecated in your GraphQL schema (reason: No longer supported)

#### 💡 Suggestion: Remove \`OLD\` enum value

    1 | mutation { something(t: ) }
`;

exports[`no-deprecated > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | mutation { something(t: OLD_WITH_REASON) }

#### ❌ Error

    > 1 | mutation { something(t: OLD_WITH_REASON) }
        |                         ^^^^^^^^^^^^^^^ This enum value is marked as deprecated in your GraphQL schema (reason: test)

#### 💡 Suggestion: Remove \`OLD_WITH_REASON\` enum value

    1 | mutation { something(t: ) }
`;

exports[`no-deprecated > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | query { oldField }

#### ❌ Error

    > 1 | query { oldField }
        |         ^^^^^^^^ This field is marked as deprecated in your GraphQL schema (reason: No longer supported)

#### 💡 Suggestion: Remove \`oldField\` field

    1 | query {  }
`;

exports[`no-deprecated > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 | query { oldFieldWithReason }

#### ❌ Error

    > 1 | query { oldFieldWithReason }
        |         ^^^^^^^^^^^^^^^^^^ This field is marked as deprecated in your GraphQL schema (reason: test)

#### 💡 Suggestion: Remove \`oldFieldWithReason\` field

    1 | query {  }
`;
