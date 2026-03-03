import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, cancelOrder } from "../features/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>

      {loading && <p>Loading...</p>}

      {orders.map((order) => (
        <div key={order._id} className="card p-3 mb-3 shadow-sm">
          <h5>Total: ₹{order.totalAmount}</h5>
          <p>Status: {order.status}</p>

          {order.status !== "Cancelled" && (
            <button
              className="btn btn-danger"
              onClick={() =>
                dispatch(cancelOrder(order._id))
              }
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}