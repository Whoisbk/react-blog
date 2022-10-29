import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { GET_POSTS } from '../GraphQL/Queries';
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

function Home() {

  const auth = getAuth();
  
  const [uid, setUid] = useState([]);

  const currentU = localStorage.getItem("user")
  const [getPosts,setGetPosts] = useState([])
  console.log(currentU)
  const { loading, error, data } = useQuery(GET_POSTS);
  
  useEffect(() => {
    localStorage.setItem("uid", JSON.stringify(currentU));
    if (data) {
      setGetPosts(data.Posts)
      console.log(data.Posts)
    }
  }, [uid,data]);

  let navigate = useNavigate()

  function DisplayPosts() {
    const { loading, error, data } = useQuery(GET_POSTS);
    if (loading) return;
    if (error) return <p>Error loading data :(</p>;
    
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
      {data ? (
        getPosts.map(({ id, content, created_at, User }) => (
          <div key={id}>
            <Card style={{ width: "40rem", margin: "5rem", left: "20%" }}>
              <Card.Header>
                <div className="d-flex">
                  <Card.Img
                    src={User.image_url}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      marginRight: "2rem",
                      borderRadius: "5rem",
                    }}
                  />
                  <Card.Title>{User.username}</Card.Title>
                  <Dropdown style={{ left: "70%" }}>
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{content}</Card.Text>
              </Card.Body>
              <Card.Footer as="h10">created {created_at}</Card.Footer>
            </Card>
          </div>
        ))
      ) : (
        <Spinner
          animation="border"
          style={{ marginLeft: "40rem", marginTop: "15rem" }}
        />
      )}
    </div>
  );
}

export default Home