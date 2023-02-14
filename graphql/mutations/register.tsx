import { graphql } from "gql";

export const registerPatient = graphql(/*GraphQL*/ `
  mutation registerPatientMutation($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        createdAt
        id
        username
      }
    }
  }
`);
