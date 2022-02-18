// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | { hasId { name } }
        |         ^ Field \`id\` must be selected when it's available on a type.
    Include it in your selection set.
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
`;
