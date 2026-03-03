import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { addToWishlist } from "../features/wishlistSlice";

export default function ProductCard({ product, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";


  return (
    <div className="card product-card shadow-sm border-0">
      <img
        src={`http://localhost:8080${product.image}`}
        className="card-img-top"
        style={{ height: "200px", objectFit: "contain" }}
        alt={product.name}
      />
      <div className="card-body text-center">
        <h6>{product.name}</h6>
        <p className="fw-bold">₹{product.price}</p>


        {isAdmin ? (
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <button className="btn btn-sm btn-primary" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(product._id)}>
              Delete
            </button>
          </div>
        ) : (

          <div className="d-flex justify-content-center gap-2">
           <button
  className="btn btn-sm btn-outline-primary"
  onClick={() => {
    console.log("Adding to cart:", product);
    dispatch(addToCart(product));
  }}
>
  Add to Cart
</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(addToWishlist(product))}>
              ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}