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
  mutation ($first_name:String! $id:id! $username:String! $last_name:String!) {
  update_Users(_set: {first_name: $first_name,usernane:$username ,last_name: $last_name}, where: {id: {_eq: $id}}) {
    returning {
      first_name
      last_name
      username
    }
  }
}
`;


export const UPDATE_POST = gql`
  mutation ($content:String! $id:id! $user_id:user_id!)  {
    update_Posts(where: {user_id: {_eq: $user_id}, id: {_eq: $id}}, _set: {content: $content}) {
      returning {
        content
      }
    }
  }`;

