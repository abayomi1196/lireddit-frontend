import gql from "graphql-tag";

export const VOTE_MUTATION = gql`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`;
