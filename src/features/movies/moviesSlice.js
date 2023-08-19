import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  totalMoviePages: 0,
  currentPage: 1,
  searchQuery: "",
  searchedMovies: [],
  movieDetails: { production_companies: [] },
  movieCasts: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
    setTotalMoviePages: (state, action) => {
      state.totalMoviePages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = state.currentPage + action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchedMovies: (state, action) => {
      state.searchedMovies = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setMovieCasts: (state, action) => {
      state.movieCasts = action.payload;
    },
  },
});

export const {
  setMovies,
  setTotalMoviePages,
  setCurrentPage,
  setSearchQuery,
  setSearchedMovies,
  setMovieDetails,
  setMovieCasts,
} = moviesSlice.actions;
export default moviesSlice.reducer;
