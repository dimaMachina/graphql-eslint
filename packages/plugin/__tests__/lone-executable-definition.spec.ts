import { rule, RuleOptions } from '../src/rules/lone-executable-definition';
import { ruleTester } from './test-utils';

ruleTester.run<RuleOptions>('lone-executable-definition', rule, {
  valid: [
    {
      name: 'should allow single short-hand query',
      code: /* GraphQL */ `
        {
          id
        }
      `,
    },
    {
      name: 'should allow single anonymous query',
      code: /* GraphQL */ `
        query {
          id
        }
      `,
    },
    {
      name: 'should allow single named query',
      code: /* GraphQL */ `
        query Foo {
          id
        }
      `,
    },
    {
      name: 'should allow single fragment',
      code: /* GraphQL */ `
        fragment Foo on Bar {
          id
        }
      `,
    },
    {
      name: 'should allow single anonymous mutation',
      code: /* GraphQL */ `
        mutation ($name: String!) {
          createFoo {
            name
          }
        }
      `,
    },
    {
      name: 'should allow single named mutation',
      code: /* GraphQL */ `
        mutation Foo($name: String!) {
          createFoo {
            name
          }
        }
      `,
    },
    {
      name: 'should allow single anonymous subscription',
      code: /* GraphQL */ `
        subscription {
          id
        }
      `,
    },
    {
      name: 'should allow single named subscription',
      code: /* GraphQL */ `
        subscription Foo {
          id
        }
      `,
    },
    {
      name: 'should allow fragments if they are ignored',
      options: [{ ignore: ['fragment'] }],
      code: /* GraphQL */ `
        {
          id
        }
        fragment Bar on Bar {
          id
        }
      `,
    },
    {
      name: 'should ignore definitions even if they are first in the document',
      options: [{ ignore: ['fragment'] }],
      code: /* GraphQL */ `
        fragment Bar on Bar {
          id
        }
        query Foo {
          id
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'should report additional definitions',
      code: /* GraphQL */ `
        query Valid {
          id
        }
        {
          id
        }
        fragment Bar on Bar {
          id
        }
        mutation ($name: String!) {
          createFoo {
            name
          }
        }
        mutation Baz($name: String!) {
          createFoo {
            name
          }
        }
        subscription {
          id
        }
        subscription Sub {
          id
        }
      `,
      errors: [
        { message: 'Query should be in a separate file.' },
        { message: 'Fragment "Bar" should be in a separate file.' },
        { message: 'Mutation should be in a separate file.' },
        { message: 'Mutation "Baz" should be in a separate file.' },
        { message: 'Subscription should be in a separate file.' },
        { message: 'Subscription "Sub" should be in a separate file.' },
      ],
    },
    {
      name: 'should report definitions after short-hand query',
      code: /* GraphQL */ `
        {
          id
        }
        fragment Bar on Bar {
          id
        }
      `,
      errors: [{ message: 'Fragment "Bar" should be in a separate file.' }],
    },
    {
      name: 'should allow fragments if they are ignored',
      options: [{ ignore: ['fragment'] }],
      code: /* GraphQL */ `
        query Foo {
          id
        }
        fragment Bar on Bar {
          id
        }
        mutation Baz($name: String!) {
          createFoo {
            name
          }
        }
      `,
      errors: [{ message: 'Mutation "Baz" should be in a separate file.' }],
    },
  ],
});
