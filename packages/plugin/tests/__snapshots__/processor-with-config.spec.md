// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`processor with graphql-config preprocess finds custom tag 1`] = `
Array [
  Object {
    filename: document.graphql,
    lineOffset: 2,
    offset: 73,
    text: query users { id },
  },
  
    import { custom } from 'custom-gql-tag'
    const fooQuery = custom\`query users { id }\`
  ,
]
`;
