import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { createContext } from "react";
import Profile from "./components/Profile";
import FuelSection from "./components/Items";
import BuyPetrol from "./components/BuyPetrol";
import Payment from "./components/Payment";
import Gateway from "./components/Gateway";
import PaymentSuccess from "./components/paymentSuccess";
import BuyDiesel from "./components/BuyDiesel";
import Orders from "./components/Orders";
import Lubricants from "./components/Lubricants";
import Admin from "./components/Admin";

export const AppContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // navbar should be here
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={<FuelSection />}>
          <Route path="buy-petrol" element={<BuyPetrol />}>
            <Route path="payment" element={<Payment />}>
              <Route path="payment-gateway" element={<Gateway />} />
            </Route>
          </Route>
          <Route path="buy-diesel" element={<BuyDiesel />}>
            <Route path="payment" element={<Payment />}>
              <Route path="payment-gateway" element={<Gateway />} />
            </Route>
          </Route>
        </Route>
        <Route path="paymentsuccess/:refrenceID" element={<PaymentSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/lubricants/:searchedLubricant" element={<Lubricants />} />
        <Route path="/:lubricantID/payment" element={<Payment />} />
        <Route path="/:lubricantId/payment-gateway" element={<Gateway />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
