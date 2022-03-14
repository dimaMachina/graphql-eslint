// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`disallow mutation 1`] = `
##### ⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

##### ❌ Error

    > 1 | type Mutation
        |      ^^^^^^^^ Root type \`Mutation\` is forbidden.

##### 💡 Suggestion: Remove \`Mutation\` type

    1 |
`;

exports[`disallow subscription 1`] = `
##### ⚙️ Options

    {
      "disallow": [
        "subscription"
      ]
    }

##### ❌ Error

    > 1 | type Subscription
        |      ^^^^^^^^^^^^ Root type \`Subscription\` is forbidden.

##### 💡 Suggestion: Remove \`Subscription\` type

    1 |
`;

exports[`disallow when root type name is renamed 1`] = `
##### ⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

##### ❌ Error

    > 1 | type MyMutation
        |      ^^^^^^^^^^ Root type \`MyMutation\` is forbidden.

##### 💡 Suggestion: Remove \`MyMutation\` type

    1 |
`;

exports[`disallow with extend 1`] = `
##### ⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

##### ❌ Error

    > 1 | extend type Mutation { foo: ID }
        |             ^^^^^^^^ Root type \`Mutation\` is forbidden.

##### 💡 Suggestion: Remove \`Mutation\` type

    1 |
`;
