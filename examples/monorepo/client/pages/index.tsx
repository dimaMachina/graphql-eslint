const GET_POSTS = /* GraphQL */ `
  query Posts {
    posts {
      id
      title
      content
      author {
        id
        firstname
      }
    }
  }
`;

export default function IndexPage() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
