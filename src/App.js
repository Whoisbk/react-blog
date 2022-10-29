import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Registration from "./pages/Registration";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useQuery, gql } from "@apollo/client";
import EditPage from "./pages/EditPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsAuth(false);
        localStorage.clear();
        window.location.pathname = "/react-blog/login";
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Router>
      <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand href="/">BLOGGER</Navbar.Brand>
          <Nav className="me-auto">
            {localStorage.getItem("user") ? (
              <>
                <Nav.Link href="/react-blog/">Home</Nav.Link>
                <Nav.Link href="/react-blog/profile">Profile</Nav.Link>
                <Nav.Link onClick={signUserOut}>SignOut</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/react-blog/login">Home</Nav.Link>
                <Nav.Link href="/react-blog/login">Signin</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/react-blog/" element={<Home />} />
        <Route
          path="/react-blog/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
        <Route path="/react-blog/profile" element={<Profile />} />
        <Route path="/react-blog/createpost" element={<CreatePost />} />
        <Route path="/react-blog/registration" element={<Registration />} />
        <Route path="/react-blog/edit" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
