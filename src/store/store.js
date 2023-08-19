import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../features/movies/moviesSlice";
import themeSlice from "../features/theme/themeSlice";

const store = configureStore({
  reducer: {
    moviesSlice: moviesSlice,
    themeSlice: themeSlice,
  },
});

export default store;
