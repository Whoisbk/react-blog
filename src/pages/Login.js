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
         
        props.setIsAuth(true)
        localStorage.setItem("user", JSON.stringify(user.uid))
        alert("successful login")
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode)
        if (errorCode === "auth/user-not-found") {
          alert("User Does not Exist");
          navigate("/login");
        } else if (errorCode === "auth/invalid-email") {
          alert("Incorrect Email");
          navigate("/login");
        } else if (errorCode === "auth/wrong-password") {
          alert("Wrong Password");
          navigate("/login");
        }
          
      
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
       

        <Button className="m-2" variant="secondary" onClick={signIn}>
          Login
        </Button>
        <br></br>
        <Button className="m-2" variant="secondary" onClick={() => { navigate("/registration") }}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Login