import { loadConfigSync } from 'graphql-config';
import { processor } from '../src/processor';

jest.mock('graphql-config', () => ({
  loadConfigSync: jest.fn(),
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

  it('preprocess finds custom tag', () => {
    loadConfigSync.mockImplementation(() => ({
      getDefault: () => ({
        extensions: {
          graphqlTagPluck: {
            modules: [
              {
                name: 'custom-gql-tag',
                identifier: 'custom',
              },
            ],
            globalGqlIdentifierName: ['custom'],
          },
        },
      }),
    }));
    jest.resetModules();

    const code = `
      import { custom } from 'custom-gql-tag'
      const fooQuery = custom\`${QUERY}\`
    `;

    const blocks = processor.preprocess(code, filePath);

    expect(blocks[0].text).toBe(QUERY);
    expect(blocks).toMatchSnapshot();
  });
});
