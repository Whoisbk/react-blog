import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query($id:String!) {
    Users(where: { id: { _eq: $id } }) {
      first_name
      last_name
      id
      username
      image_url
      email
      Posts{
        content
      }
    }
  }
`;

export const GET_POSTS = gql`
  query{
    Posts {
      id
      content
      created_at

      User {
        username
        image_url
        id
      }
    }
  }
`;


