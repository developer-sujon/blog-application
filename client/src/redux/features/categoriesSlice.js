//external import
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
  },
  reducers: {
    setCategory(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
