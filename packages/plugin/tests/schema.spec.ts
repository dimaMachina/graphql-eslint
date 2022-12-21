import { resolve } from 'path';
import { readFileSync } from 'fs';
import { spawn } from 'child_process';
import { GraphQLSchema, printSchema } from 'graphql';
import { getSchema } from '../src/schema';
import { loadGraphQLConfig } from '../src/graphql-config';

describe('schema', () => {
  const SCHEMA_GRAPHQL_PATH = resolve(__dirname, 'mocks/user-schema.graphql');
  const SCHEMA_CODE_PATH = resolve(__dirname, 'mocks/user-schema.ts');
  const SCHEMA_JSON_PATH = resolve(__dirname, 'mocks/user-schema.json');
  const schemaOnDisk = readFileSync(SCHEMA_GRAPHQL_PATH, 'utf8');

  const testSchema = (schema: string) => {
    const gqlConfig = loadGraphQLConfig({ schema, filePath: '' });
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
    let local;
    let url;

    beforeAll(() => new Promise(done => {
      const tsNodeCommand = resolve(process.cwd(), 'node_modules/.bin/tsx');
      const serverPath = resolve(__dirname, 'mocks/graphql-server.ts');

      // Import `TestGraphQLServer` and run it in this file will don't work
      // because `@graphql-tools/url-loader` under the hood uses `sync-fetch` package that uses
      // `child_process.execFileSync` that block Node.js event loop
      local = spawn(tsNodeCommand, [serverPath]);
      local.stdout.on('data', chunk => {
        url = chunk.toString().trimRight();
        done();
      });
      local.stderr.on('data', chunk => {
        throw new Error(chunk.toString().trimRight());
      });
    }));

    afterAll(() => new Promise(done => {
      local.on('close', () => done());
      local.kill();
    }));

    it('should load schema from URL', () => {
      testSchema(url);
    });

    describe('should passe headers', () => {
      let schemaUrl;
      let schemaOptions;

      beforeAll(() => {
        schemaUrl = `${url}/my-headers`;
        schemaOptions = {
          headers: {
            authorization: 'Bearer Foo',
          },
        };
      });

      // https://graphql-config.com/schema#passing-headers
      it('with `parserOptions.schema`', () => {
        const gqlConfig = loadGraphQLConfig({
          schema: {
            [schemaUrl]: schemaOptions,
          },
          filePath: '',
        });
        const error = getSchema(gqlConfig.getDefault()) as Error;
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('authorization: "Bearer Foo"');
      });

      // https://github.com/B2o5T/graphql-eslint/blob/master/docs/parser-options.md#schemaoptions
      it('with `parserOptions.schemaOptions`', () => {
        const gqlConfig = loadGraphQLConfig({ schema: schemaUrl, filePath: '' });
        const error = getSchema(gqlConfig.getDefault(), schemaOptions) as Error;
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('authorization: "Bearer Foo"');
      });
    });
  });

  describe('schema loading', () => {
    it('should return Error', () => {
      const gqlConfig = loadGraphQLConfig({ schema: 'not-exist.gql', filePath: '' });
      const error = getSchema(gqlConfig.getDefault()) as Error;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toMatch(
        'Unable to find any GraphQL type definitions for the following pointers',
      );
    });
  });

  it('should load the graphql-config rc file relative to the linted file', () => {
    const gqlConfig = loadGraphQLConfig({
      schema: resolve(__dirname, 'mocks/using-config/schema.graphql'),
      filePath: resolve(__dirname, 'mocks/using-config/test.graphql'),
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
