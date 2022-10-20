import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from 'react';

function Registration() {
  const [textInput, setTextInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const auth = getAuth();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, emailInput, passInput)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user created");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
              setTextInput(e.target.value);
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