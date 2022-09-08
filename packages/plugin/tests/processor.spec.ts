import { processor } from '../src/processor';

const QUERY = 'query foo { id }';

describe('Processor', () => {
  it('preprocess finds gql tag', () => {
    const code = `
      import { gql } from 'graphql'
      const fooQuery = gql\`${QUERY}\`
    `;
    const filePath = 'queries.ts';

    const blocks = processor.preprocess(code, filePath);
    expect(blocks).toMatchSnapshot();
    expect(blocks[0].text).toBe(QUERY);
  });

  it('preprocess finds custom tag', () => {
    const code = `
      import { customGqlTag } from 'custom-gql-tag'
      const fooQuery = customGqlTag\`
        query foo {
          id
        }
      \`
    `;
    const filePath = 'queries.ts';

    const blocks = processor.preprocess(code, filePath);
    expect(blocks).toMatchSnapshot();
    expect(blocks[0].text).toBe(QUERY);
  });
});
