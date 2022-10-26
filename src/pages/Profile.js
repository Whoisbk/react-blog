import React from 'react'
import { USER_PROFILE } from "../GraphQL/Queries";
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { DELETE_USER } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { getAuth,deleteUser } from 'firebase/auth';

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
  const [delete_Users, { e }] = useMutation(DELETE_USER)
  const delUser = (id) => {

    delete_Users({
      variables: {
        id: id,
      },
    });
    if (e) {
      console.log(e)
      
      }
    };
  
  
  return (
    <div>
      {data ? (
        user.map(
          ({
            id,
            first_name,
            last_name,
            email,
            username,
            Posts,
            image_url,
          }) => (
            <div key={id}>
              <div className='d-flex m-5' >
                <div>
                  <img
                    src={image_url}
                    style={{ width: "10rem", height: "15rem" }}
                  ></img>
                </div>
                <div>
                  <h4>First Name: {first_name}</h4>
                  <h4>Last Name: {last_name}</h4>
                  <h4>Email: {email}</h4>
                  <h4>Username: {username}</h4>
                </div>
              </div>
              <h3>{first_name}'s Blog Posts</h3>
              {Posts.map((p) => (
                <p>{p.content}</p>
              ))}
            </div>
          )
        )
      ) : (
        <Spinner
          animation="border"
          style={{ marginLeft: "40rem", marginTop: "15rem" }}
        />
      )}
    </div>
  );
}

export default Profile