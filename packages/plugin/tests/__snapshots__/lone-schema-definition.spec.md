// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

       1 |         type Query {
       2 |           foo: String
       3 |         }
       4 |         type Mutation {
       5 |           bar: Boolean
       6 |         }
       7 |         schema {
       8 |           query: Query
       9 |           mutation: Mutation
      10 |         }
      11 |         type RootQuery {
      12 |           foo: String
      13 |         }
      14 |         type RootMutation {
      15 |           bar: Boolean
      16 |         }
    > 17 |         schema {
         |         ^^^^^^ Must provide only one schema definition.
      18 |           query: RootQuery
      19 |           mutation: RootMutation
      20 |         }
`;
