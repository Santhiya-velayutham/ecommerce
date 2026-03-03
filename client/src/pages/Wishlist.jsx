import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlistSlice";

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist || []);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Your Wishlist</h3>

      {wishlistItems.length === 0 && (
        <div className="alert alert-info text-center">Wishlist is empty</div>
      )}

      <div className="row">
        {wishlistItems.map((item) => (
          <div key={item._id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:8080${item.image}`}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
                alt={item.name}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ₹{item.price}</p>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}