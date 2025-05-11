import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: {
    searchRes: [],
  },
  reducers: {
    addSearchRes: (state, action) => {
      state.searchRes = action.payload;
    },
    removeSearch: (state) => {
      state.searchRes.length = 0;
    },
  },
});

export const { addSearchRes, removeSearch } = resultSlice.actions;

export default resultSlice.reducer;
