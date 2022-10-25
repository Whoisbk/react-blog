import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from 'react';
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getStorage  ,ref, uploadBytes,getDownloadURL} from "firebase/storage";
import { uuidv4 } from '@firebase/util';

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [imageInput, setImageInput] = useState(
    ""
  );
  

  const storage = getStorage();
 
  const auth = getAuth();

  const [insert_Users, { error }] = useMutation(CREATE_USER_MUTATION)
  
  let navigate = useNavigate();

  const signUp = () => {
    if (passInput !== passInput) {
      alert("password don't match")
      navigate("/registration")
    } else if (firstName.length < 3){
      alert("username is too short");   
      navigate("/registration");
    } else if (firstName === "") {
      alert("enter first name");
      navigate("/registration");
    } else if (lastName === "") {
      alert("enter last name");
      navigate("/registration");
    } else if (emailInput === "") {
      alert("please enter email");
      navigate("/registration");
    } else {
      createUserWithEmailAndPassword(auth, emailInput, passInput)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          
          navigate("/login");
          if (error) {
            console.log(error);
            navigate("/registration");
          }
          const imageRef = ref(storage, `images/${imageInput.name}`);
          uploadBytes(imageRef, imageInput)
            .then(() => {
              getDownloadURL(imageRef)
                .then((url) => {
                  setImageInput(url)
                  console.log(url)
                  insert_Users({
                    variables: {
                      first_name: firstName,
                      last_name: lastName,
                      email: emailInput,
                      username: userName,
                      id: user.uid,
                      image_url: url,
                    },
                  });
                });
            console.log("uplaoded");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          navigate("/registration");
          // ..
        });
    }
    
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Upload Profile Pic</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setImageInput(e.target.files[0]);
            }}
          />
        </Form.Group>

        <Button variant="primary" onClick={signUp}>
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default Registration