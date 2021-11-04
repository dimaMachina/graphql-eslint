---
'@graphql-eslint/eslint-plugin': major
---

feat: split `recommended` config to two configs `schema-recommended` and `operations-recommended`

`recommended` and `all` configs were divided to 4 configs `schema-recommended`
, `operations-recommended`, `schema-all` and `operations-all`. This was done in order to
use `recommended` and `all` configs in `schema-only` projects where it is not possible to provide operations.
