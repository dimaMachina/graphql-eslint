---
'@graphql-eslint/eslint-plugin': major
---

- bring back `possible-type-extension` rule to `schema-recommended` config

- add `unique-operation-name` and `unique-fragment-name` rules to `operations-recommended` config

The concept of sibling operations provided by graphql-config's `documents` fields is based on
uniquely named operations and fragments, for omitting false-positive/negative cases when operations
and fragments are located in separate files. For this reason, these rules must be included in the
recommended config
