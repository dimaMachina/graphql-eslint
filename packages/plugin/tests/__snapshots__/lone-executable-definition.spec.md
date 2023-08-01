// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`lone-executable-definition > invalid > should allow fragments if they are ignored 1`] = `
#### ⌨️ Code

       1 |         query Foo {
       2 |           id
       3 |         }
       4 |         fragment Bar on Bar {
       5 |           id
       6 |         }
       7 |         mutation Baz($name: String!) {
       8 |           createFoo {
       9 |             name
      10 |           }
      11 |         }

#### ⚙️ Options

    {
      "ignore": [
        "fragment"
      ]
    }

#### ❌ Error

      6 |         }
    > 7 |         mutation Baz($name: String!) {
        |                  ^^^ Mutation "Baz" should be in a separate file.
      8 |           createFoo {
`;

exports[`lone-executable-definition > invalid > should report additional definitions 1`] = `
#### ⌨️ Code

       1 |         query Valid {
       2 |           id
       3 |         }
       4 |         {
       5 |           id
       6 |         }
       7 |         fragment Bar on Bar {
       8 |           id
       9 |         }
      10 |         mutation ($name: String!) {
      11 |           createFoo {
      12 |             name
      13 |           }
      14 |         }
      15 |         mutation Baz($name: String!) {
      16 |           createFoo {
      17 |             name
      18 |           }
      19 |         }
      20 |         subscription {
      21 |           id
      22 |         }
      23 |         subscription Sub {
      24 |           id
      25 |         }

#### ❌ Error 1/6

      3 |         }
    > 4 |         {
        |         ^^^^^ Query should be in a separate file.
      5 |           id

#### ❌ Error 2/6

      6 |         }
    > 7 |         fragment Bar on Bar {
        |                  ^^^ Fragment "Bar" should be in a separate file.
      8 |           id

#### ❌ Error 3/6

       9 |         }
    > 10 |         mutation ($name: String!) {
         |         ^^^^^^^^ Mutation should be in a separate file.
      11 |           createFoo {

#### ❌ Error 4/6

      14 |         }
    > 15 |         mutation Baz($name: String!) {
         |                  ^^^ Mutation "Baz" should be in a separate file.
      16 |           createFoo {

#### ❌ Error 5/6

      19 |         }
    > 20 |         subscription {
         |         ^^^^^^^^^^^^ Subscription should be in a separate file.
      21 |           id

#### ❌ Error 6/6

      22 |         }
    > 23 |         subscription Sub {
         |                      ^^^ Subscription "Sub" should be in a separate file.
      24 |           id
`;

exports[`lone-executable-definition > invalid > should report definitions after short-hand query 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           id
      3 |         }
      4 |         fragment Bar on Bar {
      5 |           id
      6 |         }

#### ❌ Error

      3 |         }
    > 4 |         fragment Bar on Bar {
        |                  ^^^ Fragment "Bar" should be in a separate file.
      5 |           id
`;
