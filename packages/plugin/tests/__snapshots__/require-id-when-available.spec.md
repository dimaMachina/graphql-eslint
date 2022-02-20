// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | { hasId { name } }
        |         ^ Field \`hasId.id\` must be selected when it's available on a type.
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
        |         ^ Field \`hasId.name\` must be selected when it's available on a type.
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
        |         ^ Fields \`hasId.id\` or \`hasId._id\` must be selected when it's available on a type.
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
        |                ^ Field \`user.id\` must be selected when it's available on a type.
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

exports[` 5`] = `
❌ Error

    > 1 | { user { id ...UserFields } }
        |             ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFields\`.
`;

exports[` 6`] = `
Code

      1 | { user { ...UserFullFields } }

❌ Error 1/4

    > 1 | { user { ...UserFullFields } }
        |        ^ Field \`user.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFullFields\`.

💡 Suggestion: Add \`id\` selection

    1 | { user { id ...UserFullFields } }

❌ Error 2/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFullFields\`.

❌ Error 3/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`author.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\` or \`UserFields\`.

❌ Error 4/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`authorPosts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\` or \`UserFields\`.
`;
