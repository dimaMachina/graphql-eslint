// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

      1 | type Mutation { SetMessage(message: String): String }

⚙️ Options

    {
      "checkInputType": true
    }

❌ Error 1/2

    > 1 | type Mutation { SetMessage(message: String): String }
        |                            ^^^^^^^ Input "message" should be called "input"

❌ Error 2/2

    > 1 | type Mutation { SetMessage(message: String): String }
        |                                     ^^^^^^ InputType "String" name should be "SetMessageInput"
`;

exports[` 2`] = `
⚙️ Options

    {
      "checkInputType": true
    }

❌ Error

    > 1 | type Mutation { SetMessage(input: String): String }
        |                                   ^^^^^^ InputType "String" name should be "SetMessageInput"
`;

exports[` 3`] = `
⚙️ Options

    {
      "checkInputType": true
    }

❌ Error

    > 1 | type Mutation { SetMessage(hello: SetMessageInput): String }
        |                            ^^^^^ Input "hello" should be called "input"
`;

exports[` 4`] = `
Code

      1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }

⚙️ Options

    {
      "checkInputType": true
    }

❌ Error 1/2

    > 1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be called "input"

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }
        |                                    ^^^^^^^^^^^^^^^^^^ InputType "CreateOneUserInput" name should be "userCreateInput"
`;

exports[` 5`] = `
Code

      1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }

⚙️ Options

    {
      "checkInputType": true
    }

❌ Error 1/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be called "input"

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ InputType "CreateOneUserInput" name should be "userCreateInput"
`;

exports[` 6`] = `
Code

      1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }

⚙️ Options

    {
      "checkInputType": true
    }

❌ Error 1/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be called "input"

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ InputType "CreateOneUserInput" name should be "userCreateInput"
`;

exports[` 7`] = `
Code

      1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }

⚙️ Options

    {
      "checkInputType": true
    }

❌ Error 1/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be called "input"

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ InputType "CreateOneUserInput" name should be "userCreateInput"
`;

exports[` 8`] = `
Code

      1 | type Mutation { userCreate(record: String, test: String): String }

⚙️ Options

    {
      "checkInputType": true
    }

❌ Error 1/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                            ^^^^^^ Input "record" should be called "input"

❌ Error 2/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                    ^^^^^^ InputType "String" name should be "userCreateInput"

❌ Error 3/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                            ^^^^ Input "test" should be called "input"

❌ Error 4/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                                  ^^^^^^ InputType "String" name should be "userCreateInput"
`;

exports[` 9`] = `
Code

      1 | type Mutation { userCreate(record: String, test: String): String }

⚙️ Options

    {
      "checkInputType": false
    }

❌ Error 1/2

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                            ^^^^^^ Input "record" should be called "input"

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                            ^^^^ Input "test" should be called "input"
`;

exports[` 10`] = `
⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": false
    }

❌ Error

    > 1 | type Mutation { userCreate(input: String): String }
        |                                   ^^^^^^ InputType "String" name should be "userCreateInput"
`;

exports[` 11`] = `
⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true
    }

❌ Error

    > 1 | type Mutation { userCreate(input: UserCreateInput): String }
        |                                   ^^^^^^^^^^^^^^^ InputType "UserCreateInput" name should be "userCreateInput"
`;

exports[` 12`] = `
⚙️ Options

    {
      "checkQueries": true,
      "checkInputType": true,
      "caseSensitiveInputType": true
    }

❌ Error

    > 1 | type Query { getUser(input: GetUserInput): String }
        |                             ^^^^^^^^^^^^ InputType "GetUserInput" name should be "getUserInput"
`;
