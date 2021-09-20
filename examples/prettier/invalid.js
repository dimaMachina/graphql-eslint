const GET_USER = /* GraphQL */ `query User($userId:      ID!) {
  user(id: $userId) {
    id,
    name,
    isViewerFriend,
    profilePicture(size: 50)  {
      ...PictureFields
    }
  }
}

fragment PictureFields on Picture {
  uri,
  width,
  height
}
`
