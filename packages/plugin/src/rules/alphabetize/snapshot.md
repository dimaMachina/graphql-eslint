// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`alphabetize > invalid > Invalid #1 1`] = `
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
        |           ^^^^^^^^^ field "firstName" should be before field "password"
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ field "age" should be before field "firstName"
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`alphabetize > invalid > Invalid #2 1`] = `
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
        |           ^^^^^^^^ field "lastName" should be before field "password"
      6 |         }

#### 🔧 Autofix output

      1 |         extend type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`alphabetize > invalid > Invalid #3 1`] = `
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
        |           ^^ field "bb" should be before field "cc"
      4 |           aa: Int

#### ❌ Error 2/2

      3 |           bb: Int
    > 4 |           aa: Int
        |           ^^ field "aa" should be before field "bb"
      5 |         }

#### 🔧 Autofix output

      1 |         interface Test {
      2 |           aa: Int
      3 |           bb: Int
      4 |           cc: Int
      5 |         }
`;

exports[`alphabetize > invalid > Invalid #4 1`] = `
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
        |           ^^^^^^^^^ input value "firstName" should be before input value "password"
      4 |           age: Int

#### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ input value "age" should be before input value "firstName"
      5 |           lastName: String!

#### 🔧 Autofix output

      1 |         input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`alphabetize > invalid > Invalid #5 1`] = `
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
        |           ^^^^^^^^ input value "lastName" should be before input value "password"
      6 |         }

#### 🔧 Autofix output

      1 |         extend input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`alphabetize > invalid > Invalid #6 1`] = `
#### ⌨️ Code

      1 |         enum Role {
      2 |           SUPER_ADMIN
      3 |           ADMIN
      4 |           USER
      5 |           GOD
      6 |         }

#### ⚙️ Options

    {
      "values": true
    }

#### ❌ Error 1/2

      2 |           SUPER_ADMIN
    > 3 |           ADMIN
        |           ^^^^^ enum value "ADMIN" should be before enum value "SUPER_ADMIN"
      4 |           USER

#### ❌ Error 2/2

      4 |           USER
    > 5 |           GOD
        |           ^^^ enum value "GOD" should be before enum value "USER"
      6 |         }

#### 🔧 Autofix output

      1 |         enum Role {
      2 |           ADMIN
      3 |           GOD
      4 |           SUPER_ADMIN
      5 |           USER
      6 |         }
`;

exports[`alphabetize > invalid > Invalid #7 1`] = `
#### ⌨️ Code

      1 |         extend enum Role {
      2 |           ADMIN
      3 |           SUPER_ADMIN
      4 |           GOD
      5 |           USER
      6 |         }

#### ⚙️ Options

    {
      "values": true
    }

#### ❌ Error

      3 |           SUPER_ADMIN
    > 4 |           GOD
        |           ^^^ enum value "GOD" should be before enum value "SUPER_ADMIN"
      5 |           USER

#### 🔧 Autofix output

      1 |         extend enum Role {
      2 |           ADMIN
      3 |           GOD
      4 |           SUPER_ADMIN
      5 |           USER
      6 |         }
`;

exports[`alphabetize > invalid > Invalid #8 1`] = `
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
        |                                     ^^ input value "bb" should be before input value "cc"

#### ❌ Error 2/2

    > 1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
        |                                                ^^ input value "aa" should be before input value "bb"

#### 🔧 Autofix output

      1 |         directive @test(aa: Aa!, bb: [Bb!], cc: [Cc!]!) on FIELD_DEFINITION
`;

exports[`alphabetize > invalid > Invalid #9 1`] = `
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
        |                            ^^ input value "bb" should be before input value "cc"
      3 |         }

#### ❌ Error 2/2

      1 |         type Query {
    > 2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
        |                                       ^^ input value "aa" should be before input value "bb"
      3 |         }

#### 🔧 Autofix output

      1 |         type Query {
      2 |           test(aa: Aa!, bb: [Bb!], cc: [Cc!]!): Int
      3 |         }
`;

exports[`alphabetize > invalid > Invalid #10 1`] = `
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
        |           ^^ field "bb" should be before field "cc"
      4 |           aa

#### ❌ Error 2/2

      3 |           bb
    > 4 |           aa
        |           ^^ field "aa" should be before field "bb"
      5 |         }

#### 🔧 Autofix output

      1 |         fragment TestFields on Test {
      2 |           aa
      3 |           bb
      4 |           cc
      5 |         }
`;

exports[`alphabetize > invalid > Invalid #11 1`] = `
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
        |               ^^^ field "bbb" should be before field "ccc"
      7 |               aaa

#### ❌ Error 2/4

      6 |               bbb
    > 7 |               aaa
        |               ^^^ field "aaa" should be before field "bbb"
      8 |             }

#### ❌ Error 3/4

       8 |             }
    >  9 |             bb
         |             ^^ field "bb" should be before inline fragment
      10 |             aa

#### ❌ Error 4/4

       9 |             bb
    > 10 |             aa
         |             ^^ field "aa" should be before field "bb"
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

exports[`alphabetize > invalid > Invalid #12 1`] = `
#### ⌨️ Code

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
      3 |             something
      4 |           }
      5 |         }

#### ⚙️ Options

    {
      "variables": true,
      "arguments": [
        "Field"
      ]
    }

#### ❌ Error 1/4

    > 1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
        |                                 ^^ variable "bb" should be before variable "cc"
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {

#### ❌ Error 2/4

    > 1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
        |                                             ^^ variable "aa" should be before variable "bb"
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {

#### ❌ Error 3/4

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
    > 2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
        |                          ^^^ argument "bbb" should be before argument "ccc"
      3 |             something

#### ❌ Error 4/4

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
    > 2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
        |                                    ^^^ argument "aaa" should be before argument "bbb"
      3 |             something

#### 🔧 Autofix output

      1 |         mutation ($aa: Aa!, $bb: [Bb!], $cc: [Cc!]!) {
      2 |           test(aaa: $aa, bbb: $bb, ccc: $cc) {
      3 |             something
      4 |           }
      5 |         }
`;

exports[`alphabetize > invalid > should compare with lexicographic order 1`] = `
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
      "values": true
    }

#### ❌ Error 1/3

      3 |           qux
    > 4 |           foo
        |           ^^^ enum value "foo" should be before enum value "qux"
      5 |           "Bar"

#### ❌ Error 2/3

      5 |           "Bar"
    > 6 |           Bar
        |           ^^^ enum value "Bar" should be before enum value "foo"
      7 |           """

#### ❌ Error 3/3

       9 |           """
    > 10 |           bar
         |           ^^^ enum value "bar" should be before enum value "Bar"
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

exports[`alphabetize > invalid > should move comment 1`] = `
#### ⌨️ Code

       1 |         type Test { # { character
       2 |           # before d 1
       3 |
       4 |           # before d 2
       5 |           d: Int # same d
       6 |           # before c
       7 |           c: Float!
       8 |           # before b 1
       9 |           # before b 2
      10 |           b: [String] # same b
      11 |           # before a
      12 |           a: [Int!]! # same a
      13 |           # end
      14 |         } # } character

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

#### ❌ Error 1/3

      6 |           # before c
    > 7 |           c: Float!
        |           ^ field "c" should be before field "d"
      8 |           # before b 1

#### ❌ Error 2/3

       9 |           # before b 2
    > 10 |           b: [String] # same b
         |           ^ field "b" should be before field "c"
      11 |           # before a

#### ❌ Error 3/3

      11 |           # before a
    > 12 |           a: [Int!]! # same a
         |           ^ field "a" should be before field "b"
      13 |           # end

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
      10 |
      11 |           # before d 2
      12 |           d: Int # same d
      13 |           # end
      14 |         } # } character
`;

exports[`alphabetize > invalid > should sort by group when \`*\` at the start 1`] = `
#### ⌨️ Code

       1 |   type User {
       2 |     firstName: Int
       3 |     createdAt: DateTime
       4 |     author: Int
       5 |     wagon: Int
       6 |     id: ID
       7 |     foo: Int
       8 |     updatedAt: DateTime
       9 |     bar: Int
      10 |     nachos: Int
      11 |     guild: Int
      12 |   }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ],
      "groups": [
        "*",
        "updatedAt",
        "id",
        "createdAt"
      ]
    }

#### ❌ Error 1/4

      3 |     createdAt: DateTime
    > 4 |     author: Int
        |     ^^^^^^ field "author" should be before field "createdAt"
      5 |     wagon: Int

#### ❌ Error 2/4

      6 |     id: ID
    > 7 |     foo: Int
        |     ^^^ field "foo" should be before field "id"
      8 |     updatedAt: DateTime

#### ❌ Error 3/4

       8 |     updatedAt: DateTime
    >  9 |     bar: Int
         |     ^^^ field "bar" should be before field "updatedAt"
      10 |     nachos: Int

#### ❌ Error 4/4

      10 |     nachos: Int
    > 11 |     guild: Int
         |     ^^^^^ field "guild" should be before field "nachos"
      12 |   }

#### 🔧 Autofix output

       1 |   type User {
       2 |     author: Int
       3 |     bar: Int
       4 |     firstName: Int
       5 |     foo: Int
       6 |     guild: Int
       7 |     nachos: Int
       8 |     wagon: Int
       9 |     updatedAt: DateTime
      10 |     id: ID
      11 |     createdAt: DateTime
      12 |   }
`;

exports[`alphabetize > invalid > should sort by group when \`*\` is at the end 1`] = `
#### ⌨️ Code

       1 |   type User {
       2 |     firstName: Int
       3 |     createdAt: DateTime
       4 |     author: Int
       5 |     wagon: Int
       6 |     id: ID
       7 |     foo: Int
       8 |     updatedAt: DateTime
       9 |     bar: Int
      10 |     nachos: Int
      11 |     guild: Int
      12 |   }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ],
      "groups": [
        "updatedAt",
        "id",
        "createdAt",
        "*"
      ]
    }

#### ❌ Error 1/4

      2 |     firstName: Int
    > 3 |     createdAt: DateTime
        |     ^^^^^^^^^ field "createdAt" should be before field "firstName"
      4 |     author: Int

#### ❌ Error 2/4

      5 |     wagon: Int
    > 6 |     id: ID
        |     ^^ field "id" should be before field "wagon"
      7 |     foo: Int

#### ❌ Error 3/4

      7 |     foo: Int
    > 8 |     updatedAt: DateTime
        |     ^^^^^^^^^ field "updatedAt" should be before field "foo"
      9 |     bar: Int

#### ❌ Error 4/4

      10 |     nachos: Int
    > 11 |     guild: Int
         |     ^^^^^ field "guild" should be before field "nachos"
      12 |   }

#### 🔧 Autofix output

       1 |   type User {
       2 |     updatedAt: DateTime
       3 |     id: ID
       4 |     createdAt: DateTime
       5 |     author: Int
       6 |     bar: Int
       7 |     firstName: Int
       8 |     foo: Int
       9 |     guild: Int
      10 |     nachos: Int
      11 |     wagon: Int
      12 |   }
`;

exports[`alphabetize > invalid > should sort by group when \`*\` is between 1`] = `
#### ⌨️ Code

       1 |   type User {
       2 |     firstName: Int
       3 |     createdAt: DateTime
       4 |     author: Int
       5 |     wagon: Int
       6 |     id: ID
       7 |     foo: Int
       8 |     updatedAt: DateTime
       9 |     bar: Int
      10 |     nachos: Int
      11 |     guild: Int
      12 |   }

#### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ],
      "groups": [
        "id",
        "*",
        "createdAt",
        "updatedAt"
      ]
    }

#### ❌ Error 1/4

      3 |     createdAt: DateTime
    > 4 |     author: Int
        |     ^^^^^^ field "author" should be before field "createdAt"
      5 |     wagon: Int

#### ❌ Error 2/4

      5 |     wagon: Int
    > 6 |     id: ID
        |     ^^ field "id" should be before field "wagon"
      7 |     foo: Int

#### ❌ Error 3/4

       8 |     updatedAt: DateTime
    >  9 |     bar: Int
         |     ^^^ field "bar" should be before field "updatedAt"
      10 |     nachos: Int

#### ❌ Error 4/4

      10 |     nachos: Int
    > 11 |     guild: Int
         |     ^^^^^ field "guild" should be before field "nachos"
      12 |   }

#### 🔧 Autofix output

       1 |   type User {
       2 |     id: ID
       3 |     author: Int
       4 |     bar: Int
       5 |     firstName: Int
       6 |     foo: Int
       7 |     guild: Int
       8 |     nachos: Int
       9 |     wagon: Int
      10 |     createdAt: DateTime
      11 |     updatedAt: DateTime
      12 |   }
`;

exports[`alphabetize > invalid > should sort definitions 1`] = `
#### ⌨️ Code

       1 |         # START
       2 |
       3 |         # before1 extend union Data
       4 |         # before2 extend union Data
       5 |         extend union Data = Role # same extend union Data
       6 |         # before extend input UserInput
       7 |         extend input UserInput {
       8 |           email: Email!
       9 |         } # same extend input UserInput
      10 |         # before fragment UserFields
      11 |         fragment UserFields on User {
      12 |           id
      13 |         } # same fragment UserFields
      14 |         # before type User
      15 |         type User # same type User
      16 |         # before extend enum Role
      17 |         extend enum Role {
      18 |           SUPERMAN
      19 |         } # same extend enum Role
      20 |         # before anonymous operation
      21 |         query {
      22 |           foo
      23 |         } # same anonymous operation
      24 |         # before mutation CreateUser
      25 |         mutation CreateUser {
      26 |           createUser
      27 |         } # same mutation CreateUser
      28 |         # before extend interface Node
      29 |         extend interface Node {
      30 |           createdAt: String!
      31 |         } # same extend interface Node
      32 |         # before extend interface Node
      33 |         extend interface Node {
      34 |           updatedAt: String!
      35 |         } # same extend interface Node
      36 |         # before type RootQuery
      37 |         type RootQuery # same type RootQuery
      38 |         # before interface Node
      39 |         interface Node # same interface Node
      40 |         # before enum Role
      41 |         enum Role # same enum Role
      42 |         # before scalar Email
      43 |         scalar Email # same scalar Email
      44 |         # before input UserInput
      45 |         input UserInput # same input UserInput
      46 |         # before extend type User
      47 |         extend type User {
      48 |           firstName: String!
      49 |         } # same extend type User
      50 |         # before schema definition
      51 |         schema {
      52 |           query: RootQuery
      53 |         } # same schema definition
      54 |         # before union Data
      55 |         union Data = User | Node # same union Data
      56 |         # before directive @auth
      57 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
      58 |
      59 |         # END

#### ⚙️ Options

    {
      "definitions": true
    }

#### ❌ Error 1/9

      10 |         # before fragment UserFields
    > 11 |         fragment UserFields on User {
         |                  ^^^^^^^^^^ fragment "UserFields" should be before input "UserInput"
      12 |           id

#### ❌ Error 2/9

      14 |         # before type User
    > 15 |         type User # same type User
         |              ^^^^ type "User" should be before fragment "UserFields"
      16 |         # before extend enum Role

#### ❌ Error 3/9

      16 |         # before extend enum Role
    > 17 |         extend enum Role {
         |                     ^^^^ enum "Role" should be before type "User"
      18 |           SUPERMAN

#### ❌ Error 4/9

      24 |         # before mutation CreateUser
    > 25 |         mutation CreateUser {
         |                  ^^^^^^^^^^ mutation "CreateUser" should be before operation definition
      26 |           createUser

#### ❌ Error 5/9

      38 |         # before interface Node
    > 39 |         interface Node # same interface Node
         |                   ^^^^ interface "Node" should be before type "RootQuery"
      40 |         # before enum Role

#### ❌ Error 6/9

      42 |         # before scalar Email
    > 43 |         scalar Email # same scalar Email
         |                ^^^^^ scalar "Email" should be before enum "Role"
      44 |         # before input UserInput

#### ❌ Error 7/9

      46 |         # before extend type User
    > 47 |         extend type User {
         |                     ^^^^ type "User" should be before input "UserInput"
      48 |           firstName: String!

#### ❌ Error 8/9

      54 |         # before union Data
    > 55 |         union Data = User | Node # same union Data
         |               ^^^^ union "Data" should be before schema definition
      56 |         # before directive @auth

#### ❌ Error 9/9

      56 |         # before directive @auth
    > 57 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
         |                    ^^^^ directive "auth" should be before union "Data"
      58 |

#### 🔧 Autofix output

       1 |         # START
       2 |
       3 |         # before directive @auth
       4 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
       5 |         # before mutation CreateUser
       6 |         mutation CreateUser {
       7 |           createUser
       8 |         } # same mutation CreateUser
       9 |         # before union Data
      10 |         union Data = User | Node # same union Data
      11 |         # before1 extend union Data
      12 |         # before2 extend union Data
      13 |         extend union Data = Role # same extend union Data
      14 |         # before scalar Email
      15 |         scalar Email # same scalar Email
      16 |         # before interface Node
      17 |         interface Node # same interface Node
      18 |         # before extend interface Node
      19 |         extend interface Node {
      20 |           createdAt: String!
      21 |         } # same extend interface Node
      22 |         # before extend interface Node
      23 |         extend interface Node {
      24 |           updatedAt: String!
      25 |         } # same extend interface Node
      26 |         # before enum Role
      27 |         enum Role # same enum Role
      28 |         # before extend enum Role
      29 |         extend enum Role {
      30 |           SUPERMAN
      31 |         } # same extend enum Role
      32 |         # before type RootQuery
      33 |         type RootQuery # same type RootQuery
      34 |         # before type User
      35 |         type User # same type User
      36 |         # before extend type User
      37 |         extend type User {
      38 |           firstName: String!
      39 |         } # same extend type User
      40 |         # before fragment UserFields
      41 |         fragment UserFields on User {
      42 |           id
      43 |         } # same fragment UserFields
      44 |         # before input UserInput
      45 |         input UserInput # same input UserInput
      46 |         # before extend input UserInput
      47 |         extend input UserInput {
      48 |           email: Email!
      49 |         } # same extend input UserInput
      50 |         # before anonymous operation
      51 |         query {
      52 |           foo
      53 |         } # same anonymous operation
      54 |         # before schema definition
      55 |         schema {
      56 |           query: RootQuery
      57 |         } # same schema definition
      58 |
      59 |         # END
`;

exports[`alphabetize > invalid > should sort selections by group when \`*\` is between 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           zz
      3 |           updatedAt
      4 |           createdAt
      5 |           aa
      6 |           id
      7 |         }

#### ⚙️ Options

    {
      "selections": [
        "OperationDefinition"
      ],
      "groups": [
        "id",
        "*",
        "createdAt",
        "updatedAt"
      ]
    }

#### ❌ Error 1/3

      3 |           updatedAt
    > 4 |           createdAt
        |           ^^^^^^^^^ field "createdAt" should be before field "updatedAt"
      5 |           aa

#### ❌ Error 2/3

      4 |           createdAt
    > 5 |           aa
        |           ^^ field "aa" should be before field "createdAt"
      6 |           id

#### ❌ Error 3/3

      5 |           aa
    > 6 |           id
        |           ^^ field "id" should be before field "aa"
      7 |         }

#### 🔧 Autofix output

      1 |         {
      2 |           id
      3 |           aa
      4 |           zz
      5 |           createdAt
      6 |           updatedAt
      7 |         }
`;

exports[`alphabetize > invalid > should sort when selection is aliased 1`] = `
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
        |           ^^^^^^^^ field "fullName" should be before field "lastName"
      5 |           firsName: firstname # firsName comment

#### ❌ Error 2/2

      4 |           fullName: fullname # fullName comment
    > 5 |           firsName: firstname # firsName comment
        |           ^^^^^^^^ field "firsName" should be before field "fullName"
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
