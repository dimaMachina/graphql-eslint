// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`strict-id-in-types > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | type B { name: String! }

#### ❌ Error

    > 1 | type B { name: String! }
        |      ^ type "B" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: ID.
`;

exports[`strict-id-in-types > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | type B { id: ID! _id: String! }

#### ⚙️ Options

    {
      "acceptedIdNames": [
        "id",
        "_id"
      ],
      "acceptedIdTypes": [
        "ID",
        "String"
      ]
    }

#### ❌ Error

    > 1 | type B { id: ID! _id: String! }
        |      ^ type "B" must have exactly one non-nullable unique identifier.
    Accepted names: id or _id.
    Accepted types: ID or String.
`;

exports[`strict-id-in-types > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }

#### ⚙️ Options

    {
      "acceptedIdNames": [
        "id"
      ],
      "acceptedIdTypes": [
        "String"
      ]
    }

#### ❌ Error 1/4

    > 1 | type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }
        |                             ^^ type "B1" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: String.

#### ❌ Error 2/4

    > 1 | type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }
        |                                                      ^^ type "B2" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: String.

#### ❌ Error 3/4

    > 1 | type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }
        |                                                                                ^^ type "B3" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: String.

#### ❌ Error 4/4

    > 1 | type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }
        |                                                                                                          ^^ type "B4" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: String.
`;

exports[`strict-id-in-types > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 | type B { id: ID! } type Bresult { key: String! } type BPayload { bool: Boolean! } type BPagination { num: Int! }

#### ⚙️ Options

    {
      "acceptedIdNames": [
        "id"
      ],
      "acceptedIdTypes": [
        "ID"
      ],
      "exceptions": {
        "suffixes": [
          "Result",
          "Payload"
        ]
      }
    }

#### ❌ Error 1/2

    > 1 | type B { id: ID! } type Bresult { key: String! } type BPayload { bool: Boolean! } type BPagination { num: Int! }
        |                         ^^^^^^^ type "Bresult" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: ID.

#### ❌ Error 2/2

    > 1 | type B { id: ID! } type Bresult { key: String! } type BPayload { bool: Boolean! } type BPagination { num: Int! }
        |                                                                                        ^^^^^^^^^^^ type "BPagination" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: ID.
`;

exports[`strict-id-in-types > invalid > Invalid #5 1`] = `
#### ⌨️ Code

      1 | type B { id: ID! } type BError { message: String! }

#### ⚙️ Options

    {
      "acceptedIdNames": [
        "id"
      ],
      "acceptedIdTypes": [
        "ID"
      ],
      "exceptions": {
        "types": [
          "GeneralError"
        ]
      }
    }

#### ❌ Error

    > 1 | type B { id: ID! } type BError { message: String! }
        |                         ^^^^^^ type "BError" must have exactly one non-nullable unique identifier.
    Accepted name: id.
    Accepted type: ID.
`;
