import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageSrc1 from "../assets/1.jpeg";
import imageSrc2 from "../assets/2.jpeg";
import imageSrc3 from "../assets/3.jpeg";

function Home() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [imageSrc2, imageSrc3, imageSrc1];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // 1%3 = 1
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Logic for lubricants searching...

  const [searchedText, setSearchedText] = useState("");

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  function handleSearch() {
    navigate(`/lubricants/${searchedText}`); // make it dynamic route
    setSearchedText("");
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

      <h2>Welcome To Shishodia Service Station</h2>
      <p>Your Gateway to Fueling Excellence...</p>
      <div
        style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Pump-Picture-${index}`}
            style={{
              display: index === currentImage ? "block" : "none",
              width: "1240px",
              height: "450px",
            }}
          />
        ))}
      </div>
      <div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginTop: "50px",
          }}
        >
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
            Our Services:
          </h2>
          <ul
            style={{ listStyleType: "none", padding: "0", marginTop: "20px" }}
          >
            <li
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "8px",
                fontFamily: "sofia",
              }}
            >
              24/7 hrs open
            </li>
            <li
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "8px",
                fontFamily: "sofia",
              }}
            >
              Filtered drinking water
            </li>
            <li
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "8px",
                fontFamily: "sofia",
              }}
            >
              Free Air facility
            </li>
            <li
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "8px",
                fontFamily: "sofia",
              }}
            >
              Product sample test available
            </li>
            <li
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "0",
                fontFamily: "sofia",
              }}
            >
              Available various payment methods such as cash, debit/credit
              cards, and other UPI apps
            </li>
          </ul>
        </div>
        <p style={{ marginLeft: "-1115px", fontFamily: "sofia" }}>
          To Login:{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Click Here
          </Link>
        </p>
        <p style={{ marginLeft: "-1005px", fontFamily: "sofia" }}>
          To Create a new account:{" "}
          <Link to="/register" style={{ textDecoration: "underline" }}>
            Click Here
          </Link>
        </p>
        <p style={{ marginLeft: "-1010px", fontFamily: "sofia" }}>
          To know more about us:{" "}
          <Link to="/about" style={{ textDecoration: "underline" }}>
            Click Here
          </Link>
        </p>
        <p style={{ marginLeft: "-1080px", fontFamily: "sofia" }}>
          To Contact us:{" "}
          <Link to="/contact" style={{ textDecoration: "underline" }}>
            Click Here
          </Link>
        </p>
        <p style={{ marginLeft: "-1080px", fontFamily: "sofia" }}>
          Admin Section:{" "}
          <Link to="/admin" style={{ textDecoration: "underline" }}>
            Click Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
