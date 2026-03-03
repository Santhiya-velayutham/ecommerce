import API from "../services/api";

export default function Payment() {

  const handlePayment = async () => {
    try {
      const { data } = await API.post("/payment/create-order", {
        amount: 500,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "MyShop",
        description: "Test Payment",
        order_id: data.id,

        handler: async function (response) {
          await API.post("/payment/verify", response);
          alert("Payment Successful!");
        },

        theme: { color: "#ffc107" },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      alert("Payment failed");
    }
  };

  return (
    <div className="container py-5 text-center">
      <div className="card p-5 shadow border-0 rounded-4">
        <h3 className="mb-4">Secure Payment</h3>
        <p>Total Amount: ₹500</p>

        <button
          onClick={handlePayment}
          className="btn btn-warning px-5"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
}