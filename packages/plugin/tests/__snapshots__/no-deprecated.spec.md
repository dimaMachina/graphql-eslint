// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | mutation { something(t: OLD) }
        |                         ^^^ This enum value is marked as deprecated in your GraphQL schema (reason: No longer supported)

💡 Suggestion: Remove \`OLD\` enum value

    1 | mutation { something(t: ) }
`;

exports[` 2`] = `
❌ Error

    > 1 | mutation { something(t: OLD_WITH_REASON) }
        |                         ^^^^^^^^^^^^^^^ This enum value is marked as deprecated in your GraphQL schema (reason: test)

💡 Suggestion: Remove \`OLD_WITH_REASON\` enum value

    1 | mutation { something(t: ) }
`;

exports[` 3`] = `
❌ Error

    > 1 | query { oldField }
        |         ^^^^^^^^ This field is marked as deprecated in your GraphQL schema (reason: No longer supported)

💡 Suggestion: Remove \`oldField\` field

    1 | query {  }
`;

exports[` 4`] = `
❌ Error

    > 1 | query { oldFieldWithReason }
        |         ^^^^^^^^^^^^^^^^^^ This field is marked as deprecated in your GraphQL schema (reason: test)

💡 Suggestion: Remove \`oldFieldWithReason\` field

    1 | query {  }
`;
