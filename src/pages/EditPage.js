import React from 'react'
import { USER_PROFILE } from "../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UPDATE_USER } from '../GraphQL/Mutations';
import Spinner from "react-bootstrap/Spinner";
import { Navigate, useNavigate } from 'react-router-dom';


function EditPage() {
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [uid, setUid] = useState([]);
  

 const { data,e } = useQuery(USER_PROFILE, {
   variables: {
     id: uid,
   },
   if(e) {
     console(e)
   }
 });
    
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user"));
    if (uid) {
      setUid(uid);
      console.log(uid)
    }
    if (data) {
      setUser(data.Users);
      console.log(data.Users[0].first_name)
    }
  }, [uid,data]);
  let naviaget = useNavigate()
  const [update_Users, { error, loading}] = useMutation(UPDATE_USER);  

  const edit = (id) => {
    
    if (firstName == "") {
      console.log(firstName)
      setFirstName(data.Users[0].first_name);
    } else if (lastName === "") {
      setLastName(data.Users[0].last_name);
    } else if (userName === "") {
      setLastName(data.Users[0].username);
    } else {
      console.log(firstName);
      update_Users({
        variables: {
          first_name: firstName,
          last_name: lastName,
          username: userName,
          id: id,
        },
      });
      alert("update complete");
      naviaget("/profile");
      window.location.reload()
    }
  
  }
    
  return (
    <div>
    
        <div className="d-flex justify-content-center aligin-items-center">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                onChange={(e) => {
                    setLastName(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter UserName"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="m-5" style={{ textAlign: "center" }}>
          <Button
            className="m-2"
            onClick={() => {
              edit(uid);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              window.location.pathname = "/profile";
            }}
          >
            Go back
          </Button>
        </div>
    </div>
  );
}

export default EditPage