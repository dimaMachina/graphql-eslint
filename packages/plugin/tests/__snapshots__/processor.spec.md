// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Processor preprocess finds custom tag 1`] = `
Array [
  
      import { customGqlTag } from 'custom-gql-tag'
      const fooQuery = customGqlTag\`
        query foo {
          id
        }
      \`
    ,
]
`;

exports[`Processor preprocess finds gql tag 1`] = `
Array [
  Object {
    filename: document.graphql,
    lineOffset: 2,
    offset: 64,
    text: query foo { id },
  },
  
      import { gql } from 'graphql'
      const fooQuery = gql\`query foo { id }\`
    ,
]
`;

exports[`Processor preprocess should return code blocks 1`] = `
Array [
  Object {
    filename: document.graphql,
    lineOffset: 2,
    offset: 60,
    text: 
      query foo {
        id
      }
    ,
  },
  
    import { gql } from 'graphql'
    const fooQuery = gql\`
      query foo {
        id
      }
    \`,
]
`;
