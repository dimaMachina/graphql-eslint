// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`should validate \`error\` field 1`] = `
#### ⌨️ Code

      1 |         type T @oneOf {
      2 |           ok: Ok
      3 |           err: Error
      4 |         }

#### ❌ Error

    > 1 |         type T @oneOf {
        |              ^ Type \`T\` should have \`error\` field.
      2 |           ok: Ok
`;

exports[`should validate \`ok\` field 1`] = `
#### ⌨️ Code

      1 |         type T @oneOf {
      2 |           notok: Ok
      3 |           error: Error
      4 |         }

#### ❌ Error

    > 1 |         type T @oneOf {
        |              ^ Type \`T\` should have \`ok\` field.
      2 |           notok: Ok
`;
