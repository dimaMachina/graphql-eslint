---
'@graphql-eslint/eslint-plugin': major
---

feat: remove `prettier` rule, add related docs

### BREAKING CHANGE: Remove `prettier` Rule

Since prettier itself support now linting GraphQL code and syntax, we removed the need for this rule from this package.

For more information, see:

- [Migration guide and example](https://github.com/dotansimha/graphql-eslint#prettier-rule)
- [Related PR](https://github.com/dotansimha/graphql-eslint/issues/395)
