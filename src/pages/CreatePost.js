import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function CreatePost() {

  let navigate = useNavigate()
  return (
    <div className="d-flex justify-content-center aligin-items-center">
      <div>
        <FloatingLabel controlId="floatingTextarea" label="Post">
          <Form.Control
            as="textarea"
            placeholder="Write Post here"
            style={{ height: "10rem", marginTop: "10rem", width: "30rem" }}
          />
        </FloatingLabel>

        <Button
          className="m-2"
          variant="secondary"
          onClick={() => {
            navigate("/");
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default CreatePost