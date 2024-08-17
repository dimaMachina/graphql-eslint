// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-duplicate-fields > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 |         query test($v: String, $t: String, $v: String) {
      2 |           id
      3 |         }

#### ❌ Error

    > 1 |         query test($v: String, $t: String, $v: String) {
        |                                             ^ Variable \`v\` defined multiple times.
      2 |           id

#### 💡 Suggestion: Remove \`v\` variable

    1 |         query test($v: String, $t: String, ) {
    2 |           id
    3 |         }
`;

exports[`no-duplicate-fields > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |         query test {
      2 |           users(first: 100, after: 10, filter: "test", first: 50) {
      3 |             id
      4 |           }
      5 |         }

#### ❌ Error

      1 |         query test {
    > 2 |           users(first: 100, after: 10, filter: "test", first: 50) {
        |                                                        ^^^^^ Argument \`first\` defined multiple times.
      3 |             id

#### 💡 Suggestion: Remove \`first\` argument

    1 |         query test {
    2 |           users(first: 100, after: 10, filter: "test", ) {
    3 |             id
    4 |           }
    5 |         }
`;

exports[`no-duplicate-fields > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 |         query test {
      2 |           users {
      3 |             id
      4 |             name
      5 |             email
      6 |             name
      7 |           }
      8 |         }

#### ❌ Error

      5 |             email
    > 6 |             name
        |             ^^^^ Field \`name\` defined multiple times.
      7 |           }

#### 💡 Suggestion: Remove \`name\` field

    1 |         query test {
    2 |           users {
    3 |             id
    4 |             name
    5 |             email
    6 |             
    7 |           }
    8 |         }
`;

exports[`no-duplicate-fields > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 |         query test {
      2 |           users {
      3 |             id
      4 |             name
      5 |             email
      6 |             email: somethingElse
      7 |           }
      8 |         }

#### ❌ Error

      5 |             email
    > 6 |             email: somethingElse
        |             ^^^^^ Field \`email\` defined multiple times.
      7 |           }

#### 💡 Suggestion: Remove \`email\` field

    1 |         query test {
    2 |           users {
    3 |             id
    4 |             name
    5 |             email
    6 |             
    7 |           }
    8 |         }
`;
