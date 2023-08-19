import MovieCard from "../common/MovieCard";
import Header from "../layout/Header";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import sortedMovies from "./../../utils/sortMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { Bars } from "react-loader-spinner";
import debounce from "lodash.debounce";
import { Box, Typography } from "@mui/material";
import NoSearchResults from "./../../assets/images/no_results.png";

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

const MovieList = () => {
  // All Movies
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMoviePages, setTotalMoviePages] = useState();

  // Searched Movies Results
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = () => {
    axiosInstance
      .get(
        `movie/upcoming?language=en-US&include_adult=false&page=${currentPage}`
      )
      .then((res) => {
        console.log(res.data);
        const sortedMoviesArr = sortedMovies(res.data.results);

        setTotalMoviePages(res.data.total_pages);
        setMovies((prevMovies) => [...prevMovies, ...sortedMoviesArr]);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = debounce((searchQuery) => {
    setSearchQuery(searchQuery);

    axiosInstance
      .get(
        `/search/movie?query=${searchQuery}&include_adult=false&language=en-US`
      )
      .then((res) => {
        setSearchedMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, 250);

  return (
    <>
      <Header isHomePage={true} handleSearch={handleSearch} />

      {searchedMovies.length > 0 && searchQuery ? (
        <StyledBox>
          {searchedMovies.map((movie, i) => (
            <MovieCard
              title={movie.title}
              desc={movie.overview}
              popularity={movie.popularity}
              poster_path={movie.poster_path}
              movieId={movie.id}
              key={i}
            />
          ))}
        </StyledBox>
      ) : searchedMovies.length === 0 && searchQuery ? (
        <NoSearchResultsBox>
          <img src={NoSearchResults} width="50%" alt="No Search Results" />
          <Typography variant="h6" color="primary">
            No Matching Search Results Found!
          </Typography>
        </NoSearchResultsBox>
      ) : (
        <InfiniteScrollBox
          dataLength={movies.length}
          next={fetchMovies}
          hasMore={currentPage < totalMoviePages}
          loader={<Bars />}>
          {movies.map((movie, i) => (
            <MovieCard
              title={movie.title}
              desc={movie.overview}
              popularity={movie.popularity}
              poster_path={movie.poster_path}
              movieId={movie.id}
              key={i}
            />
          ))}
        </InfiniteScrollBox>
      )}
    </>
  );
};

export default MovieList;
