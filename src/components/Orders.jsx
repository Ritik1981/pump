import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App.jsx";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/getorders")
      .then((res) => {
        setOrders(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching orders: ", err);
      });
  }, []);

  return (
    <div className="orders-container">
      <div>
        {isLoggedIn ? (
          <div>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              orders.map((order) => (
                <div className="order-item">
                  <img
                    src="https://thumbs.dreamstime.com/z/petrol-station-icon-symbol-benzine-fuel-petrol-station-icon-symbol-benzine-fuel-idea-transportation-isolated-156003738.jpg"
                    alt="Ordered-Item"
                    className="order-image"
                  />
                  <div className="order-details">
                    <h4>{order.product}</h4>
                    <h4>{order.quantity} - Litre</h4>
                    <h6>{new Date(order.createdAt).toLocaleString()}</h6>
                  </div>
                </div>
              ))
            )}
            <button className="home-button" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
