// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`Parser > parseForESLint() should return ast and tokens 1`] = `
{
  body: [
    {
      definitions: [
        {
          description: {
            block: true,
            kind: StringValue,
            leadingComments: [],
            loc: {
              end: {
                column: 51,
                line: 2,
              },
              source: 
      """
      generic query placeholder
      """
      type Query
    ,
              start: {
                column: 6,
                line: 2,
              },
            },
            range: [
              7,
              52,
            ],
            rawNode: [Function],
            type: StringValue,
            typeInfo: [Function],
            value: generic query placeholder,
          },
          directives: [],
          fields: [],
          interfaces: [],
          kind: ObjectTypeDefinition,
          leadingComments: [
            {
              type: Block,
              value: generic query placeholder,
            },
          ],
          loc: {
            end: {
              column: 11,
              line: 5,
            },
            source: 
      """
      generic query placeholder
      """
      type Query
    ,
            start: {
              column: 6,
              line: 2,
            },
          },
          name: {
            kind: Name,
            leadingComments: [],
            loc: {
              end: {
                column: 16,
                line: 5,
              },
              source: 
      """
      generic query placeholder
      """
      type Query
    ,
              start: {
                column: 11,
                line: 5,
              },
            },
            range: [
              64,
              69,
            ],
            rawNode: [Function],
            type: Name,
            typeInfo: [Function],
            value: Query,
          },
          range: [
            7,
            69,
          ],
          rawNode: [Function],
          type: ObjectTypeDefinition,
          typeInfo: [Function],
        },
      ],
      kind: Document,
      leadingComments: [],
      loc: {
        end: {
          column: 4,
          line: 6,
        },
        source: 
      """
      generic query placeholder
      """
      type Query
    ,
        start: {
          column: 0,
          line: 1,
        },
      },
      range: [
        0,
        74,
      ],
      rawNode: [Function],
      type: Document,
      typeInfo: [Function],
    },
  ],
  comments: [],
  loc: {
    end: {
      column: 4,
      line: 6,
    },
    source: 
      """
      generic query placeholder
      """
      type Query
    ,
    start: {
      column: 0,
      line: 1,
    },
  },
  range: [
    0,
    74,
  ],
  sourceType: script,
  tokens: [
    {
      loc: {
        end: {
          column: 51,
          line: 2,
        },
        start: {
          column: 6,
          line: 2,
        },
      },
      range: [
        7,
        52,
      ],
      type: BlockString,
      value: generic query placeholder,
    },
    {
      loc: {
        end: {
          column: 10,
          line: 5,
        },
        start: {
          column: 6,
          line: 5,
        },
      },
      range: [
        59,
        63,
      ],
      type: Name,
      value: type,
    },
    {
      loc: {
        end: {
          column: 16,
          line: 5,
        },
        start: {
          column: 11,
          line: 5,
        },
      },
      range: [
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
