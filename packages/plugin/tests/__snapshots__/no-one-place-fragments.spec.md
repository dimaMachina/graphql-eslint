// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`should error fragment used in one place 1`] = `
#### ⌨️ Code

      1 | fragment UserFields on User {
      2 |   id
      3 |   firstName
      4 | }

#### ❌ Error

    > 1 | fragment UserFields on User {
        |          ^^^^^^^^^^ Fragment \`UserFields\` used only once. Inline him in "-877628611.graphql".
      2 |   id
`;
