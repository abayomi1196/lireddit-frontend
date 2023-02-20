import { gql } from "urql";

export const REGULAR_USER_FRAGMENT = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
