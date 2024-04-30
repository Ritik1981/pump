import axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  const [contact, setContact] = useState(0);
  const [password, setPassword] = useState("");

  const setAccessToken = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users/login", {
        contact,
        password,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setAccessToken(res.data.data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error Logging-In...: ", err);
      });
  }
  function handleRegister() {
    navigate("/register");
  }
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        width: "300px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Login To Continue:</h3>
      <form onSubmit={handleLogin}>
        <input
          type="tel"
          placeholder="Enter Phone..."
          autoComplete="off"
          onChange={(e) => setContact(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password..."
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        New User:{" "}
        <button
          onClick={handleRegister}
          style={{
            backgroundColor: "transparent",
            color: "#007bff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
