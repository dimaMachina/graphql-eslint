// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`processor preprocess finds gql tag 1`] = `
Array [
  Object {
    filename: document.graphql,
    lineOffset: 2,
    offset: 64,
    text: query users { id },
  },
  
      import { gql } from 'graphql'
      const fooQuery = gql\`query users { id }\`
    ,
]
`;
