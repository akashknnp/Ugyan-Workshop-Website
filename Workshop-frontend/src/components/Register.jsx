import React, { useState } from "react";
import "../Register.css";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/pay/save-details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone_number: phoneNumber,
      }),
    });

    // const data = await response.json();
    // const data = response.json();
    // console.log("order:",data)
    if (response.ok) {
      const data = await response.json(); // Wait for the JSON to parse
      console.log("Order:", data);
      console.log("order_id:",data.order_id);
      window.location.href = `https://rzp.io/rzp/vlsiugyan?order_id=${data.order_id}`
      // Redirect to payment page with the order details from Django
      // window.location.href = `/payment?order_id=${data.order_id}`;
    } else {
      console.log("Error saving details");
    }
  };

  return (
    <div className="Register_body">
    <form onSubmit={handleSubmit}>
    <h1 className="heading">Registration form</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default PaymentForm;
