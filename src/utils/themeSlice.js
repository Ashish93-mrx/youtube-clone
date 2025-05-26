import { createSlice } from "@reduxjs/toolkit";

const initailDarkMode = localStorage.getItem('darkMode') === "true";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: initailDarkMode,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode); 
    },
    // setTheme: (state, action) => {
    //   state.darkMode = action.payload;
    //   localStorage.setItem("darkMode", action.payload);
    // },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
