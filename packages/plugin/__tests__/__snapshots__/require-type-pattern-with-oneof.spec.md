// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`require-type-pattern-with-oneof > invalid > should validate \`error\` field 1`] = `
#### ⌨️ Code

      1 |         type T @oneOf {
      2 |           ok: Ok
      3 |           err: Error
      4 |         }

#### ❌ Error

    > 1 |         type T @oneOf {
        |              ^ type "T" is defined as output with "@oneOf" and must be defined with "error" field
      2 |           ok: Ok
`;

exports[`require-type-pattern-with-oneof > invalid > should validate \`ok\` field 1`] = `
#### ⌨️ Code

      1 |         type T @oneOf {
      2 |           notok: Ok
      3 |           error: Error
      4 |         }

#### ❌ Error

    > 1 |         type T @oneOf {
        |              ^ type "T" is defined as output with "@oneOf" and must be defined with "ok" field
      2 |           notok: Ok
`;
