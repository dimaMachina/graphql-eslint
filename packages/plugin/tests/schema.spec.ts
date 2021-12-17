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
    const gqlConfig = loadGraphQLConfig({ schema });
    const graphQLSchema = getSchema({ schema }, gqlConfig);
    expect(graphQLSchema).toBeInstanceOf(GraphQLSchema);

    const sdlString = printSchema(graphQLSchema);
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

    beforeAll(done => {
      const tsNodeCommand = resolve(process.cwd(), 'node_modules/.bin/ts-node');
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
    });

    afterAll(done => {
      local.on('close', done);
      local.kill();
    });

    it('should load schema from URL', () => {
      testSchema(url);
    });

    it('should passe headers', () => {
      expect.assertions(2);
      const schemaUrl = `${url}/my-headers`;
      const schemaOptions = {
        headers: {
          Authorization: 'Bearer Foo',
        },
      };

      try {
        // https://graphql-config.com/schema#passing-headers
        const gqlConfig = loadGraphQLConfig({
          schema: {
            [schemaUrl]: schemaOptions,
          },
        });
        getSchema(undefined, gqlConfig);
      } catch (e) {
        expect(e.message).toMatch('"authorization":"Bearer Foo"');
      }

      try {
        // https://github.com/dotansimha/graphql-eslint/blob/master/docs/parser-options.md#schemaoptions
        const gqlConfig = loadGraphQLConfig({ schema: schemaUrl });
        getSchema({ schemaOptions }, gqlConfig);
      } catch (e) {
        expect(e.message).toMatch('"authorization":"Bearer Foo"');
      }
    });
  });
});
