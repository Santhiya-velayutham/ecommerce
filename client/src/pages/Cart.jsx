import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center fw-bold">Your Shopping Cart</h3>

      {items.length === 0 && (
        <div className="alert alert-info text-center mt-3">
          Your cart is empty
        </div>
      )}

      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={`http://localhost:8080${item.image}`}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
                alt={item.name}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text mb-1">Price: ₹{item.price}</p>
                  <p className="card-text mb-1">Qty: {item.quantity}</p>
                  <p className="card-text fw-bold">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-4 p-3 shadow-sm rounded bg-light d-flex justify-content-between align-items-center">
          <h4>Total: ₹{total}</h4>
          <button
            className="btn btn-success fw-bold"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}