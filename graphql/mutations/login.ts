import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        username
        id
      }
      errors {
        field
        message
      }
    }
  }
`;
