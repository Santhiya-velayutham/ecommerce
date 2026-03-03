import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// --- Safe localStorage read
let parsedUser = null;
try {
  parsedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
} catch (err) {
  parsedUser = null;
}

// --- Login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", formData);

      // Store token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: parsedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;