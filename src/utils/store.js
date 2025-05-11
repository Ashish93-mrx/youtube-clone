import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import resultSlice from "./resultSlice";
import chatSlice from "./chatSlice";
import themeReducer from "./themeSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    result: resultSlice,
    chat: chatSlice,
    theme: themeReducer,
  },
});

export default store;
