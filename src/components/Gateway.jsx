import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ItemContext } from "./Items";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Gateway.css";

const Gateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  let itemData1, quantity1;
  if (
    location.pathname === "/items/buy-petrol/payment/payment-gateway" ||
    location.pathname === "/items/buy-diesel/payment/payment-gateway"
  ) {
    const { itemData, quantity } = useContext(ItemContext);
    (itemData1 = itemData), (quantity1 = quantity);
  }

  const checkout = async (data, quantity) => {
    // console.log(data[0]);
    // console.log(data[1]);
    // console.log(location.pathname);
    const lubricantID = params.lubricantId;
    let amount;
    let product;
    if (location.pathname === "/items/buy-petrol/payment/payment-gateway") {
      amount = data[0].price * quantity + 40;
      product = data[0].name;
    } else if (
      location.pathname === "/items/buy-diesel/payment/payment-gateway"
    ) {
      amount = data[1].price * quantity + 40;
      product = data[1].name;
    } else {
      await axios
        .get(`http://localhost:8000/lubricants/lubricant/${lubricantID}`)
        .then((res) => {
          amount = res.data.data.price;
          product = res.data.data.name;
          quantity = 1;
        }); // work pending here
    }

    const response = await axios.post("http://localhost:8000/api/checkout", {
      amount,
      product,
      quantity,
    });

    const order = response.data.data;
    // console.log(order);

    const options = {
      key: "rzp_test_3P2vvfMhcYsSzc", // make a post request to backend to get it
      amount: order.amount,
      currency: "INR",
      name: "Shishodia Service Station",
      description: "Test Transaction",
      image: "https://epotos.com/wp-content/uploads/2017/08/Gas-stations-1.jpg",
      order_id: order.id,
      callback_url: "http://localhost:8000/api/validatepayment",
      prefill: {
        name: "Ritik Kumar Singh",
        email: "ritik@2003singhsihsodia@gmail.com",
        contact: "8409297949",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    // rzp1.open();
    // making chnaGES from here
    rzp1.open();
    navigate("/orders");
  };

  function handleClick() {
    if (
      location.pathname === "/items/buy-petrol/payment/payment-gateway" ||
      location.pathname === "/items/buy-diesel/payment/payment-gateway"
    ) {
      checkout(itemData1, quantity1);
    } else {
      checkout({}, 1);
    }
  }
  return (
    <div className="gateway-container">
      <h2 style={{ fontFamily: "sofia" }}>
        Pay via UPI, Credit/Debit Cards, or PayTM Wallet...
      </h2>
      <button className="pay-button" onClick={handleClick}>
        Pay
      </button>
    </div>
  );
};

export default Gateway;
