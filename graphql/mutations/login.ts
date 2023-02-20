import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      user {
        username
        createdAt
        id
      }
      errors {
        field
        message
      }
    }
  }
`;
