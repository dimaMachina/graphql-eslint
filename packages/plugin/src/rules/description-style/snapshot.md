// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`description-style > invalid > Invalid #1 1`] = `
#### ⌨️ Code

       1 |   enum EnumUserLanguagesSkill {
       2 |     """
       3 |     basic
       4 |     """
       5 |     basic
       6 |     """
       7 |     fluent
       8 |     """
       9 |     fluent
      10 |     """
      11 |     native
      12 |     """
      13 |     native
      14 |   }

#### ⚙️ Options

    {
      "style": "inline"
    }

#### ❌ Error 1/3

      1 |   enum EnumUserLanguagesSkill {
    > 2 |     """
        |     ^ Unexpected block description for enum value "basic" in enum "EnumUserLanguagesSkill"
      3 |     basic

#### 💡 Suggestion: Change to inline style description

     1 |   enum EnumUserLanguagesSkill {
     2 |     " basic "
     3 |     basic
     4 |     """
     5 |     fluent
     6 |     """
     7 |     fluent
     8 |     """
     9 |     native
    10 |     """
    11 |     native
    12 |   }

#### ❌ Error 2/3

      5 |     basic
    > 6 |     """
        |     ^ Unexpected block description for enum value "fluent" in enum "EnumUserLanguagesSkill"
      7 |     fluent

#### 💡 Suggestion: Change to inline style description

     1 |   enum EnumUserLanguagesSkill {
     2 |     """
     3 |     basic
     4 |     """
     5 |     basic
     6 |     " fluent "
     7 |     fluent
     8 |     """
     9 |     native
    10 |     """
    11 |     native
    12 |   }

#### ❌ Error 3/3

       9 |     fluent
    > 10 |     """
         |     ^ Unexpected block description for enum value "native" in enum "EnumUserLanguagesSkill"
      11 |     native

#### 💡 Suggestion: Change to inline style description

     1 |   enum EnumUserLanguagesSkill {
     2 |     """
     3 |     basic
     4 |     """
     5 |     basic
     6 |     """
     7 |     fluent
     8 |     """
     9 |     fluent
    10 |     " native "
    11 |     native
    12 |   }
`;

exports[`description-style > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |   " Test "
      2 |   type CreateOneUserPayload {
      3 |     "Created document ID"
      4 |     recordId: MongoID
      5 |
      6 |     "Created document"
      7 |     record: User
      8 |   }

#### ❌ Error 1/3

    > 1 |   " Test "
        |   ^^^^^^^^ Unexpected inline description for type "CreateOneUserPayload"
      2 |   type CreateOneUserPayload {

#### 💡 Suggestion: Change to block style description

    1 |   """ Test """
    2 |   type CreateOneUserPayload {
    3 |     "Created document ID"
    4 |     recordId: MongoID
    5 |
    6 |     "Created document"
    7 |     record: User
    8 |   }

#### ❌ Error 2/3

      2 |   type CreateOneUserPayload {
    > 3 |     "Created document ID"
        |     ^^^^^^^^^^^^^^^^^^^^^ Unexpected inline description for field "recordId" in type "CreateOneUserPayload"
      4 |     recordId: MongoID

#### 💡 Suggestion: Change to block style description

    1 |   " Test "
    2 |   type CreateOneUserPayload {
    3 |     """Created document ID"""
    4 |     recordId: MongoID
    5 |
    6 |     "Created document"
    7 |     record: User
    8 |   }

#### ❌ Error 3/3

      5 |
    > 6 |     "Created document"
        |     ^^^^^^^^^^^^^^^^^^ Unexpected inline description for field "record" in type "CreateOneUserPayload"
      7 |     record: User

#### 💡 Suggestion: Change to block style description

    1 |   " Test "
    2 |   type CreateOneUserPayload {
    3 |     "Created document ID"
    4 |     recordId: MongoID
    5 |
    6 |     """Created document"""
    7 |     record: User
    8 |   }
`;
