---
"@graphql-eslint/eslint-plugin": patch
---

fix: original file should not be considered as file block

Related #88

ESLint supports `text` directly, no need to use the hacky way. See https://github.com/eslint/eslint/blob/master/lib/linter/linter.js#L1298

Related `eslint-plugin-prettier`'s issue hae been fixed at https://github.com/prettier/eslint-plugin-prettier/pull/401
