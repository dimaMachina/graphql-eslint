import { join } from 'node:path';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { ruleTester } from './test-utils';

ruleTester.run('known-fragment-names', GRAPHQL_JS_VALIDATIONS['known-fragment-names'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/user.graphql'),
      code: ruleTester.fromMockFile('user.graphql'),
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: join(__dirname, 'mocks/user-fields-with-variables.gql'),
        },
      },
    },
    {
      filename: join(__dirname, 'mocks/known-fragment-names.ts/1_document.graphql'),
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFields
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: join(__dirname, 'mocks/known-fragment-names.ts'),
        },
      },
    },
    {
      name: 'should import all fragments inside fragments',
      filename: join(__dirname, 'mocks/known-fragment-names/user.gql'),
      code: ruleTester.fromMockFile('known-fragment-names/user.gql'),
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: [
            join(__dirname, 'mocks/known-fragment-names/user.gql'),
            join(__dirname, 'mocks/known-fragment-names/user-fields.gql'),
          ],
        },
      },
    },
    {
      name: 'should work when interface implemented',
      code: /* GraphQL */ `
        fragment Introduction on Introduction {
          introText {
            ...ContentUnit
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: /* GraphQL */ `
            interface ContentUnit {
              contentSets: Int
            }

            type IntroText implements ContentUnit {
              contentSets: Int
            }

            type Introduction {
              introText: IntroText
            }

            type Query {
              foo: Int
            }
          `,
          documents: /* GraphQL */ `
            fragment ContentUnit on ContentUnit {
              contentSets {
                id
              }
            }
          `,
        },
      },
    },
    {
      name: 'should work when with union',
      code: /* GraphQL */ `
        query {
          animal {
            ...AnimalFields
          }
        }
      `,
      parserOptions: {
        graphQLConfig: {
          schema: /* GraphQL */ `
            type Cat {
              name: String
            }

            type Dog {
              age: String
            }

            union AnimalUnion = Cat | Dog

            type Animal {
              animal: AnimalUnion
            }

            type Query {
              animal: Animal
            }
          `,
          documents: /* GraphQL */ `
            fragment CatFields on Cat {
              title
            }

            fragment DogFields on Dog {
              url
            }

            fragment AnimalFields on AnimalUnion {
              animal {
                ...CatFields
                ...DogFields
              }
            }
          `,
        },
      },
    },
  ],
  invalid: [
    {
      name: 'should not throw an error on undefined fragment',
      filename: join(__dirname, 'mocks/known-fragment-names/operation-with-undefined-fragment.gql'),
      code: ruleTester.fromMockFile('known-fragment-names/operation-with-undefined-fragment.gql'),
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: join(
            __dirname,
            'mocks/known-fragment-names/operation-with-undefined-fragment.gql',
          ),
        },
      },
      errors: [{ message: 'Unknown fragment "DoesNotExist".' }],
    },
  ],
});
