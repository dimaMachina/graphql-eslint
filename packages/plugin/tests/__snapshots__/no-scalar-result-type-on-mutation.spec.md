// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-scalar-result-type-on-mutation > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |         type Mutation
      2 |
      3 |         extend type Mutation {
      4 |           createUser: Boolean!
      5 |         }

#### ❌ Error

      3 |         extend type Mutation {
    > 4 |           createUser: Boolean!
        |                       ^^^^^^^ Unexpected scalar result type \`Boolean\` for field "createUser" in type "Mutation"
      5 |         }

#### 💡 Suggestion: Remove \`Boolean\`

    1 |         type Mutation
    2 |
    3 |         extend type Mutation {
    4 |           createUser: !
    5 |         }
`;

exports[`no-scalar-result-type-on-mutation > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 |         type RootMutation {
      2 |           createUser: [Boolean]
      3 |         }
      4 |
      5 |         schema {
      6 |           mutation: RootMutation
      7 |         }

#### ❌ Error

      1 |         type RootMutation {
    > 2 |           createUser: [Boolean]
        |                        ^^^^^^^ Unexpected scalar result type \`Boolean\` for field "createUser" in type "RootMutation"
      3 |         }

#### 💡 Suggestion: Remove \`Boolean\`

    1 |         type RootMutation {
    2 |           createUser: []
    3 |         }
    4 |
    5 |         schema {
    6 |           mutation: RootMutation
    7 |         }
`;

exports[`no-scalar-result-type-on-mutation > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 |         type RootMutation
      2 |         extend type RootMutation {
      3 |           createUser: [Boolean]!
      4 |         }
      5 |
      6 |         schema {
      7 |           mutation: RootMutation
      8 |         }

#### ❌ Error

      2 |         extend type RootMutation {
    > 3 |           createUser: [Boolean]!
        |                        ^^^^^^^ Unexpected scalar result type \`Boolean\` for field "createUser" in type "RootMutation"
      4 |         }

#### 💡 Suggestion: Remove \`Boolean\`

    1 |         type RootMutation
    2 |         extend type RootMutation {
    3 |           createUser: []!
    4 |         }
    5 |
    6 |         schema {
    7 |           mutation: RootMutation
    8 |         }
`;

exports[`no-scalar-result-type-on-mutation > invalid > Invalid #5 1`] = `
#### ⌨️ Code

      1 |         type Mutation {
      2 |           createUser: User!
      3 |           updateUser: Int
      4 |           deleteUser: [Boolean!]!
      5 |         }

#### ❌ Error 1/2

      2 |           createUser: User!
    > 3 |           updateUser: Int
        |                       ^^^ Unexpected scalar result type \`Int\` for field "updateUser" in type "Mutation"
      4 |           deleteUser: [Boolean!]!

#### 💡 Suggestion: Remove \`Int\`

    1 |         type Mutation {
    2 |           createUser: User!
    3 |           updateUser: 
    4 |           deleteUser: [Boolean!]!
    5 |         }

#### ❌ Error 2/2

      3 |           updateUser: Int
    > 4 |           deleteUser: [Boolean!]!
        |                        ^^^^^^^ Unexpected scalar result type \`Boolean\` for field "deleteUser" in type "Mutation"
      5 |         }

#### 💡 Suggestion: Remove \`Boolean\`

    1 |         type Mutation {
    2 |           createUser: User!
    3 |           updateUser: Int
    4 |           deleteUser: [!]!
    5 |         }
`;

exports[`no-scalar-result-type-on-mutation > invalid > should ignore arguments 1`] = `
#### ⌨️ Code

      1 |         type Mutation {
      2 |           createUser(a: ID, b: ID!, c: [ID]!, d: [ID!]!): Boolean
      3 |         }

#### ❌ Error

      1 |         type Mutation {
    > 2 |           createUser(a: ID, b: ID!, c: [ID]!, d: [ID!]!): Boolean
        |                                                           ^^^^^^^ Unexpected scalar result type \`Boolean\` for field "createUser" in type "Mutation"
      3 |         }

#### 💡 Suggestion: Remove \`Boolean\`

    1 |         type Mutation {
    2 |           createUser(a: ID, b: ID!, c: [ID]!, d: [ID!]!): 
    3 |         }
`;
