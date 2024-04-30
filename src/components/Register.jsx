import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullAddress, setFullAddress] = useState({
    House_No: "",
    Street: "",
    City: "",
    PostalCode: "",
    State: "",
  });

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState(0);
  const [password, setPassword] = useState("");

  function handleAddressInput(e) {
    const { name, value } = e.target;
    setFullAddress((prevAddress) => {
      return {
        ...prevAddress,
        [name]: value, // [] is used to dynamically set the key of an object in react
      };
    });
  }

  function handleRegister(e) {
    e.preventDefault();
    const address = `${fullAddress.House_No}, ${fullAddress.Street}, ${fullAddress.City}, ${fullAddress.PostalCode}, ${fullAddress.State}`;
    console.log(address);
    axios
      .post("http://localhost:8000/users/register", {
        fullName,
        contact,
        address,
        password,
      })
      .then((res) => {
        // console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error Sending registration data: ", err);
      });
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
      <h3>Welcome To Shishodians...</h3> <hr />
      <h4>Register To Discover More...</h4> <hr />
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter Your Name..."
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="tel"
          placeholder="Enter Your Phone..."
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter House-No..."
          name="House_No"
          value={fullAddress.House_No}
          onChange={handleAddressInput}
          required
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Street..."
          name="Street"
          value={fullAddress.Street}
          onChange={handleAddressInput}
          required
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter City..."
          name="City"
          value={fullAddress.City}
          onChange={handleAddressInput}
          required
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter PostalCode..."
          name="PostalCode"
          value={fullAddress.PostalCode}
          onChange={handleAddressInput}
          required
          style={{
            width: "93%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter State..."
          name="State"
          value={fullAddress.State}
          onChange={handleAddressInput}
          required
          style={{
            width: "93%",
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
          Submit
        </button>
      </form>
      <button onClick={navigate("/hello")}>Next</button>
    </div>
  );
}

export default Register;
