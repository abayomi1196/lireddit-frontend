import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      title
      createdAt
    }
  }
`;
