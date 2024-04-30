import React, { useState, useContext, createContext } from "react";
import { useNavigate, Outlet, useLocation, useParams } from "react-router-dom";
import "./Payment.css";
import axios from "axios";
import { ItemContext } from "./Items";

function Payment() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let itemData1, quantity1;
  if (
    location.pathname === "/items/buy-petrol/payment" ||
    location.pathname === "/items/buy-diesel/payment"
  ) {
    const { itemData, quantity } = useContext(ItemContext);
    itemData1 = itemData;
    quantity1 = quantity;
  }

  const params = useParams();

  const [clicked, setClicked] = useState(false);

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  async function handleClick() {
    // console.log(params.lubricantID);
    const lubricantId = params.lubricantID;
    setClicked(true);
    if (selectedPayment === "Pay Online") {
      if (location.pathname === "/items/buy-petrol/payment") {
        navigate("/items/buy-petrol/payment/payment-gateway"); // change route accordingly.
      } else if (location.pathname === "/items/buy-diesel/payment") {
        navigate("/items/buy-diesel/payment/payment-gateway"); // change route accordingly.
      } else {
        navigate(`/${lubricantId}/payment-gateway`);
      }
    } else {
      if (location.pathname === "/items/buy-petrol/payment") {
        await axios
          .post("http://localhost:8000/items/order", {
            product: itemData1[0].name,
            price: itemData1[0].price,
            quantity1,
          })
          .then((res) => {
            navigate("/orders");
          })
          .catch((err) => {
            console.log("Error Ordering...: ", err);
          });
      } else if (location.pathname === "/items/buy-diesel/payment") {
        await axios
          .post("http://localhost:8000/items/order", {
            product: itemData1[1].name,
            price: itemData1[1].price,
            quantity1,
          })
          .then((res) => {
            navigate("/orders");
          })
          .catch((err) => {
            console.log("Error Ordering...: ", err);
          });
      } else {
        const response = await axios.get(
          `http://localhost:8000/lubricants/lubricant/${params.lubricantID}`
        );
        const lubricantData = response.data.data;
        await axios
          .post("http://localhost:8000/items/order", {
            product: lubricantData.name,
            quantity1: 1,
            price: lubricantData.price,
          })
          .then((res) => {
            navigate("/orders");
            console.log("Item Ordered");
          })
          .catch((err) => {
            console.log("Error Ordering: ", err);
          });
      }
    }
  }

  return (
    <div className="payment-container">
      {!clicked && (
        <div>
          <h2>Choose Payment Method:</h2>
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                onChange={() => handlePaymentSelect("Pay Online")}
              />
              Pay Online
            </label>
          </div>
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                onChange={() => handlePaymentSelect("Pay on Delivery")}
              />
              Pay on Delivery
            </label>
          </div>
          <button className="payment-button" onClick={handleClick}>
            Next
          </button>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Payment;
