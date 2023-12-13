import { rule } from '../src/rules/federation-subgraph';
import { ruleTester } from './test-utils';

ruleTester.run('federation-subgraph', rule, {
  valid: [],
  invalid: [
    {
      // https://github.com/apollographql/federation/blob/4ffe723395b4a054807b4f58181f166d76b57160/internals-js/src/__tests__/subgraphValidation.test.ts#L9
      name: 'should validate subgraph',
      code: /* GraphQL */ `
        type Query {
          t: T
        }

        type T @key(fields: "f") {
          f(x: Int): Int
        }
      `,
      errors: 1,
    },
  ],
});
