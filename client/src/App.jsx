import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import WishlistPage from "./pages/Wishlist";
import Payment from "./pages/Payment";
import ManageProduct from "./pages/ManageProduct";


export default function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/payment" element={<Payment />} /> 
      <Route path="/admin/products" element={<ManageProduct/>} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  ); 
}