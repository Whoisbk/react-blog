import { getAuth } from 'firebase/auth';
import React from 'react'
import { USER_PROFILE } from "../GraphQL/Queries";
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';

function Profile() {

  const [uid, setUid] = useState([]);
  
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user"));
    if (uid) {
      setUid(uid);
    }
    console.log(uid)
  }, []);

  function DisplayUsers(prop) {
    const { loading, error, data } = useQuery(USER_PROFILE, {
      variables: {
        id: prop.id,
      },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    console.log(data)
    return data.Users.map(
      ({ id, first_name, last_name, email, username, Posts }) => (
        <div key={id}>
          <h3>{first_name}</h3>
          <p>{last_name}</p>
          <h3>{email}</h3>
          <p>{username}</p>
          {Posts.map((p) => (<p>{p.content}</p>
          ))}
        </div>
      )
    );
  }
  
  return (
    <div>
      profile page <DisplayUsers id={uid} />
    </div>
  );
}

export default Profile