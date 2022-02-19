// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 |         query test($v: String, $t: String, $v: String) {
        |                                             ^ Variable \`v\` defined multiple times.
      2 |           id
      3 |         }

💡 Suggestion: Remove \`v\` variable

    1 |         query test($v: String, $t: String, ) {
    2 |           id
    3 |         }
`;

exports[` 2`] = `
❌ Error

      1 |         query test {
    > 2 |           users(first: 100, after: 10, filter: "test", first: 50) {
        |                                                        ^^^^^ Argument \`first\` defined multiple times.
      3 |             id
      4 |           }
      5 |         }

💡 Suggestion: Remove \`first\` argument

    1 |         query test {
    2 |           users(first: 100, after: 10, filter: "test", ) {
    3 |             id
    4 |           }
    5 |         }
`;

exports[` 3`] = `
❌ Error

      1 |         query test {
      2 |           users {
      3 |             id
      4 |             name
      5 |             email
    > 6 |             name
        |             ^^^^ Field \`name\` defined multiple times.
      7 |           }
      8 |         }

💡 Suggestion: Remove \`name\` field

    1 |         query test {
    2 |           users {
    3 |             id
    4 |             name
    5 |             email
    6 |             
    7 |           }
    8 |         }
`;

exports[` 4`] = `
❌ Error

      1 |         query test {
      2 |           users {
      3 |             id
      4 |             name
      5 |             email
    > 6 |             email: somethingElse
        |             ^^^^^ Field \`email\` defined multiple times.
      7 |           }
      8 |         }

💡 Suggestion: Remove \`email\` field

    1 |         query test {
    2 |           users {
    3 |             id
    4 |             name
    5 |             email
    6 |             
    7 |           }
    8 |         }
`;
