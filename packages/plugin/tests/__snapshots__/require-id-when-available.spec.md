// Vitest Snapshot v1

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 | { hasId { name } }

#### ❌ Error

    > 1 | { hasId { name } }
        |         ^ Field \`hasId.id\` must be selected when it's available on a type.
    Include it in your selection set.

#### 💡 Suggestion: Add \`id\` selection

    1 | { hasId { id name } }
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 | { hasId { id } }

#### ⚙️ Options

    {
      "fieldName": "name"
    }

#### ❌ Error

    > 1 | { hasId { id } }
        |         ^ Field \`hasId.name\` must be selected when it's available on a type.
    Include it in your selection set.

#### 💡 Suggestion: Add \`name\` selection

    1 | { hasId { name id } }
`;

exports[`should not work with n nested fragments if you never get the id 1`] = `
#### ⌨️ Code

      1 |         query User {
      2 |           user {
      3 |             ...UserFullFields
      4 |           }
      5 |         }

#### ❌ Error

      1 |         query User {
    > 2 |           user {
        |                ^ Field \`user.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\`, \`UserMediumFields\`, or \`UserLightFields\`.
      3 |             ...UserFullFields

#### 💡 Suggestion: Add \`id\` selection

    1 |         query User {
    2 |           user {
    3 |             id ...UserFullFields
    4 |           }
    5 |         }
`;

exports[`should report an error about missing \`posts.id\` field in fragment 1`] = `
#### ⌨️ Code

      1 | { user { id ...UserFields } }

#### ❌ Error

    > 1 | { user { id ...UserFields } }
        |             ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFields\`.
`;

exports[`should report an error about missing \`user.id\`, \`posts.id\`, \`author.id\` and \`authorPosts.id\` selection 1`] = `
#### ⌨️ Code

      1 | { user { ...UserFullFields } }

#### ❌ Error 1/4

    > 1 | { user { ...UserFullFields } }
        |        ^ Field \`user.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFullFields\`.

#### 💡 Suggestion: Add \`id\` selection

    1 | { user { id ...UserFullFields } }

#### ❌ Error 2/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFullFields\`.

#### ❌ Error 3/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`author.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\` or \`UserFields\`.

#### ❌ Error 4/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`authorPosts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\` or \`UserFields\`.
`;

exports[`support multiple id field names 1`] = `
#### ⌨️ Code

      1 | { hasId { name } }

#### ⚙️ Options

    {
      "fieldName": [
        "id",
        "_id"
      ]
    }

#### ❌ Error

    > 1 | { hasId { name } }
        |         ^ Fields \`hasId.id\` or \`hasId._id\` must be selected when it's available on a type.
    Include it in your selection set.

#### 💡 Suggestion 1/2: Add \`id\` selection

    1 | { hasId { id name } }

#### 💡 Suggestion 2/2: Add \`_id\` selection

    1 | { hasId { _id name } }
`;
