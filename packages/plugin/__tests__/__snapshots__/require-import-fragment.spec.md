// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`require-import-fragment > invalid > should report fragments when there are no import expressions 1`] = `
#### ⌨️ Code

      1 | {
      2 |   foo {
      3 |     ...FooFields
      4 |   }
      5 | }

#### ❌ Error

      2 |   foo {
    > 3 |     ...FooFields
        |        ^^^^^^^^^ Expected "FooFields" fragment to be imported.
      4 |   }

#### 💡 Suggestion: Add import expression for "FooFields".

    1 | # import FooFields from 'foo-fragment.gql'
    2 | {
    3 |   foo {
    4 |     ...FooFields
    5 |   }
    6 | }
`;

exports[`require-import-fragment > invalid > should report with default import 1`] = `
#### ⌨️ Code

      1 | #import 'bar-fragment.gql'
      2 | query {
      3 |   foo {
      4 |     ...FooFields
      5 |   }
      6 | }

#### ❌ Error

      3 |   foo {
    > 4 |     ...FooFields
        |        ^^^^^^^^^ Expected "FooFields" fragment to be imported.
      5 |   }

#### 💡 Suggestion: Add import expression for "FooFields".

    1 | # import FooFields from 'foo-fragment.gql'
    2 | #import 'bar-fragment.gql'
    3 | query {
    4 |   foo {
    5 |     ...FooFields
    6 |   }
    7 | }
`;

exports[`require-import-fragment > invalid > should report with named import 1`] = `
#### ⌨️ Code

      1 | #import FooFields from "bar-fragment.gql"
      2 | query {
      3 |   foo {
      4 |     ...FooFields
      5 |   }
      6 | }

#### ❌ Error

      3 |   foo {
    > 4 |     ...FooFields
        |        ^^^^^^^^^ Expected "FooFields" fragment to be imported.
      5 |   }

#### 💡 Suggestion: Add import expression for "FooFields".

    1 | # import FooFields from 'foo-fragment.gql'
    2 | #import FooFields from "bar-fragment.gql"
    3 | query {
    4 |   foo {
    5 |     ...FooFields
    6 |   }
    7 | }
`;
