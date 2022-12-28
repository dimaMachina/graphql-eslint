// Vitest Snapshot v1

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 | query test { bar }

#### ❌ Error

    > 1 | query test { bar }
        |       ^^^^ Operation named "test" already defined in:
    	6844040.graphql
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 | query test { bar }

#### ❌ Error

    > 1 | query test { bar }
        |       ^^^^ Operation named "test" already defined in:
    	6844040.graphql
    	84823255.graphql
`;
