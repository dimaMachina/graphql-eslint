import { parseForESLint } from '../src/parser';

describe('Parser', () => {
  it('parseForESLint() should return ast and tokens', () => {
    const code = /* GraphQL */ `
      """
      generic query placeholder
      """
      type Query
    `;

    const result = parseForESLint(code, { filePath: 'test.graphql' });
    expect(result.ast).toMatchSnapshot();
    expect(result.ast.tokens).toBeTruthy();
  });

  it('should throw on invalid code', () => {
    const code = 'Hello World!';

    expect(() => {
      parseForESLint(code);
    }).toThrow();
  });

  it('should correctly preserve "type" property (as "gqlType" field)', () => {
    const code = /* GraphQL */ `
      query GetUser($userId: ID!) {
        user(id: $userId) {
          id
        }
      }
    `;

    const result = parseForESLint(code, { filePath: 'test.graphql' });
    const field = (result.ast.body[0] as any).definitions[0].variableDefinitions[0];

    expect(field.type).toBe('VariableDefinition');
    expect(field.gqlType.type).toBe('NonNullType');
  });

  it('should provide type info when available', () => {
    const schema = /* GraphQL */ `
      type User {
        id: ID!
      }

      type Query {
        user(id: ID!): User!
      }
    `;
    const code = /* GraphQL */ `
      query user($id: ID!) {
        user(id: $id) {
          id
        }
      }
    `;

    const result = parseForESLint(code, { filePath: 'test.graphql', schema, skipGraphQLConfig: true });
    const selectionSet = (result.ast.body[0] as any).definitions[0].selectionSet;
    const typeInfo = selectionSet.typeInfo();
    expect(typeInfo).toBeDefined();
    expect(typeInfo.gqlType.name).toEqual('Query');
    expect(typeInfo.parentType.name).toEqual('Query');
  });
});
