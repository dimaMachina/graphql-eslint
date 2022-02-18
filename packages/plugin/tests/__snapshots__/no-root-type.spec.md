// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

❌ Error

    > 1 | type Mutation
        |      ^^^^^^^^ Root type "Mutation" is forbidden
`;

exports[` 2`] = `
⚙️ Options

    {
      "disallow": [
        "subscription"
      ]
    }

❌ Error

    > 1 | type Subscription
        |      ^^^^^^^^^^^^ Root type "Subscription" is forbidden
`;

exports[` 3`] = `
⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

❌ Error

    > 1 | extend type Mutation { foo: ID }
        |             ^^^^^^^^ Root type "Mutation" is forbidden
`;

exports[` 4`] = `
⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

❌ Error

    > 1 | type MyMutation
        |      ^^^^^^^^^^ Root type "MyMutation" is forbidden
`;
