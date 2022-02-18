// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

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

⚙️ Options

    {
      "style": "inline"
    }

❌ Error 1/3

      1 |   enum EnumUserLanguagesSkill {
    > 2 |     """
        |     ^ Unexpected block description
      3 |     basic

❌ Error 2/3

      5 |     basic
    > 6 |     """
        |     ^ Unexpected block description
      7 |     fluent

❌ Error 3/3

       9 |     fluent
    > 10 |     """
         |     ^ Unexpected block description
      11 |     native
`;

exports[` 2`] = `
Code

      1 |   " Test "
      2 |   type CreateOneUserPayload {
      3 |     "Created document ID"
      4 |     recordId: MongoID
      5 |     "Created document"
      6 |     record: User
      7 |   }

⚙️ Options

    {
      "style": "block"
    }

❌ Error 1/3

    > 1 |   " Test "
        |   ^^^^^^^^ Unexpected inline description
      2 |   type CreateOneUserPayload {

❌ Error 2/3

      2 |   type CreateOneUserPayload {
    > 3 |     "Created document ID"
        |     ^^^^^^^^^^^^^^^^^^^^^ Unexpected inline description
      4 |     recordId: MongoID

❌ Error 3/3

      4 |     recordId: MongoID
    > 5 |     "Created document"
        |     ^^^^^^^^^^^^^^^^^^ Unexpected inline description
      6 |     record: User
`;
