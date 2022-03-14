// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
##### ⌨️ Code

      1 |         type User {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

##### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

##### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

##### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

##### 🔧 Autofix output

      1 |         type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #2 1`] = `
##### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

##### ❌ Error

      1 |         extend type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           password: String
    > 5 |           lastName: String!
        |           ^^^^^^^^ \`lastName\` should be before \`password\`.
      6 |         }

##### 🔧 Autofix output

      1 |         extend type User {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #3 1`] = `
##### ⌨️ Code

      1 |         interface Test {
      2 |           cc: Int
      3 |           bb: Int
      4 |           aa: Int
      5 |         }

##### ⚙️ Options

    {
      "fields": [
        "InterfaceTypeDefinition"
      ]
    }

##### ❌ Error 1/2

      2 |           cc: Int
    > 3 |           bb: Int
        |           ^^ \`bb\` should be before \`cc\`.
      4 |           aa: Int

##### ❌ Error 2/2

      3 |           bb: Int
    > 4 |           aa: Int
        |           ^^ \`aa\` should be before \`bb\`.
      5 |         }

##### 🔧 Autofix output

      1 |         interface Test {
      2 |           aa: Int
      3 |           bb: Int
      4 |           cc: Int
      5 |         }
`;

exports[`Invalid #4 1`] = `
##### ⌨️ Code

      1 |         input UserInput {
      2 |           password: String
      3 |           firstName: String!
      4 |           age: Int
      5 |           lastName: String!
      6 |         }

##### ⚙️ Options

    {
      "fields": [
        "InputObjectTypeDefinition"
      ]
    }

##### ❌ Error 1/2

      2 |           password: String
    > 3 |           firstName: String!
        |           ^^^^^^^^^ \`firstName\` should be before \`password\`.
      4 |           age: Int

##### ❌ Error 2/2

      3 |           firstName: String!
    > 4 |           age: Int
        |           ^^^ \`age\` should be before \`firstName\`.
      5 |           lastName: String!

##### 🔧 Autofix output

      1 |         input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #5 1`] = `
##### ⚙️ Options

    {
      "fields": [
        "InputObjectTypeDefinition"
      ]
    }

##### ❌ Error

      1 |         extend input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           password: String
    > 5 |           lastName: String!
        |           ^^^^^^^^ \`lastName\` should be before \`password\`.
      6 |         }

##### 🔧 Autofix output

      1 |         extend input UserInput {
      2 |           age: Int
      3 |           firstName: String!
      4 |           lastName: String!
      5 |           password: String
      6 |         }
`;

exports[`Invalid #6 1`] = `
##### ⌨️ Code

      1 |         enum Role {
      2 |           SUPER_ADMIN
      3 |           ADMIN
      4 |           USER
      5 |           GOD
      6 |         }

##### ⚙️ Options

    {
      "values": [
        "EnumTypeDefinition"
      ]
    }

##### ❌ Error 1/2

      2 |           SUPER_ADMIN
    > 3 |           ADMIN
        |           ^^^^^ \`ADMIN\` should be before \`SUPER_ADMIN\`.
      4 |           USER

##### ❌ Error 2/2

      4 |           USER
    > 5 |           GOD
        |           ^^^ \`GOD\` should be before \`USER\`.
      6 |         }

##### 🔧 Autofix output

      1 |         enum Role {
      2 |           ADMIN
      3 |           GOD
      4 |           SUPER_ADMIN
      5 |           USER
      6 |         }
`;

exports[`Invalid #7 1`] = `
##### ⚙️ Options

    {
      "values": [
        "EnumTypeDefinition"
      ]
    }

##### ❌ Error

      1 |         extend enum Role {
      2 |           ADMIN
      3 |           SUPER_ADMIN
    > 4 |           GOD
        |           ^^^ \`GOD\` should be before \`SUPER_ADMIN\`.
      5 |           USER
      6 |         }

##### 🔧 Autofix output

      1 |         extend enum Role {
      2 |           ADMIN
      3 |           GOD
      4 |           SUPER_ADMIN
      5 |           USER
      6 |         }
`;

exports[`Invalid #8 1`] = `
##### ⌨️ Code

      1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION

##### ⚙️ Options

    {
      "arguments": [
        "DirectiveDefinition"
      ]
    }

##### ❌ Error 1/2

    > 1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
        |                                     ^^ \`bb\` should be before \`cc\`.

##### ❌ Error 2/2

    > 1 |         directive @test(cc: [Cc!]!, bb: [Bb!], aa: Aa!) on FIELD_DEFINITION
        |                                                ^^ \`aa\` should be before \`bb\`.

##### 🔧 Autofix output

      1 |         directive @test(aa: Aa!, bb: [Bb!], cc: [Cc!]!) on FIELD_DEFINITION
`;

exports[`Invalid #9 1`] = `
##### ⌨️ Code

      1 |         type Query {
      2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
      3 |         }

##### ⚙️ Options

    {
      "arguments": [
        "FieldDefinition"
      ]
    }

##### ❌ Error 1/2

      1 |         type Query {
    > 2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
        |                            ^^ \`bb\` should be before \`cc\`.
      3 |         }

##### ❌ Error 2/2

      1 |         type Query {
    > 2 |           test(cc: [Cc!]!, bb: [Bb!], aa: Aa!): Int
        |                                       ^^ \`aa\` should be before \`bb\`.
      3 |         }

##### 🔧 Autofix output

      1 |         type Query {
      2 |           test(aa: Aa!, bb: [Bb!], cc: [Cc!]!): Int
      3 |         }
`;

exports[`Invalid #10 1`] = `
##### ⌨️ Code

      1 |         fragment TestFields on Test {
      2 |           cc
      3 |           bb
      4 |           aa
      5 |         }

##### ⚙️ Options

    {
      "selections": [
        "FragmentDefinition"
      ]
    }

##### ❌ Error 1/2

      2 |           cc
    > 3 |           bb
        |           ^^ \`bb\` should be before \`cc\`.
      4 |           aa

##### ❌ Error 2/2

      3 |           bb
    > 4 |           aa
        |           ^^ \`aa\` should be before \`bb\`.
      5 |         }

##### 🔧 Autofix output

      1 |         fragment TestFields on Test {
      2 |           aa
      3 |           bb
      4 |           cc
      5 |         }
`;

exports[`Invalid #11 1`] = `
##### ⌨️ Code

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

##### ⚙️ Options

    {
      "selections": [
        "OperationDefinition"
      ]
    }

##### ❌ Error 1/4

      5 |               ccc
    > 6 |               bbb
        |               ^^^ \`bbb\` should be before \`ccc\`.
      7 |               aaa

##### ❌ Error 2/4

      6 |               bbb
    > 7 |               aaa
        |               ^^^ \`aaa\` should be before \`bbb\`.
      8 |             }

##### ❌ Error 3/4

       8 |             }
    >  9 |             bb
         |             ^^ \`bb\` should be before inline fragment.
      10 |             aa

##### ❌ Error 4/4

       9 |             bb
    > 10 |             aa
         |             ^^ \`aa\` should be before \`bb\`.
      11 |           }

##### 🔧 Autofix output

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

exports[`Invalid #12 1`] = `
##### ⌨️ Code

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
      3 |             something
      4 |           }
      5 |         }

##### ⚙️ Options

    {
      "variables": [
        "OperationDefinition"
      ],
      "arguments": [
        "Field"
      ]
    }

##### ❌ Error 1/4

    > 1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
        |                                 ^^ \`bb\` should be before \`cc\`.
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {

##### ❌ Error 2/4

    > 1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
        |                                             ^^ \`aa\` should be before \`bb\`.
      2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {

##### ❌ Error 3/4

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
    > 2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
        |                          ^^^ \`bbb\` should be before \`ccc\`.
      3 |             something

##### ❌ Error 4/4

      1 |         mutation ($cc: [Cc!]!, $bb: [Bb!], $aa: Aa!) {
    > 2 |           test(ccc: $cc, bbb: $bb, aaa: $aa) {
        |                                    ^^^ \`aaa\` should be before \`bbb\`.
      3 |             something

##### 🔧 Autofix output

      1 |         mutation ($aa: Aa!, $bb: [Bb!], $cc: [Cc!]!) {
      2 |           test(aaa: $aa, bbb: $bb, ccc: $cc) {
      3 |             something
      4 |           }
      5 |         }
`;

exports[`should compare with lexicographic order 1`] = `
##### ⌨️ Code

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

##### ⚙️ Options

    {
      "values": [
        "EnumTypeDefinition"
      ]
    }

##### ❌ Error 1/3

      3 |           qux
    > 4 |           foo
        |           ^^^ \`foo\` should be before \`qux\`.
      5 |           "Bar"

##### ❌ Error 2/3

      5 |           "Bar"
    > 6 |           Bar
        |           ^^^ \`Bar\` should be before \`foo\`.
      7 |           """

##### ❌ Error 3/3

       9 |           """
    > 10 |           bar
         |           ^^^ \`bar\` should be before \`Bar\`.
      11 |         }

##### 🔧 Autofix output

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
##### ⌨️ Code

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

##### ⚙️ Options

    {
      "fields": [
        "ObjectTypeDefinition"
      ]
    }

##### ❌ Error 1/3

      6 |           # before c
    > 7 |           c: Float!
        |           ^ \`c\` should be before \`d\`.
      8 |           # before b 1

##### ❌ Error 2/3

       9 |           # before b 2
    > 10 |           b: [String] # same b
         |           ^ \`b\` should be before \`c\`.
      11 |           # before a

##### ❌ Error 3/3

      11 |           # before a
    > 12 |           a: [Int!]! # same a
         |           ^ \`a\` should be before \`b\`.
      13 |           # end

##### 🔧 Autofix output

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

exports[`should sort definitions 1`] = `
##### ⌨️ Code

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

##### ⚙️ Options

    {
      "definitions": true
    }

##### ❌ Error 1/9

      10 |         # before fragment UserFields
    > 11 |         fragment UserFields on User {
         |                  ^^^^^^^^^^ \`UserFields\` should be before \`UserInput\`.
      12 |           id

##### ❌ Error 2/9

      14 |         # before type User
    > 15 |         type User # same type User
         |              ^^^^ \`User\` should be before \`UserFields\`.
      16 |         # before extend enum Role

##### ❌ Error 3/9

      16 |         # before extend enum Role
    > 17 |         extend enum Role {
         |                     ^^^^ \`Role\` should be before \`User\`.
      18 |           SUPERMAN

##### ❌ Error 4/9

      24 |         # before mutation CreateUser
    > 25 |         mutation CreateUser {
         |                  ^^^^^^^^^^ \`CreateUser\` should be before operation definition.
      26 |           createUser

##### ❌ Error 5/9

      38 |         # before interface Node
    > 39 |         interface Node # same interface Node
         |                   ^^^^ \`Node\` should be before \`RootQuery\`.
      40 |         # before enum Role

##### ❌ Error 6/9

      42 |         # before scalar Email
    > 43 |         scalar Email # same scalar Email
         |                ^^^^^ \`Email\` should be before \`Role\`.
      44 |         # before input UserInput

##### ❌ Error 7/9

      46 |         # before extend type User
    > 47 |         extend type User {
         |                     ^^^^ \`User\` should be before \`UserInput\`.
      48 |           firstName: String!

##### ❌ Error 8/9

      54 |         # before union Data
    > 55 |         union Data = User | Node # same union Data
         |               ^^^^ \`Data\` should be before schema definition.
      56 |         # before directive @auth

##### ❌ Error 9/9

      56 |         # before directive @auth
    > 57 |         directive @auth(role: [Role!]!) on FIELD_DEFINITION # same directive @auth
         |                    ^^^^ \`auth\` should be before \`Data\`.
      58 |

##### 🔧 Autofix output

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
