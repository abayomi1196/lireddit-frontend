import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        id
        title
        textSnippet
        createdAt
      }
    }
  }
`;
