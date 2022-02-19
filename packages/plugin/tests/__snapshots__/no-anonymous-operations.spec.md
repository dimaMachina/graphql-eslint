// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | query { a }
        | ^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your query!

💡 Suggestion: Rename to \`a\`

    1 | query a { a }
`;

exports[` 2`] = `
❌ Error

    > 1 | mutation { renamed: a }
        | ^^^^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your mutation!

💡 Suggestion: Rename to \`renamed\`

    1 | mutation renamed { renamed: a }
`;

exports[` 3`] = `
❌ Error

    > 1 | subscription { ...someFragmentSpread }
        | ^^^^^^^^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your subscription!

💡 Suggestion: Rename to \`subscription\`

    1 | subscription subscription { ...someFragmentSpread }
`;
