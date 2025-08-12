import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVE_CHAT } from "../utils/constants";

const chartSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    addMessage: (state, action) => {
      if (state.message.length >= OFFSET_LIVE_CHAT) {
        state.message.shift(); 
      }
      state.message.push(action.payload); 
    },
    resetMessage: (state) => {
      state.message = [];
    }
  },
});

export const { addMessage, resetMessage } = chartSlice.actions;
export default chartSlice.reducer;
