import React from 'react'
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
function Home() {

  let navigate = useNavigate()

  return (
    <div>
      <Button className="m-2" variant="secondary" onClick={()=>{navigate("/createpost")}}>
        Start A Post
      </Button>
    </div>
  );
}

export default Home