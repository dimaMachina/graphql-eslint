// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-unreachable-types > invalid > Invalid #1 1`] = `
#### ⌨️ Code

       1 |         type Query {
       2 |           node(id: ID!): AnotherNode!
       3 |         }
       4 |
       5 |         interface Node {
       6 |           id: ID!
       7 |         }
       8 |
       9 |         interface AnotherNode {
      10 |           createdAt: String
      11 |         }
      12 |
      13 |         interface User implements Node {
      14 |           id: ID!
      15 |           name: String
      16 |         }
      17 |
      18 |         type SuperUser implements User & Node {
      19 |           id: ID!
      20 |           name: String
      21 |           address: String
      22 |         }

#### ❌ Error 1/3

      4 |
    > 5 |         interface Node {
        |                   ^^^^ Interface type \`Node\` is unreachable.
      6 |           id: ID!

#### 💡 Suggestion: Remove \`Node\`

     1 |         type Query {
     2 |           node(id: ID!): AnotherNode!
     3 |         }
     4 |
     5 |         
     6 |
     7 |         interface AnotherNode {
     8 |           createdAt: String
     9 |         }
    10 |
    11 |         interface User implements Node {
    12 |           id: ID!
    13 |           name: String
    14 |         }
    15 |
    16 |         type SuperUser implements User & Node {
    17 |           id: ID!
    18 |           name: String
    19 |           address: String
    20 |         }

#### ❌ Error 2/3

      12 |
    > 13 |         interface User implements Node {
         |                   ^^^^ Interface type \`User\` is unreachable.
      14 |           id: ID!

#### 💡 Suggestion: Remove \`User\`

     1 |         type Query {
     2 |           node(id: ID!): AnotherNode!
     3 |         }
     4 |
     5 |         interface Node {
     6 |           id: ID!
     7 |         }
     8 |
     9 |         interface AnotherNode {
    10 |           createdAt: String
    11 |         }
    12 |
    13 |         
    14 |
    15 |         type SuperUser implements User & Node {
    16 |           id: ID!
    17 |           name: String
    18 |           address: String
    19 |         }

#### ❌ Error 3/3

      17 |
    > 18 |         type SuperUser implements User & Node {
         |              ^^^^^^^^^ Object type \`SuperUser\` is unreachable.
      19 |           id: ID!

#### 💡 Suggestion: Remove \`SuperUser\`

     1 |         type Query {
     2 |           node(id: ID!): AnotherNode!
     3 |         }
     4 |
     5 |         interface Node {
     6 |           id: ID!
     7 |         }
     8 |
     9 |         interface AnotherNode {
    10 |           createdAt: String
    11 |         }
    12 |
    13 |         interface User implements Node {
    14 |           id: ID!
    15 |           name: String
    16 |         }
    17 |
    18 |         
`;

exports[`no-unreachable-types > invalid > Invalid #2 1`] = `
#### ⌨️ Code

       1 |         # ScalarTypeDefinition
       2 |         scalar DateTime
       3 |
       4 |         # EnumTypeDefinition
       5 |         enum Role {
       6 |           ADMIN
       7 |           USER
       8 |         }
       9 |
      10 |         # DirectiveDefinition
      11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
      12 |
      13 |         # UnionTypeDefinition
      14 |         union Union = String | Boolean
      15 |
      16 |         # InputObjectTypeDefinition
      17 |         input UsersFilter {
      18 |           limit: Int
      19 |         }
      20 |
      21 |         # InterfaceTypeDefinition
      22 |         interface Address {
      23 |           city: String
      24 |         }
      25 |
      26 |         # ObjectTypeDefinition
      27 |         type User implements Address {
      28 |           city: String
      29 |         }

#### ❌ Error 1/7

      1 |         # ScalarTypeDefinition
    > 2 |         scalar DateTime
        |                ^^^^^^^^ Scalar type \`DateTime\` is unreachable.
      3 |

#### 💡 Suggestion: Remove \`DateTime\`

     1 |         # ScalarTypeDefinition
     2 |         
     3 |
     4 |         # EnumTypeDefinition
     5 |         enum Role {
     6 |           ADMIN
     7 |           USER
     8 |         }
     9 |
    10 |         # DirectiveDefinition
    11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    12 |
    13 |         # UnionTypeDefinition
    14 |         union Union = String | Boolean
    15 |
    16 |         # InputObjectTypeDefinition
    17 |         input UsersFilter {
    18 |           limit: Int
    19 |         }
    20 |
    21 |         # InterfaceTypeDefinition
    22 |         interface Address {
    23 |           city: String
    24 |         }
    25 |
    26 |         # ObjectTypeDefinition
    27 |         type User implements Address {
    28 |           city: String
    29 |         }

#### ❌ Error 2/7

      4 |         # EnumTypeDefinition
    > 5 |         enum Role {
        |              ^^^^ Enum type \`Role\` is unreachable.
      6 |           ADMIN

#### 💡 Suggestion: Remove \`Role\`

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |
     4 |         # EnumTypeDefinition
     5 |         
     6 |
     7 |         # DirectiveDefinition
     8 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
     9 |
    10 |         # UnionTypeDefinition
    11 |         union Union = String | Boolean
    12 |
    13 |         # InputObjectTypeDefinition
    14 |         input UsersFilter {
    15 |           limit: Int
    16 |         }
    17 |
    18 |         # InterfaceTypeDefinition
    19 |         interface Address {
    20 |           city: String
    21 |         }
    22 |
    23 |         # ObjectTypeDefinition
    24 |         type User implements Address {
    25 |           city: String
    26 |         }

#### ❌ Error 3/7

      10 |         # DirectiveDefinition
    > 11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
         |                    ^^^^ Directive \`auth\` is unreachable.
      12 |

#### 💡 Suggestion: Remove \`auth\`

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |
     4 |         # EnumTypeDefinition
     5 |         enum Role {
     6 |           ADMIN
     7 |           USER
     8 |         }
     9 |
    10 |         # DirectiveDefinition
    11 |         
    12 |
    13 |         # UnionTypeDefinition
    14 |         union Union = String | Boolean
    15 |
    16 |         # InputObjectTypeDefinition
    17 |         input UsersFilter {
    18 |           limit: Int
    19 |         }
    20 |
    21 |         # InterfaceTypeDefinition
    22 |         interface Address {
    23 |           city: String
    24 |         }
    25 |
    26 |         # ObjectTypeDefinition
    27 |         type User implements Address {
    28 |           city: String
    29 |         }

#### ❌ Error 4/7

      13 |         # UnionTypeDefinition
    > 14 |         union Union = String | Boolean
         |               ^^^^^ Union type \`Union\` is unreachable.
      15 |

#### 💡 Suggestion: Remove \`Union\`

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |
     4 |         # EnumTypeDefinition
     5 |         enum Role {
     6 |           ADMIN
     7 |           USER
     8 |         }
     9 |
    10 |         # DirectiveDefinition
    11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    12 |
    13 |         # UnionTypeDefinition
    14 |         
    15 |
    16 |         # InputObjectTypeDefinition
    17 |         input UsersFilter {
    18 |           limit: Int
    19 |         }
    20 |
    21 |         # InterfaceTypeDefinition
    22 |         interface Address {
    23 |           city: String
    24 |         }
    25 |
    26 |         # ObjectTypeDefinition
    27 |         type User implements Address {
    28 |           city: String
    29 |         }

#### ❌ Error 5/7

      16 |         # InputObjectTypeDefinition
    > 17 |         input UsersFilter {
         |               ^^^^^^^^^^^ Input object type \`UsersFilter\` is unreachable.
      18 |           limit: Int

#### 💡 Suggestion: Remove \`UsersFilter\`

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |
     4 |         # EnumTypeDefinition
     5 |         enum Role {
     6 |           ADMIN
     7 |           USER
     8 |         }
     9 |
    10 |         # DirectiveDefinition
    11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    12 |
    13 |         # UnionTypeDefinition
    14 |         union Union = String | Boolean
    15 |
    16 |         # InputObjectTypeDefinition
    17 |         
    18 |
    19 |         # InterfaceTypeDefinition
    20 |         interface Address {
    21 |           city: String
    22 |         }
    23 |
    24 |         # ObjectTypeDefinition
    25 |         type User implements Address {
    26 |           city: String
    27 |         }

#### ❌ Error 6/7

      21 |         # InterfaceTypeDefinition
    > 22 |         interface Address {
         |                   ^^^^^^^ Interface type \`Address\` is unreachable.
      23 |           city: String

#### 💡 Suggestion: Remove \`Address\`

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |
     4 |         # EnumTypeDefinition
     5 |         enum Role {
     6 |           ADMIN
     7 |           USER
     8 |         }
     9 |
    10 |         # DirectiveDefinition
    11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    12 |
    13 |         # UnionTypeDefinition
    14 |         union Union = String | Boolean
    15 |
    16 |         # InputObjectTypeDefinition
    17 |         input UsersFilter {
    18 |           limit: Int
    19 |         }
    20 |
    21 |         # InterfaceTypeDefinition
    22 |         
    23 |
    24 |         # ObjectTypeDefinition
    25 |         type User implements Address {
    26 |           city: String
    27 |         }

#### ❌ Error 7/7

      26 |         # ObjectTypeDefinition
    > 27 |         type User implements Address {
         |              ^^^^ Object type \`User\` is unreachable.
      28 |           city: String

#### 💡 Suggestion: Remove \`User\`

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |
     4 |         # EnumTypeDefinition
     5 |         enum Role {
     6 |           ADMIN
     7 |           USER
     8 |         }
     9 |
    10 |         # DirectiveDefinition
    11 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    12 |
    13 |         # UnionTypeDefinition
    14 |         union Union = String | Boolean
    15 |
    16 |         # InputObjectTypeDefinition
    17 |         input UsersFilter {
    18 |           limit: Int
    19 |         }
    20 |
    21 |         # InterfaceTypeDefinition
    22 |         interface Address {
    23 |           city: String
    24 |         }
    25 |
    26 |         # ObjectTypeDefinition
    27 |         
`;

exports[`no-unreachable-types > invalid > Invalid #3 1`] = `
#### ⌨️ Code

       1 |         interface User {
       2 |           id: String
       3 |         }
       4 |
       5 |         type SuperUser implements User {
       6 |           id: String
       7 |           superDetail: SuperDetail
       8 |         }
       9 |
      10 |         type SuperDetail {
      11 |           detail: String
      12 |         }
      13 |
      14 |         type Query {
      15 |           user: User!
      16 |         }
      17 |
      18 |         scalar DateTime

#### ❌ Error

      17 |
    > 18 |         scalar DateTime
         |                ^^^^^^^^ Scalar type \`DateTime\` is unreachable.

#### 💡 Suggestion: Remove \`DateTime\`

     1 |         interface User {
     2 |           id: String
     3 |         }
     4 |
     5 |         type SuperUser implements User {
     6 |           id: String
     7 |           superDetail: SuperDetail
     8 |         }
     9 |
    10 |         type SuperDetail {
    11 |           detail: String
    12 |         }
    13 |
    14 |         type Query {
    15 |           user: User!
    16 |         }
    17 |
    18 |         
`;

exports[`no-unreachable-types > invalid > Invalid #4 1`] = `
#### ⌨️ Code

       1 |         interface User {
       2 |           id: String
       3 |         }
       4 |
       5 |         interface AnotherUser {
       6 |           createdAt: String
       7 |         }
       8 |
       9 |         type SuperUser implements User {
      10 |           id: String
      11 |         }
      12 |
      13 |         # ObjectTypeExtension
      14 |         extend type SuperUser {
      15 |           detail: String
      16 |         }
      17 |
      18 |         type Query {
      19 |           user: AnotherUser!
      20 |         }

#### ❌ Error 1/3

    > 1 |         interface User {
        |                   ^^^^ Interface type \`User\` is unreachable.
      2 |           id: String

#### 💡 Suggestion: Remove \`User\`

     1 |         
     2 |
     3 |         interface AnotherUser {
     4 |           createdAt: String
     5 |         }
     6 |
     7 |         type SuperUser implements User {
     8 |           id: String
     9 |         }
    10 |
    11 |         # ObjectTypeExtension
    12 |         extend type SuperUser {
    13 |           detail: String
    14 |         }
    15 |
    16 |         type Query {
    17 |           user: AnotherUser!
    18 |         }

#### ❌ Error 2/3

       8 |
    >  9 |         type SuperUser implements User {
         |              ^^^^^^^^^ Object type \`SuperUser\` is unreachable.
      10 |           id: String

#### 💡 Suggestion: Remove \`SuperUser\`

     1 |         interface User {
     2 |           id: String
     3 |         }
     4 |
     5 |         interface AnotherUser {
     6 |           createdAt: String
     7 |         }
     8 |
     9 |         
    10 |
    11 |         # ObjectTypeExtension
    12 |         extend type SuperUser {
    13 |           detail: String
    14 |         }
    15 |
    16 |         type Query {
    17 |           user: AnotherUser!
    18 |         }

#### ❌ Error 3/3

      13 |         # ObjectTypeExtension
    > 14 |         extend type SuperUser {
         |                     ^^^^^^^^^ Object type \`SuperUser\` is unreachable.
      15 |           detail: String

#### 💡 Suggestion: Remove \`SuperUser\`

     1 |         interface User {
     2 |           id: String
     3 |         }
     4 |
     5 |         interface AnotherUser {
     6 |           createdAt: String
     7 |         }
     8 |
     9 |         type SuperUser implements User {
    10 |           id: String
    11 |         }
    12 |
    13 |         # ObjectTypeExtension
    14 |         
    15 |
    16 |         type Query {
    17 |           user: AnotherUser!
    18 |         }
`;

exports[`no-unreachable-types > invalid > Invalid #5 1`] = `
#### ⌨️ Code

       1 |         type Query {
       2 |           node(id: ID!): Node!
       3 |         }
       4 |
       5 |         interface Node {
       6 |           id: ID!
       7 |         }
       8 |
       9 |         interface User implements Node {
      10 |           id: ID!
      11 |           name: String
      12 |         }
      13 |
      14 |         type SuperUser implements User & Node {
      15 |           id: ID!
      16 |           name: String
      17 |           address: String
      18 |         }
      19 |
      20 |         scalar DateTime

#### ❌ Error

      19 |
    > 20 |         scalar DateTime
         |                ^^^^^^^^ Scalar type \`DateTime\` is unreachable.

#### 💡 Suggestion: Remove \`DateTime\`

     1 |         type Query {
     2 |           node(id: ID!): Node!
     3 |         }
     4 |
     5 |         interface Node {
     6 |           id: ID!
     7 |         }
     8 |
     9 |         interface User implements Node {
    10 |           id: ID!
    11 |           name: String
    12 |         }
    13 |
    14 |         type SuperUser implements User & Node {
    15 |           id: ID!
    16 |           name: String
    17 |           address: String
    18 |         }
    19 |
    20 |         
`;
