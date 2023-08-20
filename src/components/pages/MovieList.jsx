import MovieCard from "../common/MovieCard";
import Header from "../layout/Header";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { Bars } from "react-loader-spinner";
import debounce from "lodash.debounce";
import { Box, Typography } from "@mui/material";
import NoSearchResults from "./../../assets/images/no_results.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchSearchedMovies,
} from "../../features/movies/moviesSlice";

const InfiniteScrollBox = styled(InfiniteScroll)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  margin: "1rem",
  justifyContent: "center",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  margin: "1rem",
  justifyContent: "center",
}));

const NoSearchResultsBox = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const NoMovies = () => {
  return (
    <NoSearchResultsBox>
      <img
        src={NoSearchResults}
        width="50%"
        alt="No Search Results"
        loading="lazy"
      />
      <Typography variant="h6" color="primary">
        No Matching Search Results Found!
      </Typography>
    </NoSearchResultsBox>
  );
};

const MovieList = () => {
  const dispatch = useDispatch();

  // All Movies
  const movies = useSelector((state) => state.moviesSlice.movies);
  const totalMoviePages = useSelector(
    (state) => state.moviesSlice.totalMoviePages
  );
  const currentPage = useSelector((state) => state.moviesSlice.currentPage);

  // Searched Movies Results
  const searchQuery = useSelector((state) => state.moviesSlice.searchQuery);
  const searchedMovies = useSelector(
    (state) => state.moviesSlice.searchedMovies
  );

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, []);

  const DEBOUNCE_TIMER = 300; //300ms

  const handleSearch = debounce((query) => {
    dispatch(fetchSearchedMovies(query));
  }, DEBOUNCE_TIMER);

  const renderMovies = (moviesArray) => {
    return moviesArray.map((movie, i) => (
      <MovieCard
        title={movie.title}
        desc={movie.overview}
        popularity={movie.popularity}
        poster_path={movie.poster_path}
        movieId={movie.id}
        key={i}
      />
    ));
  };

  const RenderMovieContent = () => {
    // If a search query is present
    if (searchQuery) {
      // If there are search results
      if (searchedMovies.length > 0) {
        return <StyledBox>{renderMovies(searchedMovies)}</StyledBox>;
      } else {
        return <NoMovies />;
      }
    } else {
      return (
        <InfiniteScrollBox
          dataLength={movies.length}
          next={() => dispatch(fetchMovies(currentPage))}
          hasMore={currentPage < totalMoviePages}
          loader={<Bars />}>
          {renderMovies(movies)}
        </InfiniteScrollBox>
      );
    }
  };

  return (
    <>
      <Header isHomePage={true} handleSearch={handleSearch} />
      {RenderMovieContent()}
    </>
  );
};

export default MovieList;
