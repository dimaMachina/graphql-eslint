// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
⚙️ Options

    {
      "maxDepth": 1
    }

❌ Error

      1 |         query deep2 {
      2 |           viewer {
      3 |             albums {
    > 4 |               title
        |               ^ 'deep2' exceeds maximum operation depth of 1
      5 |             }
      6 |           }
      7 |         }
`;

exports[` 2`] = `
⚙️ Options

    {
      "maxDepth": 1
    }

❌ Error

      1 |         query deep2 {
      2 |           viewer {
      3 |             albums {
    > 4 |               ...AlbumFields
        |               ^ 'deep2' exceeds maximum operation depth of 1
      5 |             }
      6 |           }
      7 |         }
`;
