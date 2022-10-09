import { Block, processor } from '../src/processor';

describe('processor.preprocess() without graphql-config', () => {
  const QUERY = 'query users { id }';
  it('should find "gql" tag', () => {
    const code = `
      import { gql } from 'graphql'
      const fooQuery = gql\`${QUERY}\`
    `;
    const blocks = processor.preprocess(code, 'test.js') as Block[];

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchInlineSnapshot(`
      [
        {
          filename: document.graphql,
          lineOffset: 2,
          offset: 64,
          text: query users { id },
        },
        
            import { gql } from 'graphql'
            const fooQuery = gql\`query users { id }\`
          ,
      ]
    `);
  });

  it('should find /* GraphQL */ magic comment', () => {
    const code = `/*  GraphQL  */ \`${QUERY}\``;
    const blocks = processor.preprocess(code, 'test.js') as Block[];

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchInlineSnapshot(`
      [
        {
          filename: document.graphql,
          lineOffset: 0,
          offset: 17,
          text: query users { id },
        },
        /*  GraphQL  */ \`query users { id }\`,
      ]
    `);
  });
});
