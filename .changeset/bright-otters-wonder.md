---
'@graphql-eslint/eslint-plugin': patch
---

fix TypeScript error

```
Type 'RuleContext' is not assignable to type 'GraphQLESLintRuleContext<[]>'.
          Property 'parserServices' is missing in type 'RuleContext' but required in type '{ options: []; parserServices: ParserServices; report(descriptor: ReportDescriptor): void; }'.
```
