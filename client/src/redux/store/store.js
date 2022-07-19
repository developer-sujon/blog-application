//external import
import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categoriesSlice";
import postsSlice from "../features/postsSlice";
import profileSlice from "../features/profileSlice";
import settingSlice from "../features/settingSlice";
import tagsSlice from "../features/tagsSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice,
    tags: tagsSlice,
    categories: categoriesSlice,
    setting: settingSlice,
    profile: profileSlice,
  },
});

export default store;
