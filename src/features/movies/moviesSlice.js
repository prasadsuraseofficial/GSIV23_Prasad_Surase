import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";
import sortedMovies from "../../utils/sortMovies";

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
  extraReducers: (builder) => {
    builder.addCase(
      fetchMovies.fulfilled,
      (state, action) => {
        state.movies = action.payload.sortedMoviesArray;
        state.totalMoviePages = action.payload.totalPages;
        state.currentPage += 1;
      },
      builder.addCase(fetchMovieAndCasts.fulfilled, (state, action) => {
        state.movieDetails = action.payload.movieDetails;
        state.movieCasts = action.payload.casts;
      })
    );
  },
});

// thunks for api calls & async operations

const fetchMovieAndCasts = createAsyncThunk(
  "movies/fetchMovieAndCasts",
  async (movieId) => {
    try {
      const [movieInfo, castsInfo] = await Promise.all([
        axiosInstance.get(`movie/${movieId}?language=en-US`),
        axiosInstance.get(`/movie/${movieId}/credits?language=en-US`),
      ]);

      return {
        movieDetails: await movieInfo.data,
        casts: await castsInfo.data.cast,
      };
    } catch (error) {
      console.error("error while fetching movie & casts", error);
    }
  }
);

const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (currentPage) => {
    try {
      const url = `movie/upcoming?language=en-US&include_adult=false&page=${currentPage}`;
      const res = await axiosInstance.get(url);
      const sortedMoviesArray = sortedMovies(res.data.results);
      const totalPages = res.data.total_pages;
      return { sortedMoviesArray, totalPages };
    } catch (err) {
      console.error(err);
    }
  }
);

const fetchSearchedMovies = createAsyncThunk(
  "movies/fetchSearchedMovies",
  async (query, thunkAPI) => {
    try {
      const url = `/search/movie?query=${query}&include_adult=false&language=en-US`;
      // using thunkAPI for synchronously updating the searchQuery first before calling api
      thunkAPI.dispatch(setSearchQuery(query));
      const res = await axiosInstance.get(url);
      thunkAPI.dispatch(setSearchedMovies(res.data.results));
    } catch (err) {
      console.error(err);
    }
  }
);

export const {
  setMovies,
  setTotalMoviePages,
  setCurrentPage,
  setSearchQuery,
  setSearchedMovies,
  setMovieDetails,
  setMovieCasts,
} = moviesSlice.actions;
export { fetchMovieAndCasts, fetchMovies, fetchSearchedMovies };
export default moviesSlice.reducer;
