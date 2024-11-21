<template>
	<!-- use the variables to satisfy the no-unused-vars lint -->
  <span>{{ GET_USER }}</span>
  <span>{{ GET_ANOTHER_USER }}</span>
</template>
<script>
const GET_USER = /* GraphQL */ `
  query {
    user {
      name
    }
  }
`;

const GET_ANOTHER_USER = /* GraphQL */ `
  query UserQuery {
    user {
      name
    }
  }
`;
</script>
