// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Examples should work on \`.graphql\` files 1`] = `
Array [
  Object {
    filePath: examples/basic/fragment.graphql,
    messages: Array [
      Object {
        message: Fragment named "Test" already defined in:
	fragment2.graphql,
        ruleId: @graphql-eslint/unique-fragment-name,
      },
    ],
  },
  Object {
    filePath: examples/basic/fragment2.graphql,
    messages: Array [
      Object {
        message: Fragment named "Test" already defined in:
	fragment.graphql,
        ruleId: @graphql-eslint/unique-fragment-name,
      },
    ],
  },
  Object {
    filePath: examples/basic/query.graphql,
    messages: Array [
      Object {
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        ruleId: @graphql-eslint/no-anonymous-operations,
      },
    ],
  },
  Object {
    filePath: examples/basic/schema.graphql,
    messages: Array [
      Object {
        message: Description is required for \`Query.user\`.,
        ruleId: @graphql-eslint/require-description,
      },
      Object {
        message: Description is required for \`User.id\`.,
        ruleId: @graphql-eslint/require-description,
      },
      Object {
        message: Description is required for \`User.name\`.,
        ruleId: @graphql-eslint/require-description,
      },
    ],
  },
]
`;

exports[`Examples should work on \`.js\` files 1`] = `
Array [
  Object {
    filePath: examples/code-file/query.js,
    messages: Array [
      Object {
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        ruleId: @graphql-eslint/no-anonymous-operations,
      },
      Object {
        message: Operation "UserQuery" should not have "Query" suffix,
        ruleId: @graphql-eslint/naming-convention,
      },
    ],
  },
]
`;

exports[`Examples should work with \`eslint-plugin-prettier\` 1`] = `
Array [
  Object {
    filePath: examples/prettier/invalid.graphql,
    messages: Array [
      Object {
        message: Delete \`·····\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Delete \`,\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Delete \`,\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Delete \`,\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Delete \`·\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Delete \`,\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Delete \`,\`,
        ruleId: prettier/prettier,
      },
    ],
  },
  Object {
    filePath: examples/prettier/invalid.js,
    messages: Array [
      Object {
        message: Replace \`query·User($userId:······\` with \`⏎··query·User($userId:·\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Replace \`····id,\` with \`······id\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Replace \`····name,\` with \`······name\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Replace \`····isViewerFriend,\` with \`······isViewerFriend\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Replace \`····profilePicture(size:·50)·\` with \`······profilePicture(size:·50)\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Replace \`··uri,\` with \`····uri\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Replace \`··width,\` with \`····width\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`··\`,
        ruleId: prettier/prettier,
      },
      Object {
        message: Insert \`;\`,
        ruleId: prettier/prettier,
      },
    ],
  },
]
`;

exports[`Examples should work with \`graphql-config\` 1`] = `
Array [
  Object {
    filePath: examples/graphql-config/operations/query.graphql,
    messages: Array [
      Object {
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        ruleId: @graphql-eslint/no-anonymous-operations,
      },
    ],
  },
  Object {
    filePath: examples/graphql-config/operations/user.fragment.graphql,
    messages: Array [
      Object {
        message: Field \`name\` defined multiple times.,
        ruleId: @graphql-eslint/no-duplicate-fields,
      },
    ],
  },
]
`;

exports[`Examples should work with \`graphql-config\` on \`.js\` files 1`] = `
Array [
  Object {
    filePath: examples/graphql-config-code-file/query.js,
    messages: Array [
      Object {
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        ruleId: @graphql-eslint/no-anonymous-operations,
      },
      Object {
        message: Field \`id\` must be selected when it's available on a type.
Include it in your selection set.,
        ruleId: @graphql-eslint/require-id-when-available,
      },
    ],
  },
]
`;
