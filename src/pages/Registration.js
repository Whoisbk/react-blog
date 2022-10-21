import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from 'react';
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");


  const auth = getAuth();

  const [insert_Users,{error}] = useMutation(CREATE_USER_MUTATION)
  let navigate = useNavigate();
  const signUp = () => {

    createUserWithEmailAndPassword(auth, emailInput, passInput)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user created");
        insert_Users({
          variables:{
            first_name: firstName,
            last_name: lastName,
            email: emailInput,
            username: userName
          }
        })
        navigate("/login")
        if (error) {
          console.log(error)
          navigate("/registraion");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        navigate("/registraion");
        // ..
      });
  };
  return (
    <div className="d-flex justify-content-center aligin-items-center">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.{emailInput}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter UserName"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassInput(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassInput(e.target.value);
            }}
          />
        </Form.Group>

        {passInput}

        <Button variant="primary" onClick={signUp}>
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default Registration