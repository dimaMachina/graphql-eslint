import { GraphQLRuleTester } from '../src';
import { rule } from '../src/rules/require-import-fragment';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('require-import-fragment', rule, {
  valid: [
    {
      name: 'should not report imported fragments',
      code: /* GraphQL */ `
        # import Foo from 'foo.graphql'

        query MyQuery {
          fooField {
            ...Foo
          }
        }
      `,
    },
    {
      name: 'should not report fragments from the same file',
      code: /* GraphQL */ `
        query MyQuery {
          fooField {
            ...Foo
          }
        }

        fragment Foo on Bar {
          baz
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'should report fragments when there are no import expressions',
      code: /* GraphQL */ `
        query MyQuery {
          fooField {
            ...Foo
          }
        }
      `,
      errors: [{ message: "Expected 'Foo' fragment to be imported." }],
    },
    {
      name: 'should report fragments when there are only invalid import expressions',
      code: /* GraphQL */ `
        # import 'foo.graphql'

        query MyQuery {
          fooField {
            ...Foo
          }
        }
      `,
      errors: [{ message: "Expected 'Foo' fragment to be imported." }],
    },
    {
      name: 'should report fragments when there are no appropriately named import expressions',
      code: /* GraphQL */ `
        # import Bar from 'foo.graphql'

        query MyQuery {
          fooField {
            ...Foo
          }
        }
      `,
      errors: [{ message: "Expected 'Foo' fragment to be imported." }],
    },
  ],
});
