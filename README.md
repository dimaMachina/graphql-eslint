<p align="center">
  <img src="./logo.png">
</p>

This project integrates GraphQL AST parser and ESLint.

## Key Features:

- 🚀 Integrates with ESLint core (as a ESTree parser).
- 🚀 Works on `.graphql` files, `gql` usages and `/* GraphQL */` magic comments.
- 🚀 Lints both GraphQL schema and GraphQL operations.
- 🚀 Extended type info for more advanced usages
- 🚀 Supports ESLint directives (for example: `disable-next-line`)
- 🚀 Easily extendable - supports custom rules.

Special thanks to [ilyavolodin](https://github.com/ilyavolodin) for his work on a similar project!

## Getting Started

### Installation

Start by installing the plugin package, which includes everything you need:

```
yarn add -D @graphql-eslint/eslint-plugin
```

Or, with NPM:

```
npm install --save-dev @graphql-eslint/eslint-plugin
```

> Also, make sure you have `graphql` dependency in your project.

### Configuration

To get started, create an override configuration for your ESLint, while applying it to to `.graphql` files (do that even if you are declaring your operations in code files):

```json
{
  "overrides": [
    {
      "files": ["*.graphql"],
      "parser": "@graphql-eslint/eslint-plugin",
      "plugins": ["@graphql-eslint"],
      "rules": {
        ...
      }
    }
  ]
}
```

If you are using code files to store your GraphQL schema or your GraphQL operations, you can extend the behaviour of ESLint and extract those, by adding the following to your setup:

```json
{
  "processor": "@graphql-eslint/graphql",
  "overrides": [ ... ]
}
```

#### Extended linting with GraphQL Schema

If you are using [`graphql-config`](https://graphql-config.com/) - you are good to go. This package integrates with it automatically, and will use it to load your schema!

Linting process can be enriched and extended with GraphQL type information, if you are able to provide your GraphQL schema.

The parser allow you to specify a json file / graphql files(s) / url / raw string to locate your schema (We are using `graphql-tools` to do that). Just add `parserOptions.schema` to your configuration file:

```json
{
  "files": ["*.graphql"],
  "parser": "@graphql-eslint/eslint-plugin",
  "plugins": ["@graphql-eslint"],
  "parserOptions": {
    "schema": "./schema.graphql"
  }
}
```

> Some rules requires type information to operate, it's marked in the docs of each plugin!

### VSCode Integration

By default, [ESLint VSCode plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) will not lint files with extensions other then js, jsx, ts, tsx.

In order to enable it processing other extensions, add the following section in `settings.json` or workspace configuration.

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "graphql"],
  "eslint.options": {
    "extentions": [".js", ".graphql"]
  }
}
```

## Available Rules

You can find a complete list of [all available plugins here](./docs/README.md)

> This repo doesn't exports a "recommended" set of rules - feel free to recommend us!
