import { resolve } from 'path';
import { readFileSync } from 'fs';
import { GraphQLSchema, printSchema } from 'graphql';
import { getSchema } from '../src/schema';
import { loadGraphqlConfig } from '../src/graphql-config';

describe('schema', () => {
  const SCHEMA_GRAPHQL_PATH = resolve(__dirname, 'mocks/user-schema.graphql');
  const SCHEMA_CODE_PATH = resolve(__dirname, 'mocks/user-schema.ts');
  const SCHEMA_JSON_PATH = resolve(__dirname, 'mocks/user-schema.json');
  const schemaOnDisk = readFileSync(SCHEMA_GRAPHQL_PATH, 'utf8');

  const testSchema = (schema: string) => {
    const gqlConfig = loadGraphqlConfig({ schema });
    const graphQLSchema = getSchema({ schema }, gqlConfig);
    expect(graphQLSchema).toBeInstanceOf(GraphQLSchema);

    const sdlString = printSchema(graphQLSchema);
    expect(sdlString).toBe(schemaOnDisk);
  };

  describe('GraphQLFileLoader', () => {
    it('should load schema from GraphQL file', () => {
      testSchema(SCHEMA_GRAPHQL_PATH);
    });
  });

  describe('CodeFileLoader', () => {
    it('should load schema from code file', () => {
      testSchema(SCHEMA_CODE_PATH);
    });
  });

  describe('JsonFileLoader', () => {
    it('should load schema from JSON file', () => {
      testSchema(SCHEMA_JSON_PATH);
    });
  });

  // TODO: make works when url-loader will be updated to v7
  // describe('UrlLoader', () => {
  //   it('should load schema from URL', () => {
  //     testSchema(url);
  //   });
  // });
});
