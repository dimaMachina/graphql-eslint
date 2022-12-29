import { Block, processor } from '../src/processor';

vi.mock('../src/graphql-config', () => ({
  loadOnDiskGraphQLConfig: vi.fn(() => ({
    getProjectForFile: () => ({
      extensions: {
        pluckConfig: {
          modules: [{ name: 'custom-gql-tag', identifier: 'custom' }],
          gqlMagicComment: 'CustoM',
        },
      },
    }),
  })),
}));

describe('processor.preprocess() with graphql-config', () => {
  const QUERY = 'query users { id }';
  it('should find "custom" tag', () => {
    const code = `
      import { custom } from 'custom-gql-tag'
      const fooQuery = custom\`${QUERY}\`
    `;
    const blocks = processor.preprocess(code, 'test.js') as Block[];

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchInlineSnapshot(`
      [
        {
          filename: document.graphql,
          lineOffset: 2,
          offset: 77,
          text: query users { id },
        },
        
            import { custom } from 'custom-gql-tag'
            const fooQuery = custom\`query users { id }\`
          ,
      ]
    `);
  });

  it('should find /* CustoM */ magic comment', () => {
    const code = `/*  CustoM  */ \`${QUERY}\``;
    const blocks = processor.preprocess(code, 'test.js') as Block[];

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchInlineSnapshot(`
      [
        {
          filename: document.graphql,
          lineOffset: 0,
          offset: 16,
          text: query users { id },
        },
        /*  CustoM  */ \`query users { id }\`,
      ]
    `);
  });
});
