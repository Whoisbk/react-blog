import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation (
    $first_name: String!
    $last_name: String!
    $email: String!
    $username: String!
    $id:String!
  ) {
    insert_Users(
      objects: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        username: $username
        id:$id
      }
    ) {
      returning {
        email
        first_name
      }
    }
  }
`;

  export const CREATE_POST = gql`
  mutation($content:String! $user_id:String!) {
  insert_Posts(objects: {content: $content, user_id: $user_id}) {
    returning {
      content
      id
    }
  }
}
`

