import { processor } from '../src/processor';

jest.mock('../src/graphql-config');

describe('processor without graphql-config', () => {
  const QUERY = 'query users { id }';
  const filePath = 'queries.ts';
  const code = `
    import { gql } from 'graphql'
    const fooQuery = gql\`${QUERY}\`
  `;

  it('preprocess finds gql tag', () => {
    const blocks = processor.preprocess(code, filePath);

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchSnapshot();
  });
});
