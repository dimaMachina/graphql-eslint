// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`unique-enum-value-names > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | enum A { TEST TesT }

#### ❌ Error

    > 1 | enum A { TEST TesT }
        |               ^^^^ Unexpected case-insensitive enum values duplicates for enum value "TesT" in enum "A"

#### 💡 Suggestion: Remove \`TesT\` enum value

    1 | enum A { TEST  }
`;

exports[`unique-enum-value-names > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | extend enum A { TEST TesT }

#### ❌ Error

    > 1 | extend enum A { TEST TesT }
        |                      ^^^^ Unexpected case-insensitive enum values duplicates for enum value "TesT" in enum "A"

#### 💡 Suggestion: Remove \`TesT\` enum value

    1 | extend enum A { TEST  }
`;
