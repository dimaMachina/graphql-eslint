---
"@graphql-eslint/eslint-plugin": patch
---

The import attribute syntax (with { type: "json" }) is still experimental so warnings showed up when using the library as it was being used to import the package.json file to extract the package version

As an alternative, the current version will be injected on build time through tsup configuration.
