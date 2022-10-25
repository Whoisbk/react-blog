import React from 'react'
import { USER_PROFILE } from "../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UPDATE_USER } from '../GraphQL/Mutations';


function EditPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [user, setUser] = useState([])
    const [uid, setUid] = useState([]);
    const { loading, error, data } = useQuery(USER_PROFILE, {
        variables: {
            id: uid,
        },
    });
    
    const [update_Users, { e }] = useMutation(UPDATE_USER)  
    
    const edit = (id) => {
        update_Users({
            variables: {
                 first_name: firstName,
                last_name: lastName, 
                username: userName,
                id:id
            }
        })
        if (e) {
            console.log(e);
        }
        
    }
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
      {user.map(({ id, first_name, last_name, username}) => (
        <div key={id}>
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
                    setLastName(e.target.value);
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

              <Button variant="primary" onClick={edit}>
                Create Account
              </Button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditPage