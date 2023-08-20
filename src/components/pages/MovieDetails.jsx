import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import minutesToHHMM from "../../utils/minutesToHHMM";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieAndCasts } from "../../features/movies/moviesSlice";
import MovieThumbnail from "../../assets/images/movie_thumbnail.png";

// Util function to get movie image URL
const getMovieImg = (posterPath) => {
  return posterPath
    ? `${import.meta.env.VITE_MOVIEDB_IMG_BASE_URI}/${posterPath}`
    : MovieThumbnail;
};

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const movieDetails = useSelector((state) => state.moviesSlice.movieDetails);
  const movieCasts = useSelector((state) => state.moviesSlice.movieCasts);

  useEffect(() => {
    dispatch(fetchMovieAndCasts(movieId));
  }, [movieId, dispatch]);

  const renderCasts = movieCasts.slice(0, 3).map((cast, i) => (
    <Typography variant="subtitle1" component="span" key={i}>
      {` ${cast.original_name},`}
    </Typography>
  ));

  return (
    <>
      <Header isHomePage={false} />

      <Box sx={{ display: "flex", margin: "1rem" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={getMovieImg(movieDetails.poster_path)}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography component="div" variant="h6">
              {`${movieDetails.title} (${Number(
                movieDetails.popularity
              ).toFixed(2)})`}
            </Typography>

            <Typography variant="subtitle1" component="p">
              {`${new Date(
                movieDetails.release_date
              ).getFullYear()} | ${minutesToHHMM(
                movieDetails.runtime
              )} | Director: ${
                movieDetails?.production_companies[0]?.name || "Unknown"
              }`}
            </Typography>

            <Box>Casts: {renderCasts}</Box>

            <Typography
              variant="subtitle"
              color="text.secondary"
              component="div">
              Description: {movieDetails.overview}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
