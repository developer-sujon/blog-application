//external import
import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    value: [],
  },
  reducers: {
    setTag(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setTag } = tagsSlice.actions;
export default tagsSlice.reducer;
