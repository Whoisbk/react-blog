import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import { useEffect } from 'react';

function Home() {

  let navigate = useNavigate()
   const GET_USERS = gql`
     query MyQuery {
       Users {  
         email
         first_name
         id
         last_name
         username
       }
     }
   `;
  
  const GET_POSTS = gql`
    query MyQuery {
      Posts {
        content
        created_at
        id
      }
    }
  `;
 
  function DisplayPosts() {
    const { loading, error, data } = useQuery(GET_POSTS);
    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;
    return data.Posts.map(({ id, content, created_at }) => (
      <div key={id}>
        <h3>{content}</h3>
        <p>{created_at}</p>
        <br />
      </div>
    ));
  }

  function DisplayUsers() {
    const { loading, error, data } = useQuery(GET_USERS);
      if (loading) return <p>Loading...</p>;

      if (error) return <p>Error :(</p>;
      return data.Users.map(({ id, first_name, last_name}) => (
        <div key={id}>
          <h3>{first_name}</h3>
          <b>About this location:</b>
          <p>{last_name}</p>
          <br />
        </div>
      ));
  }

  return (
    <div>
      <DisplayUsers />
      <DisplayPosts />
      <Button className="m-2" variant="secondary" onClick={()=>{navigate("/profile")}}>
        Start A Post
      </Button>
    </div>
  );
}

export default Home