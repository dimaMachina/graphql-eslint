// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-deprecated > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | mutation { something(t: OLD) }

#### ❌ Error

    > 1 | mutation { something(t: OLD) }
        |                         ^^^ Enum "OLD" is marked as deprecated in your GraphQL schema (reason: No longer supported)

#### 💡 Suggestion: Remove enum "OLD"

    1 | mutation { something(t: ) }
`;

exports[`no-deprecated > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | mutation { something(t: OLD_WITH_REASON) }

#### ❌ Error

    > 1 | mutation { something(t: OLD_WITH_REASON) }
        |                         ^^^^^^^^^^^^^^^ Enum "OLD_WITH_REASON" is marked as deprecated in your GraphQL schema (reason: test)

#### 💡 Suggestion: Remove enum "OLD_WITH_REASON"

    1 | mutation { something(t: ) }
`;

exports[`no-deprecated > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | { oldField }

#### ❌ Error

    > 1 | { oldField }
        |   ^^^^^^^^ Field "oldField" is marked as deprecated in your GraphQL schema (reason: No longer supported)

#### 💡 Suggestion: Remove field "oldField"

    1 | {  }
`;

exports[`no-deprecated > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 | { oldFieldWithReason }

#### ❌ Error

    > 1 | { oldFieldWithReason }
        |   ^^^^^^^^^^^^^^^^^^ Field "oldFieldWithReason" is marked as deprecated in your GraphQL schema (reason: test)

#### 💡 Suggestion: Remove field "oldFieldWithReason"

    1 | {  }
`;

exports[`no-deprecated > invalid > Invalid #5 1`] = `
#### ⌨️ Code

      1 | { testArgument(a: 2) }

#### ❌ Error

    > 1 | { testArgument(a: 2) }
        |                ^^^ Argument "a" is marked as deprecated in your GraphQL schema (reason: Use 'b' instead.)

#### 💡 Suggestion: Remove argument "a"

    1 | { testArgument() }
`;

exports[`no-deprecated > invalid > Invalid #6 1`] = `
#### ⌨️ Code

      1 | { testObjectField(input: { a: 2 }) }

#### ❌ Error

    > 1 | { testObjectField(input: { a: 2 }) }
        |                            ^ Object field "a" is marked as deprecated in your GraphQL schema (reason: Use 'b' instead.)

#### 💡 Suggestion: Remove object field "a"

    1 | { testObjectField(input: {  }) }
`;
