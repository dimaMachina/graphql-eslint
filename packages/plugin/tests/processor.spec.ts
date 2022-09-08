import { processor } from '../src/processor';

jest.mock('graphql-config', () => ({
  loadConfigSync: () => ({
    getDefault: () => ({
      documents: '*.{ts, js}',
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
    }),
  }),
}));

describe('processor', () => {
  const QUERY = 'query users { id }';

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

  it('preprocess finds custom gql tag', () => {
    const code = `
      import { customGqlTag } from 'custom-gql-tag'
      const fooQuery = customGqlTag\`${QUERY}\`
    `;
    const filePath = 'queries.ts';

    const blocks = processor.preprocess(code, filePath);

    expect(blocks).toMatchSnapshot();
    expect(blocks[0].text).toBe(QUERY);
  });
});
