import { processor } from '../src/processor';

jest.mock('../src/graphql-config', () => ({
  loadGraphQLConfig: jest.fn(() => ({
    getDefault: () => ({
      extensions: {
        graphqlTagPluck: {
          modules: [
            {
              name: 'custom-gql-tag',
              identifier: 'custom',
            },
          ],
          globalGqlIdentifierName: ['custom', 'gql'],
        },
      },
    }),
  })),
}));

describe('processor with graphql-config', () => {
  const QUERY = 'query users { id }';
  const filePath = 'queries.ts';
  const code = `
    import { custom } from 'custom-gql-tag'
    const fooQuery = custom\`${QUERY}\`
  `;

  it('preprocess finds custom tag', () => {
    const blocks = processor.preprocess(code, filePath);

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchSnapshot();
  });
});
