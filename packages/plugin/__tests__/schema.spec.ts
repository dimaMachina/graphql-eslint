import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { GraphQLSchema, printSchema } from 'graphql';
import { loadGraphQLConfig } from '../src/graphql-config';
import { getSchema } from '../src/schema';
import { CWD } from '../src/utils';

describe('schema', async () => {
  const SCHEMA_GRAPHQL_PATH = path.resolve(__dirname, 'mocks/user-schema.graphql');
  const SCHEMA_CODE_PATH = path.resolve(__dirname, 'mocks/user-schema.ts');
  const SCHEMA_JSON_PATH = path.resolve(__dirname, 'mocks/user-schema.json');
  const schemaOnDisk = await readFile(SCHEMA_GRAPHQL_PATH, 'utf8');

  const testSchema = (schema: string) => {
    const gqlConfig = loadGraphQLConfig({ graphQLConfig: { schema }, filePath: '' });
    const graphQLSchema = getSchema(gqlConfig.getDefault());
    expect(graphQLSchema).toBeInstanceOf(GraphQLSchema);

    const sdlString = printSchema(graphQLSchema as GraphQLSchema);

    expect(sdlString.trim()).toBe(schemaOnDisk.trim());
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

  describe('UrlLoader', () => {
    let local: ChildProcessWithoutNullStreams;
    let url: string;

    beforeAll(
      () =>
        new Promise(resolve => {
          const tsNodeCommand = path.resolve(CWD, '..', '..', 'node_modules', '.bin', 'tsx');
          const serverPath = path.resolve(__dirname, 'mocks/graphql-server.ts');

          // Import `TestGraphQLServer` and run it in this file will don't work
          // because `@graphql-tools/url-loader` under the hood uses `sync-fetch` package that uses
          // `child_process.execFileSync` that block Node.js event loop
          local = spawn(tsNodeCommand, [serverPath]);
          local.stdout.on('data', chunk => {
            url = chunk.toString().trimEnd();
            resolve();
          });
          local.stderr.on('data', chunk => {
            throw new Error(chunk.toString().trimEnd());
          });
        }),
    );

    afterAll(
      () =>
        new Promise(done => {
          local.on('close', () => done());
          local.kill();
        }),
    );

    it('should load schema from URL', () => {
      testSchema(url);
    });

    describe('should passe headers', () => {
      // https://graphql-config.com/schema#passing-headers
      // TODO!!
      it.skip('with `parserOptions.schema`', () => {
        const gqlConfig = loadGraphQLConfig({
          graphQLConfig: {
            schema: {
              [`${url}/my-headers`]: {
                headers: {
                  authorization: 'Bearer Foo',
                },
              },
            },
          },
          filePath: '',
        });
        expect(() => getSchema(gqlConfig.getDefault())).toThrow('authorization: "Bearer Foo"');
      });
    });
  });

  describe('schema loading', () => {
    it('should return Error', () => {
      const gqlConfig = loadGraphQLConfig({
        graphQLConfig: { schema: 'not-exist.gql' },
        filePath: '',
      });
      expect(() => getSchema(gqlConfig.getDefault())).toThrow(
        'Unable to find any GraphQL type definitions for the following pointers',
      );
    });
  });

  it('should load the graphql-config rc file relative to the linted file', () => {
    const gqlConfig = loadGraphQLConfig({
      graphQLConfig: {
        schema: path.resolve(__dirname, 'mocks/using-config/schema-in-config.graphql'),
      },
      filePath: path.resolve(__dirname, 'mocks/using-config/test.graphql'),
    });

    const graphQLSchema = getSchema(gqlConfig.getDefault()) as GraphQLSchema;
    expect(graphQLSchema).toBeInstanceOf(GraphQLSchema);
    const sdlString = printSchema(graphQLSchema);
    expect(sdlString.trimEnd()).toMatchInlineSnapshot(/* GraphQL */ `
      type Query {
        hello: String
      }
    `);
  });
});
