// Vitest Snapshot v1

exports[`should work only with Kind.FIELD 1`] = `
#### ⌨️ Code

      1 | scalar Foo @bad

#### ⚙️ Options

    {
      "ignoreClientDirectives": [
        "bad"
      ]
    }

#### ❌ Error

    > 1 | scalar Foo @bad
        |             ^^^ Unknown directive "@bad".
`;
