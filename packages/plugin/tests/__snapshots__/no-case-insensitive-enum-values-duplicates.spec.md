// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | enum A { TEST TesT }
        |               ^^^^ Case-insensitive enum values duplicates are not allowed! Found: \`TesT\`.

💡 Suggestion: Remove \`TesT\` enum value

    1 | enum A { TEST  }
`;

exports[` 2`] = `
❌ Error

    > 1 | extend enum A { TEST TesT }
        |                      ^^^^ Case-insensitive enum values duplicates are not allowed! Found: \`TesT\`.

💡 Suggestion: Remove \`TesT\` enum value

    1 | extend enum A { TEST  }
`;
