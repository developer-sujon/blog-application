//external import
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    value: [],
  },
  reducers: {
    setPost(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setPost } = postsSlice.actions;
export default postsSlice.reducer;
