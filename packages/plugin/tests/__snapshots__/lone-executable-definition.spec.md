// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should allow fragments if they are ignored 1`] = `
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
    >  7 |         mutation Baz($name: String!) {
         |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    >  8 |           createFoo {
         | ^^^^^^^^^^^^^^^^^^^^^
    >  9 |             name
         | ^^^^^^^^^^^^^^^^^^^^^
    > 10 |           }
         | ^^^^^^^^^^^^^^^^^^^^^
    > 11 |         }
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Mutation "Baz" should be in a separate file.
`;

exports[`should report additional definitions 1`] = `
#### ⌨️ Code

       1 |         query Valid {
       2 |           id
       3 |         }
       4 |         query Foo {
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
    > 4 |         query Foo {
        |         ^^^^^^^^^^^
    > 5 |           id
        | ^^^^^^^^^^^^
    > 6 |         }
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Query "Foo" should be in a separate file.
      7 |         fragment Bar on Bar {

#### ❌ Error 2/6

       6 |         }
    >  7 |         fragment Bar on Bar {
         |         ^^^^^^^^^^^^^^^^^^^^^
    >  8 |           id
         | ^^^^^^^^^^^^
    >  9 |         }
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Fragment "Bar" should be in a separate file.
      10 |         mutation ($name: String!) {

#### ❌ Error 3/6

       9 |         }
    > 10 |         mutation ($name: String!) {
         |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    > 11 |           createFoo {
         | ^^^^^^^^^^^^^^^^^^^^^
    > 12 |             name
         | ^^^^^^^^^^^^^^^^^^^^^
    > 13 |           }
         | ^^^^^^^^^^^^^^^^^^^^^
    > 14 |         }
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Mutation should be in a separate file.
      15 |         mutation Baz($name: String!) {

#### ❌ Error 4/6

      14 |         }
    > 15 |         mutation Baz($name: String!) {
         |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    > 16 |           createFoo {
         | ^^^^^^^^^^^^^^^^^^^^^
    > 17 |             name
         | ^^^^^^^^^^^^^^^^^^^^^
    > 18 |           }
         | ^^^^^^^^^^^^^^^^^^^^^
    > 19 |         }
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Mutation "Baz" should be in a separate file.
      20 |         subscription {

#### ❌ Error 5/6

      19 |         }
    > 20 |         subscription {
         |         ^^^^^^^^^^^^^^
    > 21 |           id
         | ^^^^^^^^^^^^
    > 22 |         }
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Subscription should be in a separate file.
      23 |         subscription Sub {

#### ❌ Error 6/6

      22 |         }
    > 23 |         subscription Sub {
         |         ^^^^^^^^^^^^^^^^^^
    > 24 |           id
         | ^^^^^^^^^^^^
    > 25 |         }
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Subscription "Sub" should be in a separate file.
`;

exports[`should report definitions after short-hand query 1`] = `
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
        |         ^^^^^^^^^^^^^^^^^^^^^
    > 5 |           id
        | ^^^^^^^^^^^^
    > 6 |         }
        | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Fragment "Bar" should be in a separate file.
`;
