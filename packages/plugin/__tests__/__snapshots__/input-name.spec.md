// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`input-name > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | type Mutation { SetMessage(message: String): String }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/2

    > 1 | type Mutation { SetMessage(message: String): String }
        |                            ^^^^^^^ Input "message" should be named "input" for "Mutation.SetMessage"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { SetMessage(input: String): String }

#### ❌ Error 2/2

    > 1 | type Mutation { SetMessage(message: String): String }
        |                                     ^^^^^^ Input type \`String\` name should be \`SetMessageInput\`.

#### 💡 Suggestion: Rename to \`SetMessageInput\`

    1 | type Mutation { SetMessage(message: SetMessageInput): String }
`;

exports[`input-name > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | type Mutation { SetMessage(input: String): String }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error

    > 1 | type Mutation { SetMessage(input: String): String }
        |                                   ^^^^^^ Input type \`String\` name should be \`SetMessageInput\`.

#### 💡 Suggestion: Rename to \`SetMessageInput\`

    1 | type Mutation { SetMessage(input: SetMessageInput): String }
`;

exports[`input-name > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | type Mutation { SetMessage(hello: SetMessageInput): String }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error

    > 1 | type Mutation { SetMessage(hello: SetMessageInput): String }
        |                            ^^^^^ Input "hello" should be named "input" for "Mutation.SetMessage"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { SetMessage(input: SetMessageInput): String }
`;

exports[`input-name > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/2

    > 1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: CreateOneUserInput!): CreateOneUserPayload }

#### ❌ Error 2/2

    > 1 | type Mutation { userCreate(record: CreateOneUserInput!): CreateOneUserPayload }
        |                                    ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: userCreateInput!): CreateOneUserPayload }
`;

exports[`input-name > invalid > Invalid #5 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: [CreateOneUserInput]!): CreateOneUserPayload }

#### ❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput]!): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: [userCreateInput]!): CreateOneUserPayload }
`;

exports[`input-name > invalid > Invalid #6 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: [CreateOneUserInput!]!): CreateOneUserPayload }

#### ❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]!): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: [userCreateInput!]!): CreateOneUserPayload }
`;

exports[`input-name > invalid > Invalid #7 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }
        |                            ^^^^^^ Input "record" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: [CreateOneUserInput!]): CreateOneUserPayload }

#### ❌ Error 2/2

    > 1 | type Mutation { userCreate(record: [CreateOneUserInput!]): CreateOneUserPayload }
        |                                     ^^^^^^^^^^^^^^^^^^ Input type \`CreateOneUserInput\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: [userCreateInput!]): CreateOneUserPayload }
`;

exports[`input-name > invalid > Invalid #8 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(record: String, test: String): String }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                            ^^^^^^ Input "record" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: String, test: String): String }

#### ❌ Error 2/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                    ^^^^^^ Input type \`String\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: userCreateInput, test: String): String }

#### ❌ Error 3/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                            ^^^^ Input "test" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(record: String, input: String): String }

#### ❌ Error 4/4

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                                  ^^^^^^ Input type \`String\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(record: String, test: userCreateInput): String }
`;

exports[`input-name > invalid > Invalid #9 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(record: String, test: String): String }

#### ⚙️ Options

    {
      "checkInputType": false,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error 1/2

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                            ^^^^^^ Input "record" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(input: String, test: String): String }

#### ❌ Error 2/2

    > 1 | type Mutation { userCreate(record: String, test: String): String }
        |                                            ^^^^ Input "test" should be named "input" for "Mutation.userCreate"

#### 💡 Suggestion: Rename to \`input\`

    1 | type Mutation { userCreate(record: String, input: String): String }
`;

exports[`input-name > invalid > Invalid #10 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(input: String): String }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": false,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error

    > 1 | type Mutation { userCreate(input: String): String }
        |                                   ^^^^^^ Input type \`String\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(input: userCreateInput): String }
`;

exports[`input-name > invalid > Invalid #11 1`] = `
#### ⌨️ Code

      1 | type Mutation { userCreate(input: UserCreateInput): String }

#### ⚙️ Options

    {
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkQueries": false,
      "checkMutations": true
    }

#### ❌ Error

    > 1 | type Mutation { userCreate(input: UserCreateInput): String }
        |                                   ^^^^^^^^^^^^^^^ Input type \`UserCreateInput\` name should be \`userCreateInput\`.

#### 💡 Suggestion: Rename to \`userCreateInput\`

    1 | type Mutation { userCreate(input: userCreateInput): String }
`;

exports[`input-name > invalid > Invalid #12 1`] = `
#### ⌨️ Code

      1 | type Query { getUser(input: GetUserInput): String }

#### ⚙️ Options

    {
      "checkQueries": true,
      "checkInputType": true,
      "caseSensitiveInputType": true,
      "checkMutations": true
    }

#### ❌ Error

    > 1 | type Query { getUser(input: GetUserInput): String }
        |                             ^^^^^^^^^^^^ Input type \`GetUserInput\` name should be \`getUserInput\`.

#### 💡 Suggestion: Rename to \`getUserInput\`

    1 | type Query { getUser(input: getUserInput): String }
`;
