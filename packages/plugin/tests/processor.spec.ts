import { processor } from '../src/processor';

jest.mock('graphql-config', () => ({
  loadConfigSync: jest.fn(() => ({
    getDefault: jest.fn(() => ({
      extensions: {
        graphqlTagPluck: {
          modules: [
            {
              name: 'custom-gql-tag',
              identifier: 'customGqlTag',
            },
          ],
          globalGqlIdentifierName: 'customGqlTag',
        },
      },
    })),
  })),
}));

describe('processor', () => {
  const QUERY = 'query users { id }';
  const filePath = 'queries.ts';

  it('preprocess finds gql tag', () => {
    const code = `
      import { gql } from 'graphql'
      const fooQuery = gql\`${QUERY}\`
    `;

    const blocks = processor.preprocess(code, filePath);

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchSnapshot();
  });

  it('preprocess finds custom gql tag', () => {
    const code = `
      import { customGqlTag } from 'custom-gql-tag'
      const fooQuery = customGqlTag\`${QUERY}\`
    `;

    const blocks = processor.preprocess(code, filePath);

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchSnapshot();
  });
});
