import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/prettier';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('prettier', rule, {
  valid: ['scalar Test\n'],
  invalid: [
    {
      code: `query GetUser($userId:      ID!) {
  user(id: $userId) {
        id,
  name,
    isViewerFriend,
    profilePicture(size: 50)  {
      ...PictureFragment
    }
  }
}

fragment PictureFragment on Picture {
  uri,
  width,
  height
}`,
      errors: 8,
      output: `query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    isViewerFriend
    profilePicture(size: 50) {
      ...PictureFragment
    }
  }
}

fragment PictureFragment on Picture {
  uri
  width
  height
}
`,
    },
  ],
});
