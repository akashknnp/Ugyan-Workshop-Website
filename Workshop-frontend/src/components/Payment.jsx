import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const orderId = query.get("order_id");

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Order ID: {orderId}</p>
      {/* Add your payment logic here */}
    </div>
  );
};

export default PaymentPage;
