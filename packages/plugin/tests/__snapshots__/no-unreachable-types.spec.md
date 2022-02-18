// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         type Query {
       2 |           node(id: ID!): AnotherNode!
       3 |         }
       4 |         interface Node {
       5 |           id: ID!
       6 |         }
       7 |         interface AnotherNode {
       8 |           createdAt: String
       9 |         }
      10 |         interface User implements Node {
      11 |           id: ID!
      12 |           name: String
      13 |         }
      14 |         type SuperUser implements User & Node {
      15 |           id: ID!
      16 |           name: String
      17 |           address: String
      18 |         }

❌ Error 1/3

      3 |         }
    > 4 |         interface Node {
        |                   ^^^^ Type "Node" is unreachable
      5 |           id: ID!

💡 Suggestion: Remove Node

     1 |         type Query {
     2 |           node(id: ID!): AnotherNode!
     3 |         }
     4 |         
     5 |         interface AnotherNode {
     6 |           createdAt: String
     7 |         }
     8 |         interface User implements Node {
     9 |           id: ID!
    10 |           name: String
    11 |         }
    12 |         type SuperUser implements User & Node {
    13 |           id: ID!
    14 |           name: String
    15 |           address: String
    16 |         }

❌ Error 2/3

       9 |         }
    > 10 |         interface User implements Node {
         |                   ^^^^ Type "User" is unreachable
      11 |           id: ID!

💡 Suggestion: Remove User

     1 |         type Query {
     2 |           node(id: ID!): AnotherNode!
     3 |         }
     4 |         interface Node {
     5 |           id: ID!
     6 |         }
     7 |         interface AnotherNode {
     8 |           createdAt: String
     9 |         }
    10 |         
    11 |         type SuperUser implements User & Node {
    12 |           id: ID!
    13 |           name: String
    14 |           address: String
    15 |         }

❌ Error 3/3

      13 |         }
    > 14 |         type SuperUser implements User & Node {
         |              ^^^^^^^^^ Type "SuperUser" is unreachable
      15 |           id: ID!

💡 Suggestion: Remove SuperUser

     1 |         type Query {
     2 |           node(id: ID!): AnotherNode!
     3 |         }
     4 |         interface Node {
     5 |           id: ID!
     6 |         }
     7 |         interface AnotherNode {
     8 |           createdAt: String
     9 |         }
    10 |         interface User implements Node {
    11 |           id: ID!
    12 |           name: String
    13 |         }
    14 |         
`;

exports[` 2`] = `
Code

       1 |         # ScalarTypeDefinition
       2 |         scalar DateTime
       3 |         # EnumTypeDefinition
       4 |         enum Role {
       5 |           ADMIN
       6 |           USER
       7 |         }
       8 |         # DirectiveDefinition
       9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
      10 |         # UnionTypeDefinition
      11 |         union Union = String | Boolean
      12 |         # InputObjectTypeDefinition
      13 |         input UsersFilter {
      14 |           limit: Int
      15 |         }
      16 |         # InterfaceTypeDefinition
      17 |         interface Address {
      18 |           city: String
      19 |         }
      20 |         # ObjectTypeDefinition
      21 |         type User implements Address {
      22 |           city: String
      23 |         }

❌ Error 1/7

      1 |         # ScalarTypeDefinition
    > 2 |         scalar DateTime
        |                ^^^^^^^^ Type "DateTime" is unreachable
      3 |         # EnumTypeDefinition

💡 Suggestion: Remove DateTime

     1 |         # ScalarTypeDefinition
     2 |         
     3 |         # EnumTypeDefinition
     4 |         enum Role {
     5 |           ADMIN
     6 |           USER
     7 |         }
     8 |         # DirectiveDefinition
     9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    10 |         # UnionTypeDefinition
    11 |         union Union = String | Boolean
    12 |         # InputObjectTypeDefinition
    13 |         input UsersFilter {
    14 |           limit: Int
    15 |         }
    16 |         # InterfaceTypeDefinition
    17 |         interface Address {
    18 |           city: String
    19 |         }
    20 |         # ObjectTypeDefinition
    21 |         type User implements Address {
    22 |           city: String
    23 |         }

❌ Error 2/7

      3 |         # EnumTypeDefinition
    > 4 |         enum Role {
        |              ^^^^ Type "Role" is unreachable
      5 |           ADMIN

💡 Suggestion: Remove Role

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |         # EnumTypeDefinition
     4 |         
     5 |         # DirectiveDefinition
     6 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
     7 |         # UnionTypeDefinition
     8 |         union Union = String | Boolean
     9 |         # InputObjectTypeDefinition
    10 |         input UsersFilter {
    11 |           limit: Int
    12 |         }
    13 |         # InterfaceTypeDefinition
    14 |         interface Address {
    15 |           city: String
    16 |         }
    17 |         # ObjectTypeDefinition
    18 |         type User implements Address {
    19 |           city: String
    20 |         }

❌ Error 3/7

       8 |         # DirectiveDefinition
    >  9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
         |                    ^^^^ Type "auth" is unreachable
      10 |         # UnionTypeDefinition

💡 Suggestion: Remove auth

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |         # EnumTypeDefinition
     4 |         enum Role {
     5 |           ADMIN
     6 |           USER
     7 |         }
     8 |         # DirectiveDefinition
     9 |         
    10 |         # UnionTypeDefinition
    11 |         union Union = String | Boolean
    12 |         # InputObjectTypeDefinition
    13 |         input UsersFilter {
    14 |           limit: Int
    15 |         }
    16 |         # InterfaceTypeDefinition
    17 |         interface Address {
    18 |           city: String
    19 |         }
    20 |         # ObjectTypeDefinition
    21 |         type User implements Address {
    22 |           city: String
    23 |         }

❌ Error 4/7

      10 |         # UnionTypeDefinition
    > 11 |         union Union = String | Boolean
         |               ^^^^^ Type "Union" is unreachable
      12 |         # InputObjectTypeDefinition

💡 Suggestion: Remove Union

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |         # EnumTypeDefinition
     4 |         enum Role {
     5 |           ADMIN
     6 |           USER
     7 |         }
     8 |         # DirectiveDefinition
     9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    10 |         # UnionTypeDefinition
    11 |         
    12 |         # InputObjectTypeDefinition
    13 |         input UsersFilter {
    14 |           limit: Int
    15 |         }
    16 |         # InterfaceTypeDefinition
    17 |         interface Address {
    18 |           city: String
    19 |         }
    20 |         # ObjectTypeDefinition
    21 |         type User implements Address {
    22 |           city: String
    23 |         }

❌ Error 5/7

      12 |         # InputObjectTypeDefinition
    > 13 |         input UsersFilter {
         |               ^^^^^^^^^^^ Type "UsersFilter" is unreachable
      14 |           limit: Int

💡 Suggestion: Remove UsersFilter

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |         # EnumTypeDefinition
     4 |         enum Role {
     5 |           ADMIN
     6 |           USER
     7 |         }
     8 |         # DirectiveDefinition
     9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    10 |         # UnionTypeDefinition
    11 |         union Union = String | Boolean
    12 |         # InputObjectTypeDefinition
    13 |         
    14 |         # InterfaceTypeDefinition
    15 |         interface Address {
    16 |           city: String
    17 |         }
    18 |         # ObjectTypeDefinition
    19 |         type User implements Address {
    20 |           city: String
    21 |         }

❌ Error 6/7

      16 |         # InterfaceTypeDefinition
    > 17 |         interface Address {
         |                   ^^^^^^^ Type "Address" is unreachable
      18 |           city: String

💡 Suggestion: Remove Address

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |         # EnumTypeDefinition
     4 |         enum Role {
     5 |           ADMIN
     6 |           USER
     7 |         }
     8 |         # DirectiveDefinition
     9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    10 |         # UnionTypeDefinition
    11 |         union Union = String | Boolean
    12 |         # InputObjectTypeDefinition
    13 |         input UsersFilter {
    14 |           limit: Int
    15 |         }
    16 |         # InterfaceTypeDefinition
    17 |         
    18 |         # ObjectTypeDefinition
    19 |         type User implements Address {
    20 |           city: String
    21 |         }

❌ Error 7/7

      20 |         # ObjectTypeDefinition
    > 21 |         type User implements Address {
         |              ^^^^ Type "User" is unreachable
      22 |           city: String

💡 Suggestion: Remove User

     1 |         # ScalarTypeDefinition
     2 |         scalar DateTime
     3 |         # EnumTypeDefinition
     4 |         enum Role {
     5 |           ADMIN
     6 |           USER
     7 |         }
     8 |         # DirectiveDefinition
     9 |         directive @auth(role: [String!]!) on FIELD_DEFINITION
    10 |         # UnionTypeDefinition
    11 |         union Union = String | Boolean
    12 |         # InputObjectTypeDefinition
    13 |         input UsersFilter {
    14 |           limit: Int
    15 |         }
    16 |         # InterfaceTypeDefinition
    17 |         interface Address {
    18 |           city: String
    19 |         }
    20 |         # ObjectTypeDefinition
    21 |         
`;

exports[` 3`] = `
❌ Error

       1 |         interface User {
       2 |           id: String
       3 |         }
       4 |         type SuperUser implements User {
       5 |           id: String
       6 |           superDetail: SuperDetail
       7 |         }
       8 |         type SuperDetail {
       9 |           detail: String
      10 |         }
      11 |         type Query {
      12 |           user: User!
      13 |         }
    > 14 |         scalar DateTime
         |                ^^^^^^^^ Type "DateTime" is unreachable

💡 Suggestion: Remove DateTime

     1 |         interface User {
     2 |           id: String
     3 |         }
     4 |         type SuperUser implements User {
     5 |           id: String
     6 |           superDetail: SuperDetail
     7 |         }
     8 |         type SuperDetail {
     9 |           detail: String
    10 |         }
    11 |         type Query {
    12 |           user: User!
    13 |         }
    14 |         
`;

exports[` 4`] = `
Code

       1 |         interface User {
       2 |           id: String
       3 |         }
       4 |         interface AnotherUser {
       5 |           createdAt: String
       6 |         }
       7 |         type SuperUser implements User {
       8 |           id: String
       9 |         }
      10 |         # ObjectTypeExtension
      11 |         extend type SuperUser {
      12 |           detail: String
      13 |         }
      14 |         type Query {
      15 |           user: AnotherUser!
      16 |         }

❌ Error 1/3

    > 1 |         interface User {
        |                   ^^^^ Type "User" is unreachable
      2 |           id: String

💡 Suggestion: Remove User

     1 |         
     2 |         interface AnotherUser {
     3 |           createdAt: String
     4 |         }
     5 |         type SuperUser implements User {
     6 |           id: String
     7 |         }
     8 |         # ObjectTypeExtension
     9 |         extend type SuperUser {
    10 |           detail: String
    11 |         }
    12 |         type Query {
    13 |           user: AnotherUser!
    14 |         }

❌ Error 2/3

      6 |         }
    > 7 |         type SuperUser implements User {
        |              ^^^^^^^^^ Type "SuperUser" is unreachable
      8 |           id: String

💡 Suggestion: Remove SuperUser

     1 |         interface User {
     2 |           id: String
     3 |         }
     4 |         interface AnotherUser {
     5 |           createdAt: String
     6 |         }
     7 |         
     8 |         # ObjectTypeExtension
     9 |         extend type SuperUser {
    10 |           detail: String
    11 |         }
    12 |         type Query {
    13 |           user: AnotherUser!
    14 |         }

❌ Error 3/3

      10 |         # ObjectTypeExtension
    > 11 |         extend type SuperUser {
         |                     ^^^^^^^^^ Type "SuperUser" is unreachable
      12 |           detail: String

💡 Suggestion: Remove SuperUser

     1 |         interface User {
     2 |           id: String
     3 |         }
     4 |         interface AnotherUser {
     5 |           createdAt: String
     6 |         }
     7 |         type SuperUser implements User {
     8 |           id: String
     9 |         }
    10 |         # ObjectTypeExtension
    11 |         
    12 |         type Query {
    13 |           user: AnotherUser!
    14 |         }
`;

exports[` 5`] = `
❌ Error

       1 |         type Query {
       2 |           node(id: ID!): Node!
       3 |         }
       4 |         interface Node {
       5 |           id: ID!
       6 |         }
       7 |         interface User implements Node {
       8 |           id: ID!
       9 |           name: String
      10 |         }
      11 |         type SuperUser implements User & Node {
      12 |           id: ID!
      13 |           name: String
      14 |           address: String
      15 |         }
    > 16 |         scalar DateTime
         |                ^^^^^^^^ Type "DateTime" is unreachable

💡 Suggestion: Remove DateTime

     1 |         type Query {
     2 |           node(id: ID!): Node!
     3 |         }
     4 |         interface Node {
     5 |           id: ID!
     6 |         }
     7 |         interface User implements Node {
     8 |           id: ID!
     9 |           name: String
    10 |         }
    11 |         type SuperUser implements User & Node {
    12 |           id: ID!
    13 |           name: String
    14 |           address: String
    15 |         }
    16 |         
`;
