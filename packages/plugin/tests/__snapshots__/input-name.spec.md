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
        |                            ^^^^^^^ Input \`message\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { SetMessage(input: String): String }

❌ Error 2/2

    > 1 | type Mutation { SetMessage(message: String): String }
        |                                     ^^^^^^ Input type \`String\` name should be \`SetMessageInput\`.

💡 Suggestion: Rename to \`SetMessageInput\`

    1 | type Mutation { SetMessage(message: SetMessageInput): String }
`;

exports[` 2`] = `
⚙️ Options

    {
      "checkInputType": true
    }

❌ Error

    > 1 | type Mutation { SetMessage(input: String): String }
        |                                   ^^^^^^ Input type \`String\` name should be \`SetMessageInput\`.

💡 Suggestion: Rename to \`SetMessageInput\`

    1 | type Mutation { SetMessage(input: SetMessageInput): String }
`;

exports[` 3`] = `
⚙️ Options

    {
      "checkInputType": true
    }

❌ Error

    > 1 | type Mutation { SetMessage(hello: SetMessageInput): String }
        |                            ^^^^^ Input \`hello\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { SetMessage(input: SetMessageInput): String }
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
        |                            ^^^^^^ Input \`record\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: CreateOneUserInput!): CreateOneUserPayload }

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }
        |                                    ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: userCreateInput!): CreateOneUserPayload }
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
        |                            ^^^^^^ Input \`record\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: [CreateOneUserInput]!): CreateOneUserPayload }

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: [userCreateInput]!): CreateOneUserPayload }
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
        |                            ^^^^^^ Input \`record\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: [CreateOneUserInput!]!): CreateOneUserPayload }

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: [userCreateInput!]!): CreateOneUserPayload }
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
        |                            ^^^^^^ Input \`record\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: [CreateOneUserInput!]): CreateOneUserPayload }

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: [userCreateInput!]): CreateOneUserPayload }
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
        |                            ^^^^^^ Input \`record\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: String, test: String): String }

❌ Error 2/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                    ^^^^^^ Input type \`String\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: userCreateInput, test: String): String }

❌ Error 3/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                            ^^^^ Input \`test\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(record: String, input: String): String }

❌ Error 4/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                                  ^^^^^^ Input type \`String\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: String, test: userCreateInput): String }
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
        |                            ^^^^^^ Input \`record\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: String, test: String): String }

❌ Error 2/2

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                            ^^^^ Input \`test\` should be called \`input\`.

💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(record: String, input: String): String }
`;

exports[` 10`] = `
⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": false
    }

❌ Error

    > 1 | type Mutation { userCreate(input: String): String }
        |                                   ^^^^^^ Input type \`String\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(input: userCreateInput): String }
`;

exports[` 11`] = `
⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true
    }

❌ Error

    > 1 | type Mutation { userCreate(input: UserCreateInput): String }
        |                                   ^^^^^^^^^^^^^^^ Input type \`UserCreateInput\` name should be \`userCreateInput\`.

💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(input: userCreateInput): String }
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
        |                             ^^^^^^^^^^^^ Input type \`GetUserInput\` name should be \`getUserInput\`.

💡 Suggestion: Rename to \`getUserInput\`

    1 | type Query { getUser(input: getUserInput): String }
`;
