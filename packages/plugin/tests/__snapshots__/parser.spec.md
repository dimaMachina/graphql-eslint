// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Parser parseForESLint() should return ast and tokens 1`] = `
Object {
  body: Array [
    Object {
      definitions: Array [
        Object {
          description: Object {
            block: true,
            kind: StringValue,
            leadingComments: Array [],
            loc: Object {
              end: Object {
                column: 51,
                line: 2,
              },
              source: 
      """
      generic query placeholder
      """
      type Query
    ,
              start: Object {
                column: 6,
                line: 2,
              },
            },
            range: Array [
              7,
              52,
            ],
            rawNode: [Function],
            type: StringValue,
            typeInfo: [Function],
            value: generic query placeholder,
          },
          directives: Array [],
          fields: Array [],
          interfaces: Array [],
          kind: ObjectTypeDefinition,
          leadingComments: Array [
            Object {
              type: Block,
              value: generic query placeholder,
            },
          ],
          loc: Object {
            end: Object {
              column: 11,
              line: 5,
            },
            source: 
      """
      generic query placeholder
      """
      type Query
    ,
            start: Object {
              column: 6,
              line: 2,
            },
          },
          name: Object {
            kind: Name,
            leadingComments: Array [],
            loc: Object {
              end: Object {
                column: 16,
                line: 5,
              },
              source: 
      """
      generic query placeholder
      """
      type Query
    ,
              start: Object {
                column: 11,
                line: 5,
              },
            },
            range: Array [
              64,
              69,
            ],
            rawNode: [Function],
            type: Name,
            typeInfo: [Function],
            value: Query,
          },
          range: Array [
            7,
            69,
          ],
          rawNode: [Function],
          type: ObjectTypeDefinition,
          typeInfo: [Function],
        },
      ],
      kind: Document,
      leadingComments: Array [],
      loc: Object {
        end: Object {
          column: 4,
          line: 6,
        },
        source: 
      """
      generic query placeholder
      """
      type Query
    ,
        start: Object {
          column: 0,
          line: 1,
        },
      },
      range: Array [
        0,
        74,
      ],
      rawNode: [Function],
      type: Document,
      typeInfo: [Function],
    },
  ],
  comments: Array [],
  loc: Object {
    end: Object {
      column: 4,
      line: 6,
    },
    source: 
      """
      generic query placeholder
      """
      type Query
    ,
    start: Object {
      column: 0,
      line: 1,
    },
  },
  range: Array [
    0,
    74,
  ],
  sourceType: script,
  tokens: Array [
    Object {
      loc: Object {
        end: Object {
          column: 51,
          line: 2,
        },
        start: Object {
          column: 6,
          line: 2,
        },
      },
      range: Array [
        7,
        52,
      ],
      type: BlockString,
      value: generic query placeholder,
    },
    Object {
      loc: Object {
        end: Object {
          column: 10,
          line: 5,
        },
        start: Object {
          column: 6,
          line: 5,
        },
      },
      range: Array [
        59,
        63,
      ],
      type: Name,
      value: type,
    },
    Object {
      loc: Object {
        end: Object {
          column: 16,
          line: 5,
        },
        start: Object {
          column: 11,
          line: 5,
        },
      },
      range: Array [
        64,
        69,
      ],
      type: Name,
      value: Query,
    },
  ],
  type: Program,
}
`;
