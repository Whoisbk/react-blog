import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { GET_POSTS } from '../GraphQL/Queries';

function Home() {

  const auth = getAuth();
  
  const [uid, setUid] = useState([]);

  const currentU = localStorage.getItem("user")

  console.log(currentU)

  useEffect(() => {
    localStorage.setItem("uid", JSON.stringify(currentU));
  }, [uid]);

  let navigate = useNavigate()

  function DisplayPosts() {
    const { loading, error, data } = useQuery(GET_POSTS);
    if (loading) return;
    if (error) return <p>Error loading data :(</p>;
    console.log(data.Posts)
    return data.Posts.map(({ id, content, created_at,User }) => (
      <div key={id}>
        <h2>{User.username}</h2>
        <h3>{content}</h3>
        <p>{created_at}</p>
        <br />
      </div>
    ));
  
  }

  return (
    <div>
      <DisplayPosts />
      <Button className="m-2" variant="secondary" onClick={()=>{navigate("/createpost")}}>
        Start A Post
      </Button>
    </div>
  );
}

export default Home