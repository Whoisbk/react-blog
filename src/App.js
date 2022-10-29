import './App.css';
import {
  HashRouter as Router,
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
import EditPage from './pages/EditPage';

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
      <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand href="/">BLOGGER</Navbar.Brand>
          <Nav className="me-auto">
            {localStorage.getItem("user") ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={signUserOut}>SignOut</Nav.Link>
              </>
            ) : (
                <>
                <Nav.Link href="/login">Home</Nav.Link>
                <Nav.Link href="/login">Signin</Nav.Link>
              </>
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
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
