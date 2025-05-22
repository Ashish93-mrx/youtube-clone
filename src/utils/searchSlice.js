import { createSlice } from "@reduxjs/toolkit";

const LRU_LIMIT = 10;

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cache: {},
    lruKeys: []
  },

  reducers: {
    cacheResults: (state, action) => {
      const query = Object.keys(action.payload)[0];
      const suggestions = action.payload[query];
      // Object.assign(state, action.payload);

      //if the key is already present then remove it so that we can add at last
      state.lruKeys = state.lruKeys.filter(key => key !== query);
      state.lruKeys.push(query);

      //If over limit remove oldest
      if (state.lruKeys.length > LRU_LIMIT) {
        const oldestKey = state.lruKeys.shift();
        delete state.cache[oldestKey];
      }

      state.cache[query] = suggestions;

    },
  },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;
