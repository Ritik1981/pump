import React, { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";
export const ItemContext = createContext();
import { AppContext } from "../App";

const FuelSection = () => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);

  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/items/getdetails")
      .then((res) => {
        // console.log(res.data.data);
        setItemData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Item details...: ", err);
      });
  }, []);

  function handlePetrolClick() {
    if (isLoggedIn) {
      setClicked(true); // ensure to make it false after successful order
      navigate("/items/buy-petrol");
    } else {
      navigate("/login");
    }
  }
  function handleDieselClick() {
    if (isLoggedIn) {
      setClicked(true); // ensure to make it false after successful order
      navigate("/items/buy-diesel");
    } else {
      navigate("/login");
    }
  }

  function handleQuantity(e) {
    if (e.target.value > 1) {
      setQuantity(e.target.value);
    }
  }

  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subHeading: {
      fontSize: "18px",
      fontStyle: "italic",
      marginBottom: "20px",
    },
    description: {
      fontSize: "16px",
      marginBottom: "30px",
    },
    button: {
      backgroundColor: "white",
      color: "black",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      margin: "0 10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "70px",
      marginRight: "10px",
      marginTop: "10px",
    },
    orderButton: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "5px 10px",
      border: "none",
      borderRadius: "5px",
      marginLeft: "10px",
      cursor: "pointer",
    },
  };
  return (
    <ItemContext.Provider value={{ itemData, quantity }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => navigate("/items")}>
            <img
              src="https://epotos.com/wp-content/uploads/2017/08/Gas-stations-1.jpg"
              alt="Logo"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
              }}
            />
          </button>
          <input
            type="text"
            placeholder="Search Lubricants..."
            onKeyDown={() => navigate("/")}
            style={{
              width: "150px",
              marginRight: "10px",
              borderRadius: "6px",
              height: "23px",
            }}
          />
          <button style={{ background: "white" }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/337/677/non_2x/transparent-search-icon-free-png.png"
              alt="Search-Bar"
              onClick={() => navigate("/")}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "4px",
              }}
            />
          </button>

          <button
            style={{ marginLeft: "760px", background: "white" }}
            onClick={() => navigate("/orders")}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/442/152/original/vector-add-to-cart-vector-icon.jpg"
              alt="Cart-Image"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
              }}
            />
          </button>

          <button
            style={{ background: "white" }}
            onClick={() => navigate("/profile")}
          >
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
              alt="Profile-Image"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
              }}
            />
          </button>
        </div>
        <div style={styles.container}>
          <h2 style={styles.heading}>Welcome to Fuel Section...</h2>
          <h3 style={styles.subHeading}>
            Your Pit Stop for Premium Performance.
          </h3>
          <p style={styles.description}>
            Fuel your journey with convenience, quality, and care. At our petrol
            pump, every stop is a step towards a smoother ride.
          </p>
          {!clicked && (
            <div>
              <button style={styles.button}>
                <img
                  src="https://thumbs.dreamstime.com/z/petrol-station-icon-symbol-benzine-fuel-petrol-station-icon-symbol-benzine-fuel-idea-transportation-isolated-156003738.jpg"
                  alt="Petrol-Section"
                  style={styles.icon}
                />
                PETROL: &#8377;
                {loading ? <h2>Loading...</h2> : itemData[0].price}
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={handleQuantity}
                  style={{
                    marginLeft: "10px",
                    width: "40px",
                    height: "15px",
                    borderRadius: "4px",
                  }}
                />
                <button style={styles.orderButton} onClick={handlePetrolClick}>
                  Order
                </button>
              </button>
              <button style={styles.button}>
                <img
                  src="https://thumbs.dreamstime.com/z/petrol-station-icon-symbol-benzine-fuel-petrol-station-icon-symbol-benzine-fuel-idea-transportation-isolated-156003738.jpg"
                  alt="Diesel-Section"
                  style={styles.icon}
                />
                DIESEL: &#8377;
                {loading ? <h2>Loading...</h2> : itemData[1].price}
                <input
                  type="number"
                  placeholder="Quantity"
                  onClick={(e) => handleQuantity}
                  style={{
                    marginLeft: "14px",
                    width: "40px",
                    height: "15px",
                    borderRadius: "4px",
                  }}
                />
                <button style={styles.orderButton} onClick={handleDieselClick}>
                  Order
                </button>
              </button>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </ItemContext.Provider>
  );
};

export default FuelSection;
