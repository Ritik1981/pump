import React from "react";
import { useParams } from "react-router-dom";

function PaymentSuccess() {
  const params = useParams();

  return (
    <div>
      {alert("Payment Successful")}
      <div>
        Payment Reference ID:
        {params.refrenceID}
      </div>
      <button onClick={() => navigate("/orders")}>Order</button>
    </div>
  );
}

export default PaymentSuccess;
