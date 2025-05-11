import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: false,
    allVideos: [],
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    allVideosList: (state, action) => {
      state.allVideos = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, allVideosList } = appSlice.actions;
export default appSlice.reducer;
