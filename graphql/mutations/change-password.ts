import gql from "graphql-tag";

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
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
