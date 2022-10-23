import { getAuth } from 'firebase/auth';
import React from 'react'
import { USER_PROFILE } from "../GraphQL/Queries";
import { useQuery } from '@apollo/client';

function Profile() {
  const auth = getAuth();
 

  const id = "CfQPmhq8hVT1SYSKVoKCD5dB9oV2";
  
  function DisplayUsers(props) {
    const { loading, error, data } = useQuery(USER_PROFILE, {
      variables: {
        id:props.id
      }
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error...</p>;

    
    return console.log(data)
  }
  
  return (
    <div>
      profile page <DisplayUsers id={id} />
    </div>
  );
}

export default Profile