// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 | type User { id: ID }

#### ⚙️ Options

    {
      "ObjectTypeDefinition": true
    }

#### ❌ Error

    > 1 | type User { id: ID }
        |      ^^^^ Description is required for \`type User\`.
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 | interface Node { id: ID! }

#### ⚙️ Options

    {
      "InterfaceTypeDefinition": true
    }

#### ❌ Error

    > 1 | interface Node { id: ID! }
        |           ^^^^ Description is required for \`interface Node\`.
`;

exports[`Invalid #3 1`] = `
#### ⌨️ Code

      1 | enum Role { ADMIN }

#### ⚙️ Options

    {
      "EnumTypeDefinition": true
    }

#### ❌ Error

    > 1 | enum Role { ADMIN }
        |      ^^^^ Description is required for \`enum Role\`.
`;

exports[`Invalid #4 1`] = `
#### ⌨️ Code

      1 | scalar Email

#### ⚙️ Options

    {
      "ScalarTypeDefinition": true
    }

#### ❌ Error

    > 1 | scalar Email
        |        ^^^^^ Description is required for \`scalar Email\`.
`;

exports[`Invalid #5 1`] = `
#### ⌨️ Code

      1 | input CreateUserInput { email: Email! }

#### ⚙️ Options

    {
      "InputObjectTypeDefinition": true
    }

#### ❌ Error

    > 1 | input CreateUserInput { email: Email! }
        |       ^^^^^^^^^^^^^^^ Description is required for \`input CreateUserInput\`.
`;

exports[`Invalid #6 1`] = `
#### ⌨️ Code

      1 | union Media = Book | Movie

#### ⚙️ Options

    {
      "UnionTypeDefinition": true
    }

#### ❌ Error

    > 1 | union Media = Book | Movie
        |       ^^^^^ Description is required for \`union Media\`.
`;

exports[`Invalid #7 1`] = `
#### ⌨️ Code

      1 | directive @auth(requires: Role!) on FIELD_DEFINITION

#### ⚙️ Options

    {
      "DirectiveDefinition": true
    }

#### ❌ Error

    > 1 | directive @auth(requires: Role!) on FIELD_DEFINITION
        |            ^^^^ Description is required for \`directive @auth\`.
`;

exports[`Invalid #8 1`] = `
#### ⌨️ Code

      1 | type User { email: Email! }

#### ⚙️ Options

    {
      "FieldDefinition": true
    }

#### ❌ Error

    > 1 | type User { email: Email! }
        |             ^^^^^ Description is required for \`User.email\`.
`;

exports[`Invalid #9 1`] = `
#### ⌨️ Code

      1 | input CreateUserInput { email: Email! }

#### ⚙️ Options

    {
      "InputValueDefinition": true
    }

#### ❌ Error

    > 1 | input CreateUserInput { email: Email! }
        |                         ^^^^^ Description is required for \`CreateUserInput.email\`.
`;

exports[`Invalid #10 1`] = `
#### ⌨️ Code

      1 | enum Role { ADMIN }

#### ⚙️ Options

    {
      "EnumValueDefinition": true
    }

#### ❌ Error

    > 1 | enum Role { ADMIN }
        |             ^^^^^ Description is required for \`Role.ADMIN\`.
`;

exports[`Invalid #17 1`] = `
#### ⌨️ Code

      1 | type Query { user(id: String!): User! }

#### ⚙️ Options

    {
      "operationFieldDefinition": true
    }

#### ❌ Error

    > 1 | type Query { user(id: String!): User! }
        |              ^^^^ Description is required for \`Query.user\`.
`;

exports[`Invalid #18 1`] = `
#### ⌨️ Code

      1 | type Query { users: [User!]! }

#### ⚙️ Options

    {
      "operationFieldDefinition": true
    }

#### ❌ Error

    > 1 | type Query { users: [User!]! }
        |              ^^^^^ Description is required for \`Query.users\`.
`;

exports[`Invalid #19 1`] = `
#### ⌨️ Code

      1 | type Mutation { createUser(user: UserInput): User! }

#### ⚙️ Options

    {
      "operationFieldDefinition": true
    }

#### ❌ Error

    > 1 | type Mutation { createUser(user: UserInput): User! }
        |                 ^^^^^^^^^^ Description is required for \`Mutation.createUser\`.
`;

exports[`Invalid #20 1`] = `
#### ⌨️ Code

      1 | type Subscription { users: [User!] }

#### ⚙️ Options

    {
      "operationFieldDefinition": true
    }

#### ❌ Error

    > 1 | type Subscription { users: [User!] }
        |                     ^^^^^ Description is required for \`Subscription.users\`.
`;

exports[`should disable description for ObjectTypeDefinition 1`] = `
#### ⌨️ Code

      1 |         type CreateOneUserPayload {
      2 |           recordId: MongoID
      3 |           record: User
      4 |         }

#### ⚙️ Options

    {
      "types": true,
      "ObjectTypeDefinition": false,
      "FieldDefinition": true
    }

#### ❌ Error 1/2

      1 |         type CreateOneUserPayload {
    > 2 |           recordId: MongoID
        |           ^^^^^^^^ Description is required for \`CreateOneUserPayload.recordId\`.
      3 |           record: User

#### ❌ Error 2/2

      2 |           recordId: MongoID
    > 3 |           record: User
        |           ^^^^^^ Description is required for \`CreateOneUserPayload.record\`.
      4 |         }
`;

exports[`should ignore comments before fragment definition 1`] = `
#### ⌨️ Code

       1 |         # BAD
       2 |         fragment UserFields on User {
       3 |           id
       4 |         }
       5 |
       6 |         query {
       7 |           user {
       8 |             ...UserFields
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "OperationDefinition": true
    }

#### ❌ Error

      5 |
    > 6 |         query {
        |         ^^^^^ Description is required for \`query\`.
      7 |           user {
`;

exports[`should report because of linesBefore !== 1 1`] = `
#### ⌨️ Code

      1 |         # linesBefore !== 1
      2 |
      3 |         query {
      4 |           foo
      5 |         }

#### ⚙️ Options

    {
      "OperationDefinition": true
    }

#### ❌ Error

      2 |
    > 3 |         query {
        |         ^^^^^ Description is required for \`query\`.
      4 |           foo
`;

exports[`should report because skips comment that starts with \`eslint\` 1`] = `
#### ⌨️ Code

      1 |         # eslint-disable-next-line semi
      2 |         query {
      3 |           foo
      4 |         }

#### ⚙️ Options

    {
      "OperationDefinition": true
    }

#### ❌ Error

      1 |         # eslint-disable-next-line semi
    > 2 |         query {
        |         ^^^^^ Description is required for \`query\`.
      3 |           foo
`;

exports[`should validate mutation 1`] = `
#### ⌨️ Code

      1 | mutation createUser { foo }

#### ⚙️ Options

    {
      "OperationDefinition": true
    }

#### ❌ Error

    > 1 | mutation createUser { foo }
        | ^^^^^^^^ Description is required for \`mutation createUser\`.
`;

exports[`should validate subscription 1`] = `
#### ⌨️ Code

      1 | subscription commentAdded { foo }

#### ⚙️ Options

    {
      "OperationDefinition": true
    }

#### ❌ Error

    > 1 | subscription commentAdded { foo }
        | ^^^^^^^^^^^^ Description is required for \`subscription commentAdded\`.
`;
