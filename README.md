This project integrates GraphQL and ESLint, for a better developer experience.

<img height="150" src="./logo.png">

[![npm version](https://badge.fury.io/js/%40graphql-eslint%2Feslint-plugin.svg)](https://badge.fury.io/js/%40graphql-eslint%2Feslint-plugin)

> Created and maintained by [The Guild](https://the-guild.dev)

## Key Features

- 🚀 Integrates with ESLint core (as a ESTree parser)
- 🚀 Works on `.graphql` files, `gql` usages and `/* GraphQL */` magic comments
- 🚀 Lints both GraphQL schema and GraphQL operations
- 🚀 Extended type info for more advanced usages
- 🚀 Supports ESLint directives (for example: `eslint-disable-next-line`)
- 🚀 Easily extendable - supports custom rules based on GraphQL's AST and ESLint API
- 🚀 Validates, lints, prettifies and checks for best practices across GraphQL schema and GraphQL operations
- 🚀 Integrates with [`graphql-config`](https://graphql-config.com)
- 🚀 Integrates and visualizes lint issues in popular IDEs (VSCode / WebStorm)

> Special thanks to [ilyavolodin](https://github.com/ilyavolodin) for his work on a similar project!

<img src="https://thumbs.gfycat.com/ActualTerrificDog-size_restricted.gif" />

## Getting Started

- [Introducing GraphQL-ESLint!](https://the-guild.dev/blog/introducing-graphql-eslint) @ `the-guild.dev`

### Installation

Start by installing the plugin package, which includes everything you need:

```sh
yarn add -D @graphql-eslint/eslint-plugin
```

Or, with NPM:

```sh
npm install --save-dev @graphql-eslint/eslint-plugin
```

> Make sure you have `graphql` dependency in your project.

## Configuration

To get started, define an override in your ESLint config to apply this plugin to `.graphql` files. Add the [rules](docs/README.md) you want applied.

> 🚨 Important! This step is necessary even if you are declaring operations and/or schema in code files.

```json
{
  "overrides": [
    {
      "files": ["*.graphql"],
      "parser": "@graphql-eslint/eslint-plugin",
      "plugins": ["@graphql-eslint"],
      "rules": {
        "@graphql-eslint/known-type-names": "error"
      }
    }
  ]
}
```

If your GraphQL definitions are defined only in `.graphql` files, and you're only using rules that apply to individual files, you should be good to go 👍. If you would like use a remote schema or use rules that apply across the entire collection of definitions at once, see [here](#extended-linting-rules-with-graphql-schema).

### Apply this plugin to GraphQL definitions defined in code files

If you are defining GraphQL schema or GraphQL operations in code files, you'll want to define an additional override to extend the functionality of this plugin to the schema and operations in those files.

```diff
{
  "overrides": [
+   {
+     "files": ["*.js"],
+     "processor": "@graphql-eslint/graphql"
+   },
    {
      "files": ["*.graphql"],
      "parser": "@graphql-eslint/eslint-plugin",
      "plugins": ["@graphql-eslint"],
      "rules": {
        "@graphql-eslint/known-type-names": "error"
      }
    }
  ]
}
```

Under the hood, specifying the `@graphql-eslint/graphql` processor for code files will cause `graphql-eslint/graphql` to extract the schema and operation definitions from these files into virtual GraphQL documents with `.graphql` extensions. This will allow the overrides you've defined for `.graphql` files, via `"files": ["*.graphql"]`, to get applied to the definitions defined in your code files.

### Extended linting rules with GraphQL Schema

Some rules require an understanding of the entire schema at once. For example, [no-unreachable-types](https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-unreachable-types.md#no-unreachable-types) checks that all types are reachable by root-level fields.

To use these rules, you'll need to tell ESLint how to identify the entire set of schema definitions.

If you are using [`graphql-config`](https://graphql-config.com), you are good to go. `graphql-eslint` integrates with it automatically and will use it to load your schema!

Alternatively, you can define `parserOptions.schema` in the `*.graphql` override in your ESLint config.

The parser allows you to specify a json file / graphql files(s) / url / raw string to locate your schema (We are using `graphql-tools` to do that). Just add `parserOptions.schema` to your configuration file:

```diff
{
  "files": ["*.graphql"],
  "parser": "@graphql-eslint/eslint-plugin",
  "plugins": ["@graphql-eslint"],
  "rules": {
    "@graphql-eslint/no-unreachable-types": "error"
  },
+ "parserOptions": {
+   "schema": "./schema.graphql"
+ }
}
```

> You can find a complete [documentation of the `parserOptions` here](docs/parser-options.md).

> Some rules require type information to operate, it's marked in the docs for each rule!

### Extended linting rules with siblings operations

While implementing this tool, we had to find solutions for a better integration of the GraphQL ecosystem and ESLint core.

GraphQL operations can be distributed across many files, while ESLint operates on one file at a time. If you are using GraphQL fragments in separate files, some rules might yield incorrect results, due the missing information.

To workaround that, we allow you to provide additional information on your GraphQL operations, making it available for rules while doing the actual linting.

To provide that, we are using `graphql-tools` loaders to load your sibling operations and fragments, just specify a glob expression(s) that points to your code/`.graphql` files:

```diff
{
  "files": ["*.graphql"],
  "parser": "@graphql-eslint/eslint-plugin",
  "plugins": ["@graphql-eslint"],
  "rules": {
    "@graphql-eslint/unique-operation-name": "error"
  },
  "parserOptions": {
+   "operations": "./src/**/*.graphql",
    "schema": "./schema.graphql"
  }
}
```

### VSCode Integration

Use [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to integrate ESLint into VSCode.

For syntax highlighting you need a GraphQL extension (which may potentially have its own linting), for example [GraphQL (by GraphQL Foundation)](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

### Disabling Rules

The `graphql-eslint` parser looks for GraphQL comments syntax (marked with `#`) and will send it to ESLint as directives. That means, you can use ESLint directives syntax to hint ESLint, just like in any other type of files.

To disable ESLint for a specific line, you can do:

```graphql
# eslint-disable-next-line
type Query {
  foo: String!
}
```

You can also specify specific rules to disable, apply it over the entire file, `eslint-disable-next-line` or current `eslint-disable-line`.

You can find a list of [ESLint directives here](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments).

## Available Rules

You can find a complete list of [all available rules here](docs/README.md).

### Deprecated Rules

See [docs/deprecated-rules.md](docs/deprecated-rules.md).

## Available Configs

<!-- prettier-ignore-start -->
|Name|Description|
|:-:|-|
|[`schema-recommended`](packages/plugin/src/configs/schema-recommended.json)|enables recommended rules for schema (SDL) development|
|[`schema-all`](packages/plugin/src/configs/schema-all.json)|enables all rules for schema (SDL) development, except for those that require `parserOptions.operations` option|
|[`operations-recommended`](packages/plugin/src/configs/operations-recommended.json) |enables recommended rules for consuming GraphQL (operations) development|
|[`operations-all`](packages/plugin/src/configs/operations-all.json)|enables all rules for consuming GraphQL (operations) development|
|[`relay`](packages/plugin/src/configs/relay.json)|enables rules from Relay specification for schema (SDL) development|
<!-- prettier-ignore-end -->

> If you are in a project that develops the GraphQL schema, you'll need `schema` rules.

> If you are in a project that develops GraphQL operations (query/mutation/subscription), you'll need `operations` rules.

> If you are in a monorepo project, you probably need both sets of rules, see [example of configuration](examples/monorepo/.eslintrc.cjs).

### Config usage

For example, to enable the `schema-recommended` config, enable it in your `.eslintrc` file with the `extends` option:

> All configs under the hood set `parser` as `@graphql-eslint/eslint-plugin` and add `@graphql-eslint` to `plugins` array, so you don't need to specify them.

```diff
{
  "overrides": [
    {
      "files": ["*.js"],
      "processor": "@graphql-eslint/graphql"
    },
    {
      "files": ["*.graphql"],
-     "parser": "@graphql-eslint/eslint-plugin",
-     "plugins": ["@graphql-eslint"],
+     "extends": "plugin:@graphql-eslint/schema-recommended"
    }
  ]
}
```

### `prettier` rule

`eslint-plugin-prettier` supports `.graphql` files, and `v4.1.0` supports `graphql` blocks even better. You need to do the following:

```js
module.exports = {
  overrides: [
    {
      files: ['*.js'],
      processor: '@graphql-eslint/graphql',
      extends: ['plugin:prettier/recommended']
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        'prettier/prettier': 'error'
      }
    }
  ]
}
```

You can take [`examples/prettier`](examples/prettier/.eslintrc.cjs) as example.

## Further Reading

If you wish to learn more about this project, how the parser works, how to add custom rules and more please refer to the below links:

- [Writing Custom Rules](docs/custom-rules.md)
- [How the parser works?](docs/parser.md)
- [`parserOptions`](docs/parser-options.md)

## Contributions

Contributions, issues and feature requests are very welcome. If you are using this package and fixed a bug for yourself, please consider submitting a PR!

And if this is your first time contributing to this project, please do read our [Contributor Workflow Guide](https://github.com/the-guild-org/Stack/blob/master/CONTRIBUTING.md) before you get started off.

### Code of Conduct

Help us keep GraphQL ESLint open and inclusive. Please read and follow our [Code of Conduct](https://github.com/the-guild-org/Stack/blob/master/CODE_OF_CONDUCT.md) as adopted from [Contributor Covenant](https://contributor-covenant.org).

## License

Released under the [MIT license](LICENSE).
