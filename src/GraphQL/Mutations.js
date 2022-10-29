import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation (
    $first_name: String!
    $last_name: String!
    $email: String!
    $username: String!
    $id:String!
    $image_url:String!
  ) {
    insert_Users(
      objects: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        username: $username
        id:$id
        image_url:$image_url
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
export const UPDATE_USER = gql`
  mutation update_Users(
    $first_name: String!
    $id: String!
    $username: String!
    $last_name: String!
  ) {
    update_Users(
      where: { id: { _eq: $id } }
      _set: {
        first_name: $first_name
        username: $username
        last_name: $last_name
      }
    ) {
      affected_rows
      returning {
        first_name
        last_name
        username
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation ($content:String! $id:Int! $user_id:String!)  {
    update_Posts(where: {user_id: {_eq: $user_id}, id: {_eq: $id}}, _set: {content: $content}) {
      returning {
        content
      }
    }
  }`;

export const DELETE_POST = gql`
  mutation delete_Posts( $id:Int!) {
    delete_Posts(where: { id: { _eq: $id } }) {
      returning {
        content
        id
      }
    }
  }
`;


export const DELETE_USER = gql`
mutation delete_Users( $id: String!) {
  delete_Users(where: {id: {_eq: $id}}) {
    returning {
      first_name
    }
  }
}`;