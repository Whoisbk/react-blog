import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Registration from './pages/Registration';
import { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useQuery, gql } from "@apollo/client";

function App() {
  const [isAuth,setIsAuth] = useState(false)
  
  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsAuth(false)
        localStorage.clear()
        window.location.pathname = "/login"
      })
      .catch((error) => {
        // An error happened.
      });
  }
 
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>

            {!localStorage.getItem("user") ? (
              <Nav.Link href="/login">Signin</Nav.Link>
            ) : (
              <Nav.Link onClick={signUserOut}>SignOut</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
