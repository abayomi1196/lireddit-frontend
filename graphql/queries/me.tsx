import { graphql } from "gql";

export const meQuery = graphql(/*GRAPHQL*/ `
  query me {
    me {
      username
      id
    }
  }
`);
