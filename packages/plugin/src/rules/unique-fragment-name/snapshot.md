// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`unique-fragment-name > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | fragment HasIdFields on U { a b c }

#### ❌ Error

    > 1 | fragment HasIdFields on U { a b c }
        |          ^^^^^^^^^^^ Fragment named "HasIdFields" already defined in:
    	-1866344359.graphql
`;

exports[`unique-fragment-name > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | fragment HasIdFields on U { a b c }

#### ❌ Error

    > 1 | fragment HasIdFields on U { a b c }
        |          ^^^^^^^^^^^ Fragment named "HasIdFields" already defined in:
    	-1559743294.graphql
    	-1866344359.graphql
`;
