import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

/* ================= CREATE ORDER ================= */

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/orders", orderData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Order Failed"
      );
    }
  }
);

/* ================= GET MY ORDERS ================= */

export const getMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/orders/myorders");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch Failed"
      );
    }
  }
);

/* ================= CANCEL ORDER ================= */

export const cancelOrder = createAsyncThunk(
  "order/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/orders/${orderId}/cancel`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Cancel Failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* CREATE ORDER */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET MY ORDERS */
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      /* CANCEL ORDER */
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export default orderSlice.reducer;