import MovieCard from "../common/MovieCard";
import Header from "../layout/Header";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import sortedMovies from "./../../utils/sortMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { Bars } from "react-loader-spinner";

const InfiniteScrollBox = styled(InfiniteScroll)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  margin: "1rem",
  justifyContent: "center",
}));

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = () => {
    axiosInstance
      .get(`movie/upcoming?language=en-US&page=${currentPage}`)
      .then((res) => {
        console.log(res.data);

        const sortedMoviesArr = sortedMovies(res.data.results);

        // console.log(sortedMoviesArr, "sorted");

        setTotalPages(res.data.total_pages);
        setMovies((prevMovies) => [...prevMovies, ...sortedMoviesArr]);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(currentPage, totalPages);

  return (
    <>
      <Header isHomePage={true} />

      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          margin: "1rem",
          justifyContent: "center",
        }}> */}
      <InfiniteScrollBox
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={currentPage < totalPages}
        loader={<Bars />}>
        {movies.map((movie, i) => (
          <MovieCard
            title={movie.title}
            desc={movie.overview}
            popularity={movie.popularity}
            poster_path={movie.poster_path}
            key={i}
          />
        ))}
      </InfiniteScrollBox>
      {/* </Box> */}
    </>
  );
};

export default MovieList;
