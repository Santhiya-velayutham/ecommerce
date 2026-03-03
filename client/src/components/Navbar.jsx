import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../features/searchSlice";
import { setSearchTerm } from "../features/searchSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.search.term || "");
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist || []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-warning fs-4" to="/home">
          MyShop
        </Link>

    
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/electronics">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/category/fashion">Fashion</Link></li>
                <li><Link className="dropdown-item" to="/category/shoes">Shoes</Link></li>
                <li><Link className="dropdown-item" to="/category/mobiles">Mobiles</Link></li>
                <li><Link className="dropdown-item" to="/category/watch">Watch</Link></li>
                <li><Link className="dropdown-item" to="/category/laptop">Laptop</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/payment">Payment</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">Manage Products</Link>
            </li>
          </ul>

           <form className="d-flex me-3" onSubmit={e => e.preventDefault()}>
            <input
              type="search"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </form>

          {/* Wishlist & Cart */}
          <div className="d-flex align-items-center gap-3 position-relative">
            <div
              className="position-relative"
              onMouseEnter={() => setShowWishlist(true)}
              onMouseLeave={() => setShowWishlist(false)}
            >
              <Link to="/wishlist" className="text-white text-decoration-none">
                ❤️
                {wishlistItems.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Wishlist dropdown */}
              {showWishlist && (
                <div className="position-absolute bg-white shadow p-2" style={{ minWidth: "200px", right: 0, zIndex: 1000 }}>
                  {wishlistItems.length === 0 ? (
                    <p className="m-0">Wishlist is empty</p>
                  ) : (
                    wishlistItems.map(item => (
                      <div key={item._id} className="d-flex justify-content-between border-bottom py-1">
                        <span>{item.name}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div
              className="position-relative"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
            >
              <Link to="/cart" className="text-white text-decoration-none">
                🛒
                {cartItems.length > 0 && (
                  <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Cart dropdown */}
              {showCart && (
                <div className="position-absolute bg-white shadow p-2" style={{ minWidth: "250px", right: 0, zIndex: 1000 }}>
                  {cartItems.length === 0 ? (
                    <p className="m-0">Cart is empty</p>
                  ) : (
                    cartItems.map(item => (
                      <div key={item._id} className="d-flex justify-content-between border-bottom py-1">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    ))
                  )}
                  {cartItems.length > 0 && (
                    <Link to="/cart" className="btn btn-primary btn-sm mt-2 w-100">
                      Go to Cart
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}