import React from 'react'
import { USER_PROFILE } from "../GraphQL/Queries";
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from "react-bootstrap/Spinner";

function Profile() {

  const [uid, setUid] = useState([]);
  const [user, setUser] = useState([])

  const { loading, error, data } = useQuery(USER_PROFILE, {
    variables: {
      id: uid
    },
  });

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user"));
    if (uid) {
      setUid(uid);
    }
    if (data) {
      setUser(data.Users);
    }
    
  }, [uid, data]);

  
  return (
    <div>
      {data ? (
        user.map(({ id, first_name, last_name, email, username, Posts,image_url }) => (
        <div key={id}>
          <h3>{first_name}</h3>
          <p>{last_name}</p>
          <h3>{email}</h3>
            <p>{username}</p>
            <img src={image_url} style={{width:"5rem",height:"5rem"}}></img>
            {Posts.map((p) => (
              <p>{p.content}</p>
            ))}
          </div>)
        )):(
        <Spinner
          animation="border"
          style={{ marginLeft: "40rem", marginTop: "15rem" }}
        />
      )}
    </div>
  );
}

export default Profile