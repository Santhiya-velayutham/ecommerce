import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { term: "", category: "" },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload; 
    },
    clearSearchTerm: (state) => {
      state.term = "";
    },
    clearCategory: (state) => {
      state.category = "";
    },
  },
});

export const { setSearchTerm, setCategory, clearSearchTerm, clearCategory } =
  searchSlice.actions;

export default searchSlice.reducer;