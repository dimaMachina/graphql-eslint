// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-anonymous-operations > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | query { a }

#### ❌ Error

    > 1 | query { a }
        | ^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your query!

#### 💡 Suggestion: Rename to \`a\`

    1 | query a { a }
`;

exports[`no-anonymous-operations > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | mutation { renamed: a }

#### ❌ Error

    > 1 | mutation { renamed: a }
        | ^^^^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your mutation!

#### 💡 Suggestion: Rename to \`renamed\`

    1 | mutation renamed { renamed: a }
`;

exports[`no-anonymous-operations > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | subscription { ...someFragmentSpread }

#### ❌ Error

    > 1 | subscription { ...someFragmentSpread }
        | ^^^^^^^^^^^^ Anonymous GraphQL operations are forbidden. Make sure to name your subscription!

#### 💡 Suggestion: Rename to \`subscription\`

    1 | subscription subscription { ...someFragmentSpread }
`;
