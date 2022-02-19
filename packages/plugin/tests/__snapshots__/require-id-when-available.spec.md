// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | { hasId { name } }
        |         ^ Field \`id\` must be selected when it's available on a type.
    Include it in your selection set.

💡 Suggestion: Add \`id\` selection

    1 | { hasId { id name } }
`;

exports[` 2`] = `
⚙️ Options

    {
      "fieldName": "name"
    }

❌ Error

    > 1 | { hasId { id } }
        |         ^ Field \`name\` must be selected when it's available on a type.
    Include it in your selection set.

💡 Suggestion: Add \`name\` selection

    1 | { hasId { name id } }
`;

exports[` 3`] = `
⚙️ Options

    {
      "fieldName": [
        "id",
        "_id"
      ]
    }

❌ Error

    > 1 | { hasId { name } }
        |         ^ Fields \`id\` or \`_id\` must be selected when it's available on a type.
    Include it in your selection set.

💡 Suggestion 1/2: Add \`id\` selection

    1 | { hasId { id name } }

💡 Suggestion 2/2: Add \`_id\` selection

    1 | { hasId { _id name } }
`;

exports[` 4`] = `
❌ Error

      1 |         query User {
    > 2 |           user {
        |                ^ Field \`id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\`, \`UserMediumFields\`, or \`UserLightFields\`.
      3 |             ...UserFullFields
      4 |           }
      5 |         }

💡 Suggestion: Add \`id\` selection

    1 |         query User {
    2 |           user {
    3 |             id ...UserFullFields
    4 |           }
    5 |         }
`;
