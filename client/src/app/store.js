import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import orderReducer from "../features/orderSlice";
import wishlistReducer from "../features/wishlistSlice";
import productReducer from "../features/productSlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    products: productReducer,
  },
});