import { graphql } from "gql";

export const loginMutation = graphql(/*GraphQL*/ `
  mutation LoginMutation($options: UsernamePasswordInput!) {
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
`);
