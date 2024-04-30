import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/getuserdetails")
      .then((res) => {
        setUserData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching User Details: ", err);
      });
  }, []);

  return (
    <div className="profile-container">
      {isLoggedIn ? (
        <div>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              <h2>Welcome, {userData.fullName}</h2>
              <div className="user-info">
                <p>
                  <strong>Name:</strong> {userData.fullName}
                </p>
                <p>
                  <strong>Contact:</strong> {userData.contact}
                </p>
                <p>
                  <strong>Address:</strong> {userData.address}
                </p>
              </div>
              <div className="profile-buttons">
                <button onClick={() => navigate("/orders")}>My Orders</button>
                <Logout />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Login or Register to Discover more...</h2>
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <br />
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
