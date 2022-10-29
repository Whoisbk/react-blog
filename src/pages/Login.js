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
    <div className="d-flex justify-content-center aligin-items-center mt-5"
    style={{padding:"2rem",border:"1px solid gray",width:"25rem",marginLeft:"30rem"}}>
      <Form>
        <h1>LOGIN</h1>
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
            We'll never share your email with anyone else
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
       

        <Button style={{width:"20rem"}} className="m-2" variant="primary" onClick={signIn}>
          Login
        </Button>
        <br></br>
        Don't have an Account yet?create one <a href="/registration">Here</a>

      </Form>
    </div>
  );
}

export default Login