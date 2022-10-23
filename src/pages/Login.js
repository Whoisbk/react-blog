import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login(props) {
  const [textInput, setTextInput] = useState("")
  const [passInput, setPassInput] = useState("");
  const [uid, setUid] = useState("");
  let navigate = useNavigate()
  
  const auth = getAuth();

  const signIn = () => {
    signInWithEmailAndPassword(auth, textInput, passInput)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(auth.currentUser.uid)
        props.setIsAuth(true)
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        navigate("/login");
      });
  } 
  
  return (
    <div className="d-flex justify-content-center aligin-items-center">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.{textInput}
          </Form.Text>
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
        {passInput}

        <Button className="m-2" variant="secondary" onClick={signIn}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login