// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-root-type > invalid > disallow mutation 1`] = `
#### ⌨️ Code

      1 | type Mutation

#### ⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

#### ❌ Error

    > 1 | type Mutation
        |      ^^^^^^^^ Root type \`Mutation\` is forbidden.

#### 💡 Suggestion: Remove \`Mutation\` type

    1 |
`;

exports[`no-root-type > invalid > disallow subscription 1`] = `
#### ⌨️ Code

      1 | type Subscription

#### ⚙️ Options

    {
      "disallow": [
        "subscription"
      ]
    }

#### ❌ Error

    > 1 | type Subscription
        |      ^^^^^^^^^^^^ Root type \`Subscription\` is forbidden.

#### 💡 Suggestion: Remove \`Subscription\` type

    1 |
`;

exports[`no-root-type > invalid > disallow when root type name is renamed 1`] = `
#### ⌨️ Code

      1 | type MyMutation

#### ⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

#### ❌ Error

    > 1 | type MyMutation
        |      ^^^^^^^^^^ Root type \`MyMutation\` is forbidden.

#### 💡 Suggestion: Remove \`MyMutation\` type

    1 |
`;

exports[`no-root-type > invalid > disallow with extend 1`] = `
#### ⌨️ Code

      1 | extend type Mutation { foo: ID }

#### ⚙️ Options

    {
      "disallow": [
        "mutation"
      ]
    }

#### ❌ Error

    > 1 | extend type Mutation { foo: ID }
        |             ^^^^^^^^ Root type \`Mutation\` is forbidden.

#### 💡 Suggestion: Remove \`Mutation\` type

    1 |
`;
