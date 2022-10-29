import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useQuery, gql ,useMutation} from "@apollo/client";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { GET_POSTS } from "../GraphQL/Queries";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { DELETE_POST } from "../GraphQL/Mutations";

function Home() {
  const auth = getAuth();
  const [uid, setUid] = useState([]);
  const currentU = localStorage.getItem("user");
  const [getPosts, setGetPosts] = useState([]);
  console.log(currentU);
  const { loading, error, data } = useQuery(GET_POSTS);
  const [delete_Posts, { e }] = useMutation(DELETE_POST);
 
  useEffect(() => {
    localStorage.setItem("uid", JSON.stringify(currentU));
    if (data) {
      setGetPosts(data.Posts);
      console.log(data.Posts);
    }
  }, [uid, data]);

   const delPost = (id) => {
     console.log(id);

     delete_Posts({
       variables: {
         id: id,
       },
     });
     if (e) {
       console.log(e);
     }
   };
  let navigate = useNavigate();

  return (
    <div>
      <Button
        variant="primary"
        style={{
          width: "40rem",
          marginTop: "3rem",
          marginLeft: "22rem",
          textAlign: "center",
        }}
        onClick={() => {
          navigate("/react-blog/createpost");
        }}
      >
        Create Post
      </Button>
      {getPosts.map(({ id, content, created_at, User }) => (
        <div key={id}>
          <Card style={{ width: "40rem", margin: "5rem", left: "20%" }}>
            <Card.Header>
              <div className="d-flex">
                <Card.Img
                  src={User.image_url}
                  style={{
                    width: "5rem",
                    height: "5rem",
                    marginRight: "2rem",
                    borderRadius: "5rem",
                  }}
                />
                <Card.Title style={{marginTop:"2rem"}}>{User.username}</Card.Title>
                <Dropdown style={{ left: "70%" }}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    {JSON.stringify(User.id) === currentU ? (
                      <Dropdown.Item
                        onClick={(e) => {
                          delPost(id);
                          window.location.reload();
                          console.log(id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{content}</Card.Text>
            </Card.Body>
            <Card.Footer as="h10">created {created_at}</Card.Footer>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Home;
