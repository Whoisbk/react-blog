import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query($id:String!) {
    Users(where: { id: { _eq: $id } }) {
      first_name
      last_name
    }
  }
`;


