import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation (
    $first_name: String!
    $last_name: String!
    $email: String!
    $username: String!
  ) {
    insert_Users(
      objects: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        username: $username
      }
    ) {
      returning {
        email
        first_name
      }
    }
  }
`;
