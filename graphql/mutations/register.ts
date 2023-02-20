import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        username
        id
      }
    }
  }
`;
