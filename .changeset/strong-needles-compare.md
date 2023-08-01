---
'@graphql-eslint/eslint-plugin': major
---

Remove `GraphQLRuleTester` from bundle, to test your rules use regular `RuleTester` from eslint

> **Note**: with this change unnecessary dependency `@babel/code-frame` was removed too

```js
import { RuleTester } from 'eslint'

const ruleTester = new RuleTester({
  parser: require.resolve('@graphql-eslint/eslint-plugin')
})
```
