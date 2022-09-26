---
'@graphql-eslint/eslint-plugin': patch
---

return code as-is in `preprocess` in case of parsing error, sort eslint/graphql-eslint errors in `postprocess` by line/column
