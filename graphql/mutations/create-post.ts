import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      createdAt
      updatedAt
      creatorId
      points
      text
      title
    }
  }
`;
