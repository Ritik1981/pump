import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const { isLoggedIn } = useContext(AppContext);
  const [detailsPosted, setDetailsPosted] = useState(false);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [selected, setSelected] = useState(false);

  function handleSelect(item) {
    setProduct(item);
  }

  async function handleSubmit() {
    //e.preventDefault(); // Prevent the default form submission
    setClicked(true);
    await axios
      .post("http://localhost:8000/items/updatePrice", {
        product,
        price,
      })
      .then((res) => {
        setDetailsPosted(true);
      })
      .catch((err) => {
        console.log("Error Posting Details...:", err);
      });
  }

  return (
    <div className="admin-container">
      {isLoggedIn ? (
        <div>
          {selected ? (
            <div>
              {!clicked ? (
                <form className="admin-form">
                  <h2 className="admin-title">Update Product Price:</h2>
                  <div className="form-group">
                    <label htmlFor="price-input" className="form-label">
                      Product Price:
                    </label>
                    <input
                      id="price-input"
                      type="number"
                      value={price}
                      className="form-input"
                      onChange={(e) => setPrice(e.target.value)}
                    />{" "}
                    <br />
                    <button
                      id="submit-button"
                      type="submit"
                      onClick={handleSubmit}
                      className="submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  {detailsPosted ? (
                    <div className="admin-message success-message">
                      <h3>Details Successfully Updated...</h3>
                      <button
                        id="next-button"
                        className="next-button"
                        onClick={() => navigate("/")}
                      >
                        Next
                      </button>
                    </div>
                  ) : (
                    <div className="admin-message error-message">
                      <h3>
                        Error: Details not updated!!! You are not an Admin
                      </h3>
                      <button
                        className="home-button"
                        id="home-button"
                        onClick={() => navigate("/")}
                      >
                        Home
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="admin-title">Choose Product:</h2>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="product"
                    onChange={() => handleSelect("Diesel")}
                    className="radio-input"
                  />
                  Diesel
                </label>
                <label>
                  <input
                    type="radio"
                    name="product"
                    className="radio-input"
                    onChange={() => handleSelect("Petrol")}
                  />
                  Petrol
                </label>
              </div>{" "}
              <br />
              <button className="next-button" onClick={() => setSelected(true)}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            id="login-button"
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;

/* detailsPosted ? (
        <div>
          <h3>Details Successfully Updated...</h3>
          <button onClick={() => navigate("/")}>Next</button>
        </div>
      ) : (
        <div>
          <h3>Your are not an Admin...</h3>
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      ){" "}
      </div> */
//   :{" "}

// {isLoggedIn ? (
//         <div className="admin-form">
//           {!clicked ? (
//             <form action="" onSubmit={(e) => handleSubmit}>
//               <h2>Update Product Price:</h2>
//               <div className="form-group">
//                 <label htmlFor="Diesel">
//                   Petrol Price:
//                   <input
//                     id="price-input"
//                     type="number"
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </label>{" "}
//                 <br />
//                 <button
//                   id="submit-button"
//                   type="submit"
//                   onClick={() => setClicked(true)}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div>
//               {detailsPosted ? (
//                 <div className="admin-message">
//                   <h3>Details Successfully Updated...</h3>
//                   <button id="submit-button" onClick={() => navigate("/")}>
//                     Next
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <h3>You are not an Admin...</h3>
//                   <button id="submit-button" onClick={() => navigate("/")}>
//                     Home
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="admin-message">
//           <button id="submit-button" onClick={() => navigate("/login")}>
//             Login
//           </button>
//         </div>
//       )}
