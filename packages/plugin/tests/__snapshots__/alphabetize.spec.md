// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

#### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ],
      "ignorePrefix": [
        "ID"
      ]
    }

#### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #3 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ],
      "ignoreSuffix": [
        "ID"
      ]
    }

#### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #4 1`] = `
#### ⌨️ Code

      1 |         extend type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           password: String
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

#### ❌ Error

      4 |           password: String
    > 5 |           lastName: String!
        |           ^^^^^^^^ \`lastName\` should be before \`password\`.
      6 |         }

#### 🔧 Autofix output

      1 |         extend type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #5 1`] = `
#### ⌨️ Code

      1 |         interface Test {
      2 |           cc: Int
      3 |           bb: Int
      4 |           aa: Int
      5 |         }

#### ⚙️ Options

    {
      "fields": [
        "InterfaceTypeDefinition"
      ]
    }

#### ❌ Error 1/2

      2 |           cc: Int
    > 3 |           bb: Int
        |           ^^ \`bb\` should be before \`cc\`.
      4 |           aa: Int

#### ❌ Error 2/2

      3 |           bb: Int
    > 4 |           aa: Int
        |           ^^ \`aa\` should be before \`bb\`.
      5 |         }

#### 🔧 Autofix output

      1 |         interface Test {
      2 |           aa: Int
      3 |           bb: Int
      4 |           cc: Int
      5 |         }
`;

exports[`Invalid #6 1`] = `
#### ⌨️ Code

      1 |         input UserInput {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "InputObjectTypeDefinition"
      ]
    }

#### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #7 1`] = `
#### ⌨️ Code

      1 |         input UserInput {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "InputObjectTypeDefinition"
      ],
      "ignorePrefix": [
        "ID"
      ]
    }

#### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #8 1`] = `
#### ⌨️ Code

      1 |         input UserInput {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "InputObjectTypeDefinition"
      ],
      "ignoreSuffix": [
        "ID"
      ]
    }

#### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #9 1`] = `
#### ⌨️ Code

      1 |         extend input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           password: String
      5 |           lastName: String!
      6 |         }

#### ⚙️ Options

    {
      "fields": [
        "InputObjectTypeDefinition"
      ]
    }

#### ❌ Error

      4 |           password: String
    > 5 |           lastName: String!
        |           ^^^^^^^^ \`lastName\` should be before \`password\`.
      6 |         }

#### 🔧 Autofix output

      1 |         extend input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #10 1`] = `
#### ⌨️ Code

      1 |         enum Role {
      2 |           SUPER_ADMIN
      3 |           ADMIN
      4 |           USER
      5 |           GOD
      6 |         }

#### ⚙️ Options

    {
      "values": [
        "EnumTypeDefinition"
      ]
    }

#### ❌ Error 1/2

      2 |           SUPER_ADMIN
    > 3 |           ADMIN
        |           ^^^^^ \`ADMIN\` should be before \`SUPER_ADMIN\`.
      4 |           USER

#### ❌ Error 2/2

      4 |           USER
    > 5 |           GOD
        |           ^^^ \`GOD\` should be before \`USER\`.
      6 |         }

#### 🔧 Autofix output

      1 |         enum Role {
      2 |           ADMIN
      3 |           GOD
      4 |           SUPER_ADMIN
      5 |           USER
      6 |         }
`;

exports[`Invalid #11 1`] = `
#### ⌨️ Code

      1 |         extend enum Role {
      2 |           ADMIN
      3 |           SUPER_ADMIN
      4 |           GOD
      5 |           USER
      6 |         }

#### ⚙️ Options

    {
      "values": [
        "EnumTypeDefinition"
      ]
    }

#### ❌ Error

      3 |           SUPER_ADMIN
    > 4 |           GOD
        |           ^^^ \`GOD\` should be before \`SUPER_ADMIN\`.
      5 |           USER

#### 🔧 Autofix output

      1 |         extend enum Role {
      2 |           ADMIN
      3 |           GOD
      4 |           SUPER_ADMIN
      5 |           USER
      6 |         }
`;

exports[`Invalid #12 1`] = `
#### ⌨️ Code

      1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION

#### ⚙️ Options

    {
      "arguments": [
        "DirectiveDefinition"
      ]
    }

#### ❌ Error 1/2

    > 1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
        |                                     ^^ \`bb\` should be before \`cc\`.

#### ❌ Error 2/2

    > 1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
        |                                                ^^ \`aa\` should be before \`bb\`.

#### 🔧 Autofix output

      1 |         directive @test(aa: Aa!, bb: [Bb!], cc: [Cc!]!) on FIELD_DEFINITION
`;

exports[`Invalid #13 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
      3 |         }

#### ⚙️ Options

    {
      "arguments": [
        "FieldDefinition"
      ]
    }

#### ❌ Error 1/2

      1 |         type Query {
    > 2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
        |                            ^^ \`bb\` should be before \`cc\`.
      3 |         }

#### ❌ Error 2/2

      1 |         type Query {
    > 2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
        |                                       ^^ \`aa\` should be before \`bb\`.
      3 |         }

#### 🔧 Autofix output

      1 |         type Query {
      2 |           test(aa: Aa!, bb: [Bb!], cc: [Cc!]!): Int
      3 |         }
`;

exports[`Invalid #14 1`] = `
#### ⌨️ Code

      1 |         fragment TestFields on Test {
      2 |           cc
      3 |           bb
      4 |           aa
      5 |         }

#### ⚙️ Options

    {
      "selections": [
        "FragmentDefinition"
      ]
    }

#### ❌ Error 1/2

      2 |           cc
    > 3 |           bb
        |           ^^ \`bb\` should be before \`cc\`.
      4 |           aa

#### ❌ Error 2/2

      3 |           bb
    > 4 |           aa
        |           ^^ \`aa\` should be before \`bb\`.
      5 |         }

#### 🔧 Autofix output

      1 |         fragment TestFields on Test {
      2 |           aa
      3 |           bb
      4 |           cc
      5 |         }
`;

exports[`Invalid #15 1`] = `
#### ⌨️ Code

       1 |         query {
       2 |           test {
       3 |             cc
       4 |             ... on Test {
       5 |               ccc
       6 |               bbb
       7 |               aaa
       8 |             }
       9 |             bb
      10 |             aa
      11 |           }
      12 |         }

#### ⚙️ Options

    {
      "selections": [
        "OperationDefinition"
      ]
    }

#### ❌ Error 1/4

      5 |               ccc
    > 6 |               bbb
        |               ^^^ \`bbb\` should be before \`ccc\`.
      7 |               aaa

#### ❌ Error 2/4

      6 |               bbb
    > 7 |               aaa
        |               ^^^ \`aaa\` should be before \`bbb\`.
      8 |             }

#### ❌ Error 3/4

       8 |             }
    >  9 |             bb
         |             ^^ \`bb\` should be before inline fragment.
      10 |             aa

#### ❌ Error 4/4

       9 |             bb
    > 10 |             aa
         |             ^^ \`aa\` should be before \`bb\`.
      11 |           }

#### 🔧 Autofix output

       1 |         query {
       2 |           test {
       3 |             aa
       4 |             bb
       5 |             cc
       6 |             ... on Test {
       7 |               aaa
       8 |               bbb
       9 |               ccc
      10 |             }
      11 |           }
      12 |         }
`;

exports[`Invalid #16 1`] = `
#### ⌨️ Code

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
      3 |             something
      4 |           }
      5 |         }

#### ⚙️ Options

    {
      "variables": [
        "OperationDefinition"
      ],
      "arguments": [
        "Field"
      ]
    }

#### ❌ Error 1/4

    > 1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
        |                                 ^^ \`bb\` should be before \`cc\`.
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {

#### ❌ Error 2/4

    > 1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
        |                                             ^^ \`aa\` should be before \`bb\`.
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {

#### ❌ Error 3/4

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
    > 2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
        |                          ^^^ \`bbb\` should be before \`ccc\`.
      3 |             something

#### ❌ Error 4/4

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
    > 2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
        |                                    ^^^ \`aaa\` should be before \`bbb\`.
      3 |             something

#### 🔧 Autofix output

      1 |         mutation ($aa: Aa!, $bb: [Bb!], $cc: [Cc!]!) {
      2 |           test(aaa: $aa, bbb: $bb, ccc: $cc) {
      3 |             something
      4 |           }
      5 |         }
`;

exports[`should compare with lexicographic order 1`] = `
#### ⌨️ Code

       1 |         enum Test {
       2 |           "qux"
       3 |           qux
       4 |           foo
       5 |           "Bar"
       6 |           Bar
       7 |           """
       8 |           bar
       9 |           """
      10 |           bar
      11 |         }

#### ⚙️ Options

    {
      "values": [
        "EnumTypeDefinition"
      ]
    }

#### ❌ Error 1/3

      3 |           qux
    > 4 |           foo
        |           ^^^ \`foo\` should be before \`qux\`.
      5 |           "Bar"

#### ❌ Error 2/3

      5 |           "Bar"
    > 6 |           Bar
        |           ^^^ \`Bar\` should be before \`foo\`.
      7 |           """

#### ❌ Error 3/3

       9 |           """
    > 10 |           bar
         |           ^^^ \`bar\` should be before \`Bar\`.
      11 |         }

#### 🔧 Autofix output

       1 |         enum Test {
       2 |           """
       3 |           bar
       4 |           """
       5 |           bar
       6 |           "Bar"
       7 |           Bar
       8 |           foo
       9 |           "qux"
      10 |           qux
      11 |         }
`;

exports[`should move comment 1`] = `
#### ⌨️ Code

       1 |         type Test { # { character
       2 |           # before d 1
       3 |           # before d 2
       4 |           d: Int # same d
       5 |           # before c
       6 |           c: Float!
       7 |           # before b 1
       8 |           # before b 2
       9 |           b: [String] # same b
      10 |           # before a
      11 |           a: [Int!]! # same a
      12 |           # end
      13 |         } # } character

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

#### ❌ Error 1/3

      5 |           # before c
    > 6 |           c: Float!
        |           ^ \`c\` should be before \`d\`.
      7 |           # before b 1

#### ❌ Error 2/3

       8 |           # before b 2
    >  9 |           b: [String] # same b
         |           ^ \`b\` should be before \`c\`.
      10 |           # before a

#### ❌ Error 3/3

      10 |           # before a
    > 11 |           a: [Int!]! # same a
         |           ^ \`a\` should be before \`b\`.
      12 |           # end

#### 🔧 Autofix output

       1 |         type Test { # { character
       2 |           # before a
       3 |           a: [Int!]! # same a
       4 |           # before b 1
       5 |           # before b 2
       6 |           b: [String] # same b
       7 |           # before c
       8 |           c: Float!
       9 |           # before d 1
      10 |           # before d 2
      11 |           d: Int # same d
      12 |           # end
      13 |         } # } character
`;

exports[`should sort definitions 1`] = `
#### ⌨️ Code

       1 |         # START
       2 |         # before1 extend union Data
       3 |         # before2 extend union Data
       4 |         extend union Data = Role # same extend union Data
       5 |         # before extend input UserInput
       6 |         extend input UserInput {
       7 |           email: Email!
       8 |         } # same extend input UserInput
       9 |         # before fragment UserFields
      10 |         fragment UserFields on User {
      11 |           id
      12 |         } # same fragment UserFields
      13 |         # before type User
      14 |         type User # same type User
      15 |         # before extend enum Role
      16 |         extend enum Role {
      17 |           SUPERMAN
      18 |         } # same extend enum Role
      19 |         # before anonymous operation
      20 |         query {
      21 |           foo
      22 |         } # same anonymous operation
      23 |         # before mutation CreateUser
      24 |         mutation CreateUser {
      25 |           createUser
      26 |         } # same mutation CreateUser
      27 |         # before extend interface Node
      28 |         extend interface Node {
      29 |           createdAt: String!
      30 |         } # same extend interface Node
      31 |         # before extend interface Node
      32 |         extend interface Node {
      33 |           updatedAt: String!
      34 |         } # same extend interface Node
      35 |         # before type RootQuery
      36 |         type RootQuery # same type RootQuery
      37 |         # before interface Node
      38 |         interface Node # same interface Node
      39 |         # before enum Role
      40 |         enum Role # same enum Role
      41 |         # before scalar Email
      42 |         scalar Email # same scalar Email
      43 |         # before input UserInput
      44 |         input UserInput # same input UserInput
      45 |         # before extend type User
      46 |         extend type User {
      47 |           firstName: String!
      48 |         } # same extend type User
      49 |         # before schema definition
      50 |         schema {
      51 |           query: RootQuery
      52 |         } # same schema definition
      53 |         # before union Data
      54 |         union Data = User | Node # same union Data
      55 |         # before directive @auth
      56 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
      57 |         # END

#### ⚙️ Options

    {
      "definitions": true
    }

#### ❌ Error 1/9

       9 |         # before fragment UserFields
    > 10 |         fragment UserFields on User {
         |                  ^^^^^^^^^^ \`UserFields\` should be before \`UserInput\`.
      11 |           id

#### ❌ Error 2/9

      13 |         # before type User
    > 14 |         type User # same type User
         |              ^^^^ \`User\` should be before \`UserFields\`.
      15 |         # before extend enum Role

#### ❌ Error 3/9

      15 |         # before extend enum Role
    > 16 |         extend enum Role {
         |                     ^^^^ \`Role\` should be before \`User\`.
      17 |           SUPERMAN

#### ❌ Error 4/9

      23 |         # before mutation CreateUser
    > 24 |         mutation CreateUser {
         |                  ^^^^^^^^^^ \`CreateUser\` should be before operation definition.
      25 |           createUser

#### ❌ Error 5/9

      37 |         # before interface Node
    > 38 |         interface Node # same interface Node
         |                   ^^^^ \`Node\` should be before \`RootQuery\`.
      39 |         # before enum Role

#### ❌ Error 6/9

      41 |         # before scalar Email
    > 42 |         scalar Email # same scalar Email
         |                ^^^^^ \`Email\` should be before \`Role\`.
      43 |         # before input UserInput

#### ❌ Error 7/9

      45 |         # before extend type User
    > 46 |         extend type User {
         |                     ^^^^ \`User\` should be before \`UserInput\`.
      47 |           firstName: String!

#### ❌ Error 8/9

      53 |         # before union Data
    > 54 |         union Data = User | Node # same union Data
         |               ^^^^ \`Data\` should be before schema definition.
      55 |         # before directive @auth

#### ❌ Error 9/9

      55 |         # before directive @auth
    > 56 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
         |                    ^^^^ \`auth\` should be before \`Data\`.
      57 |         # END

#### 🔧 Autofix output

       1 |         # before directive @auth
       2 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
       3 |         # before mutation CreateUser
       4 |         mutation CreateUser {
       5 |           createUser
       6 |         } # same mutation CreateUser
       7 |         # before union Data
       8 |         union Data = User | Node # same union Data
       9 |         # START
      10 |         # before1 extend union Data
      11 |         # before2 extend union Data
      12 |         extend union Data = Role # same extend union Data
      13 |         # before scalar Email
      14 |         scalar Email # same scalar Email
      15 |         # before interface Node
      16 |         interface Node # same interface Node
      17 |         # before extend interface Node
      18 |         extend interface Node {
      19 |           createdAt: String!
      20 |         } # same extend interface Node
      21 |         # before extend interface Node
      22 |         extend interface Node {
      23 |           updatedAt: String!
      24 |         } # same extend interface Node
      25 |         # before enum Role
      26 |         enum Role # same enum Role
      27 |         # before extend enum Role
      28 |         extend enum Role {
      29 |           SUPERMAN
      30 |         } # same extend enum Role
      31 |         # before type RootQuery
      32 |         type RootQuery # same type RootQuery
      33 |         # before type User
      34 |         type User # same type User
      35 |         # before extend type User
      36 |         extend type User {
      37 |           firstName: String!
      38 |         } # same extend type User
      39 |         # before fragment UserFields
      40 |         fragment UserFields on User {
      41 |           id
      42 |         } # same fragment UserFields
      43 |         # before input UserInput
      44 |         input UserInput # same input UserInput
      45 |         # before extend input UserInput
      46 |         extend input UserInput {
      47 |           email: Email!
      48 |         } # same extend input UserInput
      49 |         # before anonymous operation
      50 |         query {
      51 |           foo
      52 |         } # same anonymous operation
      53 |         # before schema definition
      54 |         schema {
      55 |           query: RootQuery
      56 |         } # same schema definition
      57 |         # END
`;

exports[`should sort when selection is aliased 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           # start
      3 |           lastName: lastname # lastName comment
      4 |           fullName: fullname # fullName comment
      5 |           firsName: firstname # firsName comment
      6 |           # end
      7 |         }

#### ⚙️ Options

    {
      "selections": [
        "OperationDefinition"
      ]
    }

#### ❌ Error 1/2

      3 |           lastName: lastname # lastName comment
    > 4 |           fullName: fullname # fullName comment
        |           ^^^^^^^^ \`fullName\` should be before \`lastName\`.
      5 |           firsName: firstname # firsName comment

#### ❌ Error 2/2

      4 |           fullName: fullname # fullName comment
    > 5 |           firsName: firstname # firsName comment
        |           ^^^^^^^^ \`firsName\` should be before \`fullName\`.
      6 |           # end

#### 🔧 Autofix output

      1 |         {
      2 |           firsName: firstname # firsName comment
      3 |           fullName: fullname # fullName comment
      4 |           # start
      5 |           lastName: lastname # lastName comment
      6 |           # end
      7 |         }
`;
