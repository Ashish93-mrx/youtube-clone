import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: false,
    allVideos: [],
    videoInfo: null,
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
    getVideoInfo: (state, action) => {
      state.videoInfo = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, allVideosList, getVideoInfo } =
  appSlice.actions;
export default appSlice.reducer;
