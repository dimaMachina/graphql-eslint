// Vitest Snapshot v1

exports[`should report fragments when there are no appropriately named import expressions 1`] = `
#### ⌨️ Code

      1 |         # import Bar from 'foo.graphql'
      2 |
      3 |         query MyQuery {
      4 |           fooField {
      5 |             ...Foo
      6 |           }
      7 |         }

#### ❌ Error

      4 |           fooField {
    > 5 |             ...Foo
        |                ^^^ Expected 'Foo' fragment to be imported.
      6 |           }
`;

exports[`should report fragments when there are no import expressions 1`] = `
#### ⌨️ Code

      1 |         query MyQuery {
      2 |           fooField {
      3 |             ...Foo
      4 |           }
      5 |         }

#### ❌ Error

      2 |           fooField {
    > 3 |             ...Foo
        |                ^^^ Expected 'Foo' fragment to be imported.
      4 |           }
`;

exports[`should report fragments when there are no named import expressions 1`] = `
#### ⌨️ Code

      1 |         # import 'foo.graphql'
      2 |
      3 |         query MyQuery {
      4 |           fooField {
      5 |             ...Foo
      6 |           }
      7 |         }

#### ❌ Error

      4 |           fooField {
    > 5 |             ...Foo
        |                ^^^ Expected 'Foo' fragment to be imported.
      6 |           }
`;
