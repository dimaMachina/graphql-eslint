---
'@graphql-eslint/eslint-plugin': patch
---

fix false positive cases for `require-import-fragment` on Windows, when `graphql-config`'s `documents` key contained glob pattern => source file path of document contained always forward slashes
