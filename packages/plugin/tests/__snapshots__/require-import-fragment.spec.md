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

#### 💡 Suggestion: Add import expression for 'Foo'

    1 | # import Foo from 'PLEASE_CHANGE.graphql'
    2 |         # import Bar from 'foo.graphql'
    3 |
    4 |         query MyQuery {
    5 |           fooField {
    6 |             ...Foo
    7 |           }
    8 |         }
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

#### 💡 Suggestion: Add import expression for 'Foo'

    1 | # import Foo from 'PLEASE_CHANGE.graphql'
    2 |         query MyQuery {
    3 |           fooField {
    4 |             ...Foo
    5 |           }
    6 |         }
`;

exports[`should report fragments when there are only invalid import expressions 1`] = `
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

#### 💡 Suggestion: Add import expression for 'Foo'

    1 | # import Foo from 'PLEASE_CHANGE.graphql'
    2 |         # import 'foo.graphql'
    3 |
    4 |         query MyQuery {
    5 |           fooField {
    6 |             ...Foo
    7 |           }
    8 |         }
`;
