// Vitest Snapshot v1

exports[`should validate \`input\` 1`] = `
#### ⌨️ Code

      1 |         input Input @oneOf {
      2 |           foo: String!
      3 |           bar: [Int]!
      4 |         }

#### ❌ Error 1/2

      1 |         input Input @oneOf {
    > 2 |           foo: String!
        |           ^^^ Field \`foo\` must be nullable.
      3 |           bar: [Int]!

#### ❌ Error 2/2

      2 |           foo: String!
    > 3 |           bar: [Int]!
        |           ^^^ Field \`bar\` must be nullable.
      4 |         }
`;

exports[`should validate \`type\` 1`] = `
#### ⌨️ Code

      1 |         type Type @oneOf {
      2 |           foo: String!
      3 |           bar: Int
      4 |         }

#### ❌ Error

      1 |         type Type @oneOf {
    > 2 |           foo: String!
        |           ^^^ Field \`foo\` must be nullable.
      3 |           bar: Int
`;
