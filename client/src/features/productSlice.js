import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const { data } = await API.get("/products");
  return data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
  const { data } = await API.post("/products", product);
  return data;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, product }) => {
  const { data } = await API.put(`/products/${id}`, product);
  return data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await API.delete(`/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => { state.loading = false; state.error = "Error fetching products"; })

      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  }
});

export default productSlice.reducer;