// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Examples should work on \`.graphql\` files 1`] = `
Array [
  Object {
    filePath: examples/basic/fragment.graphql,
    messages: Array [
      Object {
        column: 10,
        endColumn: 14,
        endLine: 1,
        line: 1,
        message: Fragment named "Test" already defined in:
	fragment2.graphql,
        messageId: unique-fragment-name,
        nodeType: Name,
        ruleId: @graphql-eslint/unique-fragment-name,
        severity: 2,
      },
    ],
  },
  Object {
    filePath: examples/basic/fragment2.graphql,
    messages: Array [
      Object {
        column: 10,
        endColumn: 14,
        endLine: 1,
        line: 1,
        message: Fragment named "Test" already defined in:
	fragment.graphql,
        messageId: unique-fragment-name,
        nodeType: Name,
        ruleId: @graphql-eslint/unique-fragment-name,
        severity: 2,
      },
    ],
  },
  Object {
    filePath: examples/basic/query.graphql,
    messages: Array [
      Object {
        column: 1,
        endColumn: 6,
        endLine: 1,
        line: 1,
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        messageId: no-anonymous-operations,
        nodeType: null,
        ruleId: @graphql-eslint/no-anonymous-operations,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Rename to \`user\`,
            fix: Object {
              range: Array [
                5,
                5,
              ],
              text:  user,
            },
          },
        ],
      },
    ],
  },
  Object {
    filePath: examples/basic/schema.graphql,
    messages: Array [
      Object {
        column: 3,
        endColumn: 7,
        endLine: 2,
        line: 2,
        message: Description is required for \`Query.user\`.,
        messageId: require-description,
        nodeType: null,
        ruleId: @graphql-eslint/require-description,
        severity: 2,
      },
      Object {
        column: 3,
        endColumn: 5,
        endLine: 6,
        line: 6,
        message: Description is required for \`User.id\`.,
        messageId: require-description,
        nodeType: null,
        ruleId: @graphql-eslint/require-description,
        severity: 2,
      },
      Object {
        column: 3,
        endColumn: 7,
        endLine: 7,
        line: 7,
        message: Description is required for \`User.name\`.,
        messageId: require-description,
        nodeType: null,
        ruleId: @graphql-eslint/require-description,
        severity: 2,
      },
    ],
  },
]
`;

exports[`Examples should work on \`.js\` files 1`] = `
Array [
  Object {
    filePath: examples/code-file/not-query.js,
    messages: Array [
      Object {
        column: 1,
        endColumn: 12,
        endLine: 1,
        line: 1,
        message: Unexpected console statement.,
        messageId: unexpected,
        nodeType: MemberExpression,
        ruleId: no-console,
        severity: 2,
      },
    ],
  },
  Object {
    filePath: examples/code-file/query.js,
    messages: Array [
      Object {
        column: 3,
        endColumn: 8,
        endLine: 12,
        line: 12,
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        messageId: no-anonymous-operations,
        nodeType: null,
        ruleId: @graphql-eslint/no-anonymous-operations,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Rename to \`user\`,
            fix: Object {
              range: Array [
                164,
                164,
              ],
              text:  user,
            },
          },
        ],
      },
      Object {
        column: 9,
        endColumn: 18,
        endLine: 2,
        line: 2,
        message: Operation "UserQuery" should not have "Query" suffix,
        nodeType: Name,
        ruleId: @graphql-eslint/naming-convention,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Rename to \`User\`,
            fix: Object {
              range: Array [
                9,
                18,
              ],
              text: User,
            },
          },
        ],
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
        column: 21,
        endColumn: 26,
        endLine: 1,
        fix: Object {
          range: Array [
            20,
            25,
          ],
          text: ,
        },
        line: 1,
        message: Delete \`·····\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 7,
        endColumn: 8,
        endLine: 3,
        fix: Object {
          range: Array [
            60,
            61,
          ],
          text: ,
        },
        line: 3,
        message: Delete \`,\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 9,
        endColumn: 10,
        endLine: 4,
        fix: Object {
          range: Array [
            70,
            71,
          ],
          text: ,
        },
        line: 4,
        message: Delete \`,\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 19,
        endColumn: 20,
        endLine: 5,
        fix: Object {
          range: Array [
            90,
            91,
          ],
          text: ,
        },
        line: 5,
        message: Delete \`,\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 29,
        endColumn: 30,
        endLine: 6,
        fix: Object {
          range: Array [
            120,
            121,
          ],
          text: ,
        },
        line: 6,
        message: Delete \`·\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 6,
        endColumn: 7,
        endLine: 13,
        fix: Object {
          range: Array [
            201,
            202,
          ],
          text: ,
        },
        line: 13,
        message: Delete \`,\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 8,
        endColumn: 9,
        endLine: 14,
        fix: Object {
          range: Array [
            210,
            211,
          ],
          text: ,
        },
        line: 14,
        message: Delete \`,\`,
        messageId: delete,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
    ],
  },
  Object {
    filePath: examples/prettier/invalid.js,
    messages: Array [
      Object {
        column: 33,
        endColumn: 58,
        endLine: 3,
        fix: Object {
          range: Array [
            150,
            175,
          ],
          text: 
  query User($userId: ,
        },
        line: 3,
        message: Replace \`query·User($userId:······\` with \`⏎··query·User($userId:·\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 1,
        endLine: 4,
        fix: Object {
          range: Array [
            182,
            182,
          ],
          text:   ,
        },
        line: 4,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 8,
        endLine: 5,
        fix: Object {
          range: Array [
            204,
            211,
          ],
          text:       id,
        },
        line: 5,
        message: Replace \`····id,\` with \`······id\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 10,
        endLine: 6,
        fix: Object {
          range: Array [
            212,
            221,
          ],
          text:       name,
        },
        line: 6,
        message: Replace \`····name,\` with \`······name\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 20,
        endLine: 7,
        fix: Object {
          range: Array [
            222,
            241,
          ],
          text:       isViewerFriend,
        },
        line: 7,
        message: Replace \`····isViewerFriend,\` with \`······isViewerFriend\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 30,
        endLine: 8,
        fix: Object {
          range: Array [
            242,
            271,
          ],
          text:       profilePicture(size: 50),
        },
        line: 8,
        message: Replace \`····profilePicture(size:·50)·\` with \`······profilePicture(size:·50)\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 7,
        endColumn: 7,
        endLine: 9,
        fix: Object {
          range: Array [
            280,
            280,
          ],
          text:   ,
        },
        line: 9,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 5,
        endColumn: 5,
        endLine: 10,
        fix: Object {
          range: Array [
            301,
            301,
          ],
          text:   ,
        },
        line: 10,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 1,
        endLine: 11,
        fix: Object {
          range: Array [
            303,
            303,
          ],
          text:   ,
        },
        line: 11,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 1,
        endLine: 12,
        fix: Object {
          range: Array [
            307,
            307,
          ],
          text:   ,
        },
        line: 12,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 1,
        endLine: 14,
        fix: Object {
          range: Array [
            310,
            310,
          ],
          text:   ,
        },
        line: 14,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 7,
        endLine: 15,
        fix: Object {
          range: Array [
            346,
            352,
          ],
          text:     uri,
        },
        line: 15,
        message: Replace \`··uri,\` with \`····uri\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 9,
        endLine: 16,
        fix: Object {
          range: Array [
            353,
            361,
          ],
          text:     width,
        },
        line: 16,
        message: Replace \`··width,\` with \`····width\`,
        messageId: replace,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 3,
        endColumn: 3,
        endLine: 17,
        fix: Object {
          range: Array [
            364,
            364,
          ],
          text:   ,
        },
        line: 17,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 1,
        endColumn: 1,
        endLine: 18,
        fix: Object {
          range: Array [
            371,
            371,
          ],
          text:   ,
        },
        line: 18,
        message: Insert \`··\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
      },
      Object {
        column: 2,
        endColumn: 2,
        endLine: 19,
        fix: Object {
          range: Array [
            374,
            374,
          ],
          text: ;,
        },
        line: 19,
        message: Insert \`;\`,
        messageId: insert,
        nodeType: null,
        ruleId: prettier/prettier,
        severity: 2,
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
        column: 1,
        endColumn: 6,
        endLine: 1,
        line: 1,
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        messageId: no-anonymous-operations,
        nodeType: null,
        ruleId: @graphql-eslint/no-anonymous-operations,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Rename to \`user\`,
            fix: Object {
              range: Array [
                5,
                5,
              ],
              text:  user,
            },
          },
        ],
      },
    ],
  },
  Object {
    filePath: examples/graphql-config/operations/user.fragment.graphql,
    messages: Array [
      Object {
        column: 3,
        endColumn: 7,
        endLine: 4,
        line: 4,
        message: Field \`name\` defined multiple times.,
        messageId: no-duplicate-fields,
        nodeType: Name,
        ruleId: @graphql-eslint/no-duplicate-fields,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Remove \`name\` field,
            fix: Object {
              range: Array [
                44,
                48,
              ],
              text: ,
            },
          },
        ],
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
        column: 3,
        endColumn: 8,
        endLine: 2,
        line: 2,
        message: Anonymous GraphQL operations are forbidden. Make sure to name your query!,
        messageId: no-anonymous-operations,
        nodeType: null,
        ruleId: @graphql-eslint/no-anonymous-operations,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Rename to \`user\`,
            fix: Object {
              range: Array [
                8,
                8,
              ],
              text:  user,
            },
          },
        ],
      },
      Object {
        column: 10,
        line: 3,
        message: Field \`user.id\` must be selected when it's available on a type.
Include it in your selection set.,
        messageId: require-id-when-available,
        nodeType: null,
        ruleId: @graphql-eslint/require-id-when-available,
        severity: 2,
        suggestions: Array [
          Object {
            desc: Add \`id\` selection,
            fix: Object {
              range: Array [
                28,
                28,
              ],
              text: id ,
            },
          },
        ],
      },
    ],
  },
]
`;
