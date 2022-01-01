/* eslint-disable no-console */
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { spawn } from 'child_process';
import { GraphQLSchema, printSchema } from 'graphql';
import { getSchema } from '../src/schema';
import { loadGraphQLConfig } from '../src/graphql-config';

const noopFn = () => null;

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

    describe('should passe headers', () => {
      let schemaUrl;
      let schemaOptions;
      let consoleError;
      const originalConsoleError = console.error;

      beforeAll(() => {
        schemaUrl = `${url}/my-headers`;
        schemaOptions = {
          headers: {
            authorization: 'Bearer Foo',
          },
        };
        // Hide console.error in test
        console.error = noopFn;
      });

      beforeEach(() => {
        consoleError = jest.spyOn(console, 'error');
      });

      afterEach(() => {
        consoleError.mockRestore();
      });

      afterAll(() => {
        console.error = originalConsoleError;
      });

      // https://graphql-config.com/schema#passing-headers
      it('with `parserOptions.schema`', () => {
        const gqlConfig = loadGraphQLConfig({
          schema: {
            [schemaUrl]: schemaOptions,
          },
        });
        getSchema(undefined, gqlConfig);

        expect(consoleError).toHaveBeenCalledTimes(1);
        expect(consoleError.mock.calls[0][2]).toMatch('"authorization":"Bearer Foo"');
      });

      // https://github.com/dotansimha/graphql-eslint/blob/master/docs/parser-options.md#schemaoptions
      it('with `parserOptions.schemaOptions`', () => {
        const gqlConfig = loadGraphQLConfig({ schema: schemaUrl });
        getSchema({ schemaOptions }, gqlConfig);

        expect(consoleError).toHaveBeenCalledTimes(1);
        expect(consoleError.mock.calls[0][2]).toMatch('"authorization":"Bearer Foo"');
      });
    });
  });

  describe('schema loading', () => {
    const originalConsoleError = console.error;
    const gqlConfig = loadGraphQLConfig({ schema: 'not-exist.gql' });
    let consoleError;

    beforeAll(() => {
      // Hide console.error in test
      console.error = noopFn;
      consoleError = jest.spyOn(console, 'error');
    });

    afterAll(() => {
      console.error = originalConsoleError;
      consoleError.mockRestore();
    });

    it('should not throw an error, but log an error in `console.error`', () => {
      expect(consoleError).toHaveBeenCalledTimes(0);
      expect(getSchema(undefined, gqlConfig)).toBe(null);
      expect(consoleError.mock.calls[0][2]).toMatch(
        'Unable to find any GraphQL type definitions for the following pointers'
      );
    })

    it('should not log second time error from same schema', () => {
      expect(getSchema(undefined, gqlConfig)).toBe(null);
      expect(consoleError).toHaveBeenCalledTimes(1);
    })
  });
});
