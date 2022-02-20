// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 |         query ($v: String, $t: String, $v: String) {
        |                                         ^ Variable \`v\` already defined.
      2 |           id
      3 |         }

💡 Suggestion: Remove \`v\` variable

    1 |         query ($v: String, $t: String, ) {
    2 |           id
    3 |         }
`;

exports[` 2`] = `
❌ Error

      1 |         {
    > 2 |           users(first: 100, after: 10, filter: "test", first: 50) {
        |                                                        ^^^^^ Argument \`first\` already defined.
      3 |             id
      4 |           }
      5 |         }

💡 Suggestion: Remove \`first\` argument

    1 |         {
    2 |           users(first: 100, after: 10, filter: "test", ) {
    3 |             id
    4 |           }
    5 |         }
`;

exports[` 3`] = `
❌ Error

      1 |         {
      2 |           users {
      3 |             id
      4 |             name
      5 |             email
    > 6 |             name
        |             ^^^^ Field \`name\` already defined.
      7 |           }
      8 |         }
`;

exports[` 4`] = `
❌ Error

      1 |         {
      2 |           users {
      3 |             id
      4 |             name
      5 |             email
    > 6 |             email: somethingElse
        |             ^^^^^ Field \`email\` already defined.
      7 |           }
      8 |         }
`;

exports[` 5`] = `
Code

       1 |         {
       2 |           users {
       3 |             id
       4 |             ...UserFullFields # email #email
       5 |             name #3
       6 |             ...UserFields # email firstName
       7 |             ... on User {
       8 |               id #6
       9 |               name #7
      10 |               email #8
      11 |             }
      12 |             posts {
      13 |               title
      14 |               content
      15 |               createdAt
      16 |             }
      17 |             id: name #9
      18 |           }
      19 |         }

❌ Error 1/9

      3 |             id
    > 4 |             ...UserFullFields # email #email
        |                ^^^^^^^^^^^^^^ Field \`email\` already defined in \`User\` inline fragment.
      5 |             name #3

❌ Error 2/9

      3 |             id
    > 4 |             ...UserFullFields # email #email
        |                ^^^^^^^^^^^^^^ Field \`email\` already defined in \`User\` inline fragment.
      5 |             name #3

❌ Error 3/9

      4 |             ...UserFullFields # email #email
    > 5 |             name #3
        |             ^^^^ Field \`name\` already defined in \`UserFullFields\` fragment.
      6 |             ...UserFields # email firstName

❌ Error 4/9

      5 |             name #3
    > 6 |             ...UserFields # email firstName
        |                ^^^^^^^^^^ Field \`email\` already defined in \`User\` inline fragment.
      7 |             ... on User {

❌ Error 5/9

      5 |             name #3
    > 6 |             ...UserFields # email firstName
        |                ^^^^^^^^^^ Field \`firstName\` already defined in \`UserFields\` fragment.
      7 |             ... on User {

❌ Error 6/9

      7 |             ... on User {
    > 8 |               id #6
        |               ^^ Field \`id\` already defined.
      9 |               name #7

❌ Error 7/9

       8 |               id #6
    >  9 |               name #7
         |               ^^^^ Field \`name\` already defined in \`UserFullFields\` fragment.
      10 |               email #8

❌ Error 8/9

       9 |               name #7
    > 10 |               email #8
         |               ^^^^^ Field \`email\` already defined in \`User\` inline fragment.
      11 |             }

❌ Error 9/9

      16 |             }
    > 17 |             id: name #9
         |             ^^ Field \`id\` already defined.
      18 |           }
`;
