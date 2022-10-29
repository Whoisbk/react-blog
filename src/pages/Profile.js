import React from 'react'
import { GET_POSTS, USER_PROFILE } from "../GraphQL/Queries";
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { DELETE_USER } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { getAuth,deleteUser } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { DELETE_POST } from '../GraphQL/Mutations';
function Profile() {

  
  const [uid, setUid] = useState([]);
  const [user, setUser] = useState([])
  const [delete_Posts, { err }] = useMutation(DELETE_POST);
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
  const delPost = (id) => {
    console.log(id)
    delete_Posts({
      variables: {
        id: id, 
      }, 
    });

    if (e) {
      console.log(e)
    }
  };
  
  const [delete_Users, { e }] = useMutation(DELETE_USER)
  let navigate = useNavigate()
  const delUser = (id) => {
    delete_Users({
      variables: {
        id: id,
      },
    });

    deleteUser(id).then(() => {
      alert("user deleted successfuly");
      localStorage.clear()
      navigate("/login");
    }).catch((error) => {
      console.log(error)
    })
    if (e) {
      console.log(e);
    }
  };
  
  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      {user.map(
        ({ id, first_name, last_name, email, username, Posts, image_url }) => (
          <div key={id}>
            <Button
              variant="primary"
              style={{ width: "20rem", margin: "1rem" }}
              onClick={() => {
                window.location.pathname = "/edit";
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="primary"
              style={{ width: "20rem", margin: "1rem" }}
              onClick={() => {
                delUser(uid);
                window.location.pathname="/login";
              }}
            >
              Delete Account
            </Button>
            <div className="m-5">
              <div>
                <img
                  src={image_url}
                  style={{
                    width: "15rem",
                    height: "15rem",
                    borderRadius: "10rem",
                  }}
                ></img>
              </div>
              <div style={{ padding: "2rem" }}>
                <h4>First Name: {first_name}</h4>
                <h4>Last Name: {last_name}</h4>
                <h4>Email: {email}</h4>
                <h4>Username: {username}</h4>
              </div>
            </div>
            <div style={{ marginLeft: "22rem", width: "60%" }}>
              <h3>{first_name}'s Blog Posts</h3>

              {Posts.map(({content,id,created_at}) => (
                <Card style={{ margin: "4rem" }}>
                  <Card.Header>
                    <div className="d-flex">
                      <Card.Img
                        src={image_url}
                        style={{
                          width: "5rem",
                          height: "5rem",
                          marginRight: "1rem",
                          borderRadius: "5rem",
                        }}
                      />
                      <Card.Title style={{ marginTop: "1.3rem" }}>
                        {username}
                      </Card.Title>
                      <Dropdown style={{ left: "70%" }}>
                        <Dropdown.Toggle
                          variant="primary"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              navigate("/edit");
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => {
                              delPost(id);
                              window.location.reload();
                              console.log(id)
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={{ fontSize: "1.8rem" }}>
                      {content}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ fontSize: "0.8rem" }}>
                    created {created_at}
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Profile