import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/orderSlice";
import API from "../services/api";
import { useState } from "react";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create Order
      const orderRes = await dispatch(
        createOrder({ items, totalAmount })
      );

      if (orderRes.meta.requestStatus !== "fulfilled") {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const orderData = orderRes.payload;

      // Create Razorpay Order
      const { data } = await API.post("/payment/create-order", {
        amount: totalAmount,
        orderId: orderData._id,
      });

      // Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        handler: async function (response) {
          await API.post("/payment/verify", {
            ...response,
            orderId: orderData._id,
          });
          alert("Payment Successful 🎉");
          window.location.href = "/orders";
        },
        prefill: {
          name: "Your Name",
          email: "user@example.com",
        },
        theme: { color: "#f59e0b" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Payment Failed 😢");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center fw-bold">Checkout</h3>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="fw-bold mb-3">Your Cart</h5>

            {items.length === 0 ? (
              <p className="text-muted text-center">Your cart is empty</p>
            ) : (
              <div className="list-group mb-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">
                        Qty: {item.quantity}
                      </small>
                    </div>
                    <span className="fw-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <hr />

            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold">Total Amount:</span>
              <span className="fw-bold">₹{totalAmount}</span>
            </div>

            <button
              className="btn btn-warning w-100 fw-bold"
              disabled={loading || items.length === 0}
              onClick={handlePayment}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}