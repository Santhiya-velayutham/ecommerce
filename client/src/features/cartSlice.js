import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
   addToCart: (state, action) => {
  const id = action.payload._id || action.payload.id;
  const existing = state.items.find(item => item._id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.items.push({ ...action.payload, _id: id, quantity: 1 });
  }
},
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;