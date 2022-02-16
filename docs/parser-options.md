## Parser Options

### `graphQLParserOptions`

With this configuration, you can specify custom configurations for GraphQL's `parse` method. By default, `graphql-eslint` parser just adds `noLocation: false` to make sure all parsed AST has `location` set, since we need this for tokenizing and for converting the GraphQL AST into ESTree.

You can find the [complete set of options for this object here](https://github.com/graphql/graphql-js/blob/6e48d16f92b9a6df8638b1486354c6be2537033b/src/language/parser.ts#L73)

### `skipGraphQLConfig`

If you are using [`graphql-config`](https://graphql-config.com) in your project, the parser will automatically use that to load your default GraphQL schema.

You can disable this behaviour using `skipGraphQLConfig: true` in the `parserOptions`:

```json
  "parserOptions": {
    "skipGraphQLConfig": true
  }
```

### `schema`

You can specify `parserOptions.schema` to load your GraphQL schema. The parser uses `graphql-tools` and it's loaders, that means you can either specify a URL, a path to a local `.json` (introspection) file, or a path to a local `.graphql` file(s). You can also use Glob expressions to load multiple files.

Here are a few examples for a valid setup:

```json
  "parserOptions": {
    "schema": "./schema.graphql"
  }
```

```json
  "parserOptions": {
    "schema": "./schema.json"
  }
```

```json
  "parserOptions": {
    "schema": "http://my-server/graphql"
  }
```

```json
  "parserOptions": {
    "schema": "./src/**/*.graphql"
  }
```

```json
  "parserOptions": {
    "schema": [
      "src/schema-a.graphql",
      "src/schema-b.graphql",
      "src/schema-c.graphql"
    ]
  }
```

### `schemaOptions`

If you wish to send additional configuration for the `graphql-tools` loaders that loads your schema, you can specify `schemaOptions` object:

```json
  "parserOptions": {
    "schema": "http://my-server/graphql",
    "schemaOptions": {
      "headers": {
        "Authorization": "Bearer MY_TOKEN"
      }
    }
  }
```

```json
  "parserOptions": {
    "schema": "./src/**/*.graphql",
    "schemaOptions": {
      "assumeValid": true
    }
  }
```

> The configuration here is flexible, and will be sent to `graphql-tools` and it's loaders. So depends on the schema source, the options may vary. [You can read more about these loaders and their configuration here](https://graphql-tools.com/docs/api/interfaces/loaders_graphql_file_src.GraphQLFileLoaderOptions#properties).
