import React, { useState } from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getAuth } from 'firebase/auth';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../GraphQL/Mutations';
import { useEffect } from 'react';

function CreatePost() {

  const [uid, setUid] = useState([]);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user"));
    if (uid) {
      setUid(uid);
    }
  }, []);

  const [insert_Posts, { error }] = useMutation(CREATE_POST)
  
  const [content, setContent] = useState("")
  let navigate = useNavigate();
  
  const create_post = (id) => {

    if (content === "") {
      alert("Please enter some text")
      navigate("/createpost")
    } else {
      insert_Posts({
        variables: {
          content: content,
          user_id: id,
        },
      });
      navigate("/")
      window.location.reload()
    }
    if (error) {
      navigate('/createpost')
      console.log('error')
    }
  }
  return (
    <div className="d-flex justify-content-center aligin-items-center">
      <div>
        <form>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Post"
            onChange={(e) => setContent(e.target.value)}
          >
            <Form.Control
              as="textarea"
              placeholder="Write Post here"
              style={{ height: "10rem", marginTop: "10rem", width: "30rem" }}
            />
          </FloatingLabel>

          <Button
            style={{ marginLeft: "20rem", width: "28rem" }}
            className="m-2"
            variant="primary"
            onClick={() => {
              create_post(uid);
            }}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost