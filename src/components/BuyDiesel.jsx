import React, { useState, useContext, useEffect } from "react";
import { ItemContext } from "./Items";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import "./Items.css";

function BuyDiesel() {
  const navigate = useNavigate();

  const { itemData, quantity } = useContext(ItemContext);
  const [nextClicked, setNextClicked] = useState(false);
  const [userData, setUserData] = useState();
  const [anotherNextClick, setAnotherNextClick] = useState(false);

  const price = itemData[1] * quantity;
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/getuserdetails")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  function handleNextClick() {
    setNextClicked((prevState) => {
      return !prevState;
    });
  }
  function anotherNext() {
    setAnotherNextClick(true);
    navigate("/items/buy-diesel/payment");
  }

  return (
    <div className="buy-petrol-container">
      {!nextClicked ? (
        <div>
          <h3>Price Details:</h3>
          <p>Delivery Charge: &#8377;40</p>
          <p>
            Item Price: &#8377;
            {
              // js expression to multiply price and quantity
              itemData[1].price * quantity
            }
          </p>
          <p>Total Price: &#8377;{itemData[1].price * quantity + 40}</p>
          <button onClick={handleNextClick}>Next</button>
        </div>
      ) : (
        !anotherNextClick && (
          <div>
            <h2>Confirm Details:</h2>
            <p>Name: {userData.fullName}</p>
            <p>Contact: {userData.contact}</p>
            <p>Address: {userData.address}</p>
            <button onClick={anotherNext}>Next</button>
          </div>
        )
      )}
      <Outlet />
    </div>
  );
}

export default BuyDiesel;
