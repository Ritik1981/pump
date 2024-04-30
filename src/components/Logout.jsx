import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  function handleLogout() {
    axios
      .delete("http://localhost:8000/users/logout")
      .then((res) => {
        console.log("Logged-Out Successfully...");
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error Logging-Out: ", err);
      });
  }
  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
}

export default Logout;
