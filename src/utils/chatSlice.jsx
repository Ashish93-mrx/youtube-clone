import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVE_CHAT } from "../utils/constants";

const chartSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.message.splice(OFFSET_LIVE_CHAT, 1);
      state.message.push(action.payload);
    },
  },
});

export const { addMessage } = chartSlice.actions;
export default chartSlice.reducer;
