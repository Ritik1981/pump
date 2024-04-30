import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Lubricants.css";
import { AppContext } from "../App";

const Lubricants = () => {
  const params = useParams();
  const text = params.searchedLubricant;
  const [loading, setLoading] = useState(true);
  const [searchedText, setSearchedText] = useState("");
  const [matchedLubricants, setMatchedLubricants] = useState();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const [selectedLubricant, setSelectedLubricant] = useState();

  useEffect(() => {
    // console.log(typeof text);
    axios
      .post("http://localhost:8000/lubricants/searchedLubricants", {
        text,
      })
      .then((res) => {
        setMatchedLubricants(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Lubricants...:", err);
      });
  }, []);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  function handleSearch() {
    navigate(`/lubricants/${searchedText}`); // make it dynamic route
    setSearchedText("");
  }
  function handleOrder(ID) {
    if (isLoggedIn) {
      navigate(`/${ID}/payment`);
    } else {
      navigate("/login");
    }
  }

  return (
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
          onChange={(e) => setSearchedText(e.target.value)}
          onKeyDown={handleKeyPress}
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
            onClick={handleSearch}
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
      <div className="lubricant-list">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          matchedLubricants.map((lubricant) => (
            <div className="lubricant" key={lubricant._id}>
              <img
                src={lubricant.image}
                alt="Lubricant"
                className="lubricant-image"
              />
              <h4 className="lubricant-name">{lubricant.name}</h4>
              <h6 className="lubricant-price">&#8377; {lubricant.price}</h6>
              <button
                className="order-button"
                onClick={() => handleOrder(lubricant._id)}
              >
                ORDER
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lubricants;
