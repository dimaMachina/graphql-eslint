---
'@graphql-eslint/eslint-plugin': major
---

1. graphql plugin can now we be specified as

   ```diff
   plugins: {
   -  '@graphql-eslint': {
   -    graphqlPlugin.rules
   -  }
   +  '@graphql-eslint': graphqlPlugin
   }
   ```

1. Config rules should now be accessed through the `rules` property

   ```diff
     rules: {
   -   ...graphqlESLint.configs['flat/operations-recommended']
   +   ...graphqlESLint.configs['flat/operations-recommended'].rules
   ```

1. processor can now be specified with accessing `processor` property

   ```diff
   - processor: graphql.processors.graphql
   + processor: graphqlPlugin.processor
   ```

1. The plugin can now be imported using a default import

   ```diff
   - import * as graphql from '@graphql-eslint/eslint-plugin'
   + import graphqlPlugin from '@graphql-eslint/eslint-plugin'
   ```
