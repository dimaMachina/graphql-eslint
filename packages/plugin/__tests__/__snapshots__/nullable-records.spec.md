// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`nullable-records > invalid > should disallow non-nullability on Node interface 1`] = `
#### ⌨️ Code

      1 |         interface Node {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmap: Node!
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmap: Node!
        |           ^^^^^^^^^^^^^ Type \`Node\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         interface Node {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmap: Node
      6 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on a union of types where at least one type has ID 1`] = `
#### ⌨️ Code

       1 |         type Config {
       2 |           name: String!
       3 |         }
       4 |         type Roadmap {
       5 |           id: ID!
       6 |         }
       7 |         union ConfigOrRoadmap = Config | Roadmap
       8 |         type Query {
       9 |           config: ConfigOrRoadmap!
      10 |         }

#### ❌ Error

       8 |         type Query {
    >  9 |           config: ConfigOrRoadmap!
         |           ^^^^^^^^^^^^^^^^^^^^^^^ Union type \`ConfigOrRoadmap\` has to be nullable, because types \`Roadmap\` have \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      10 |         }

#### 🔧 Autofix output

       1 |         type Config {
       2 |           name: String!
       3 |         }
       4 |         type Roadmap {
       5 |           id: ID!
       6 |         }
       7 |         union ConfigOrRoadmap = Config | Roadmap
       8 |         type Query {
       9 |           config: ConfigOrRoadmap
      10 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on list of unions of types where at least one type has ID 1`] = `
#### ⌨️ Code

       1 |         type Config {
       2 |           name: String!
       3 |         }
       4 |         type Roadmap {
       5 |           id: ID!
       6 |         }
       7 |         union ConfigOrRoadmap = Config | Roadmap
       8 |         type Query {
       9 |           configs: [ConfigOrRoadmap!]!
      10 |         }

#### ❌ Error

       8 |         type Query {
    >  9 |           configs: [ConfigOrRoadmap!]!
         |                    ^^^^^^^^^^^^^^^^^ Union type \`ConfigOrRoadmap\` has to be nullable, because types \`Roadmap\` have \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      10 |         }

#### 🔧 Autofix output

       1 |         type Config {
       2 |           name: String!
       3 |         }
       4 |         type Roadmap {
       5 |           id: ID!
       6 |         }
       7 |         union ConfigOrRoadmap = Config | Roadmap
       8 |         type Query {
       9 |           configs: [ConfigOrRoadmap]!
      10 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on non-nullable list of Node interfaces 1`] = `
#### ⌨️ Code

      1 |         interface Node {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [Node!]!
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmaps: [Node!]!
        |                     ^^^^^^ Type \`Node\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         interface Node {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [Node]!
      6 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on type that has ID 1`] = `
#### ⌨️ Code

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmap: Roadmap!
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmap: Roadmap!
        |           ^^^^^^^^^^^^^^^^ Type \`Roadmap\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmap: Roadmap
      6 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on type that references type with ID 1`] = `
#### ⌨️ Code

       1 |         type Feature {
       2 |           id: ID!
       3 |         }
       4 |         type Roadmap {
       5 |           id: ID!
       6 |           feature: Feature!
       7 |         }
       8 |         type Query {
       9 |           roadmap: Roadmap!
      10 |         }

#### ❌ Error 1/2

      5 |           id: ID!
    > 6 |           feature: Feature!
        |           ^^^^^^^^^^^^^^^^ Type \`Feature\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      7 |         }

#### ❌ Error 2/2

       8 |         type Query {
    >  9 |           roadmap: Roadmap!
         |           ^^^^^^^^^^^^^^^^ Type \`Roadmap\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      10 |         }

#### 🔧 Autofix output

       1 |         type Feature {
       2 |           id: ID!
       3 |         }
       4 |         type Roadmap {
       5 |           id: ID!
       6 |           feature: Feature
       7 |         }
       8 |         type Query {
       9 |           roadmap: Roadmap
      10 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on type with ID 1`] = `
#### ⌨️ Code

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmap: Roadmap!
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmap: Roadmap!
        |           ^^^^^^^^^^^^^^^^ Type \`Roadmap\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmap: Roadmap
      6 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on type with ID in a list and the list itself 1`] = `
#### ⌨️ Code

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [Roadmap!]!
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmaps: [Roadmap!]!
        |                     ^^^^^^^^^ Type \`Roadmap\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [Roadmap]!
      6 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on type with ID in a nullable list 1`] = `
#### ⌨️ Code

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [Roadmap!]
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmaps: [Roadmap!]
        |                     ^^^^^^^^^ Type \`Roadmap\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [Roadmap]
      6 |         }
`;

exports[`nullable-records > invalid > should disallow non-nullability on type with ID in nested non-nullable lists 1`] = `
#### ⌨️ Code

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [[Roadmap!]!]!
      6 |         }

#### ❌ Error

      4 |         type Query {
    > 5 |           roadmaps: [[Roadmap!]!]!
        |                      ^^^^^^^^^ Type \`Roadmap\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      6 |         }

#### 🔧 Autofix output

      1 |         type Roadmap {
      2 |           id: ID!
      3 |         }
      4 |         type Query {
      5 |           roadmaps: [[Roadmap]!]!
      6 |         }
`;

exports[`nullable-records > invalid > should disallow nullability on Node interface field 1`] = `
#### ⌨️ Code

       1 |         interface Node {
       2 |           id: ID!
       3 |         }
       4 |         type Column implements Node {
       5 |           id: ID!
       6 |         }
       7 |         type Roadmap implements Node {
       8 |           id: ID!
       9 |           columns: [Column!]!
      10 |         }
      11 |         type Query {
      12 |           node(id: ID!): Node
      13 |         }

#### ❌ Error

       8 |           id: ID!
    >  9 |           columns: [Column!]!
         |                    ^^^^^^^^ Type \`Column\` has to be nullable, because it has \`id\` field and can be deleted in the client runtime. https://the-guild.dev/graphql/eslint/rules/nullable-records
      10 |         }

#### 🔧 Autofix output

       1 |         interface Node {
       2 |           id: ID!
       3 |         }
       4 |         type Column implements Node {
       5 |           id: ID!
       6 |         }
       7 |         type Roadmap implements Node {
       8 |           id: ID!
       9 |           columns: [Column]!
      10 |         }
      11 |         type Query {
      12 |           node(id: ID!): Node
      13 |         }
`;
