// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`require-nullable-fields-with-oneof > invalid > should validate \`input\` 1`] = `
#### ⌨️ Code

      1 |         input Input @oneOf {
      2 |           foo: String!
      3 |           bar: [Int]!
      4 |         }

#### ❌ Error 1/2

      1 |         input Input @oneOf {
    > 2 |           foo: String!
        |           ^^^ input value "foo" in input "Input" must be nullable when "@oneOf" is in use
      3 |           bar: [Int]!

#### ❌ Error 2/2

      2 |           foo: String!
    > 3 |           bar: [Int]!
        |           ^^^ input value "bar" in input "Input" must be nullable when "@oneOf" is in use
      4 |         }
`;

exports[`require-nullable-fields-with-oneof > invalid > should validate \`type\` 1`] = `
#### ⌨️ Code

      1 |         type Type @oneOf {
      2 |           foo: String!
      3 |           bar: Int
      4 |         }

#### ❌ Error

      1 |         type Type @oneOf {
    > 2 |           foo: String!
        |           ^^^ field "foo" in type "Type" must be nullable when "@oneOf" is in use
      3 |           bar: Int
`;
