// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
⚙️ Options

    {
      "ObjectTypeDefinition": true
    }

❌ Error

    > 1 | type User { id: ID }
        |      ^^^^ Description is required for \`type User\`.
`;

exports[` 2`] = `
⚙️ Options

    {
      "InterfaceTypeDefinition": true
    }

❌ Error

    > 1 | interface Node { id: ID! }
        |           ^^^^ Description is required for \`interface Node\`.
`;

exports[` 3`] = `
⚙️ Options

    {
      "EnumTypeDefinition": true
    }

❌ Error

    > 1 | enum Role { ADMIN }
        |      ^^^^ Description is required for \`enum Role\`.
`;

exports[` 4`] = `
⚙️ Options

    {
      "ScalarTypeDefinition": true
    }

❌ Error

    > 1 | scalar Email
        |        ^^^^^ Description is required for \`scalar Email\`.
`;

exports[` 5`] = `
⚙️ Options

    {
      "InputObjectTypeDefinition": true
    }

❌ Error

    > 1 | input CreateUserInput { email: Email! }
        |       ^^^^^^^^^^^^^^^ Description is required for \`input CreateUserInput\`.
`;

exports[` 6`] = `
⚙️ Options

    {
      "UnionTypeDefinition": true
    }

❌ Error

    > 1 | union Media = Book | Movie
        |       ^^^^^ Description is required for \`union Media\`.
`;

exports[` 7`] = `
⚙️ Options

    {
      "DirectiveDefinition": true
    }

❌ Error

    > 1 | directive @auth(requires: Role!) on FIELD_DEFINITION
        |            ^^^^ Description is required for \`directive @auth\`.
`;

exports[` 8`] = `
⚙️ Options

    {
      "FieldDefinition": true
    }

❌ Error

    > 1 | type User { email: Email! }
        |             ^^^^^ Description is required for \`User.email\`.
`;

exports[` 9`] = `
⚙️ Options

    {
      "InputValueDefinition": true
    }

❌ Error

    > 1 | input CreateUserInput { email: Email! }
        |                         ^^^^^ Description is required for \`CreateUserInput.email\`.
`;

exports[` 10`] = `
⚙️ Options

    {
      "EnumValueDefinition": true
    }

❌ Error

    > 1 | enum Role { ADMIN }
        |             ^^^^^ Description is required for \`Role.ADMIN\`.
`;

exports[` 11`] = `
Code

      1 |         type CreateOneUserPayload {
      2 |           recordId: MongoID
      3 |           record: User
      4 |         }

⚙️ Options

    {
      "types": true,
      "ObjectTypeDefinition": false,
      "FieldDefinition": true
    }

❌ Error 1/2

      1 |         type CreateOneUserPayload {
    > 2 |           recordId: MongoID
        |           ^^^^^^^^ Description is required for \`CreateOneUserPayload.recordId\`.
      3 |           record: User

❌ Error 2/2

      2 |           recordId: MongoID
    > 3 |           record: User
        |           ^^^^^^ Description is required for \`CreateOneUserPayload.record\`.
      4 |         }
`;

exports[` 12`] = `
⚙️ Options

    {
      "OperationDefinition": true
    }

❌ Error

      1 |         # linesBefore !== 1
      2 |
    > 3 |         query {
        |         ^^^^^ Description is required for \`query\`.
      4 |           foo
      5 |         }
`;

exports[` 13`] = `
⚙️ Options

    {
      "OperationDefinition": true
    }

❌ Error

    > 1 | mutation createUser { foo }
        | ^^^^^^^^ Description is required for \`mutation createUser\`.
`;

exports[` 14`] = `
⚙️ Options

    {
      "OperationDefinition": true
    }

❌ Error

    > 1 | subscription commentAdded { foo }
        | ^^^^^^^^^^^^ Description is required for \`subscription commentAdded\`.
`;

exports[` 15`] = `
⚙️ Options

    {
      "OperationDefinition": true
    }

❌ Error

      1 |         # eslint-disable-next-line semi
    > 2 |         query {
        |         ^^^^^ Description is required for \`query\`.
      3 |           foo
      4 |         }
`;

exports[` 16`] = `
⚙️ Options

    {
      "OperationDefinition": true
    }

❌ Error

       1 |         # BAD
       2 |         fragment UserFields on User {
       3 |           id
       4 |         }
       5 |
    >  6 |         query {
         |         ^^^^^ Description is required for \`query\`.
       7 |           user {
       8 |             ...UserFields
       9 |           }
      10 |         }
`;
