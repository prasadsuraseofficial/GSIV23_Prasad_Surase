import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import minutesToHHMM from "../../utils/minutesToHHMM";
import { useDispatch, useSelector } from "react-redux";
import {
  setMovieCasts,
  setMovieDetails,
} from "../../features/movies/moviesSlice";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const movieDetails = useSelector((state) => state.moviesSlice.movieDetails);
  const movieCasts = useSelector((state) => state.moviesSlice.movieCasts);

  useEffect(() => {
    const fetchMovieAndCasts = async () => {
      try {
        const [movieInfo, castsInfo] = await Promise.all([
          axiosInstance.get(`movie/${movieId}?language=en-US`),
          axiosInstance.get(`/movie/${movieId}/credits?language=en-US`),
        ]);

        dispatch(setMovieDetails(await movieInfo.data));
        dispatch(setMovieCasts(await castsInfo.data.cast));
      } catch (error) {
        console.error("error while fetching movie & casts", error);
      }
    };

    fetchMovieAndCasts();
  }, [movieId]);

  const FALLBACK_MOVIE_IMG =
    "https://media.gettyimages.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=gi&k=20&c=8ClshQC50T-wPj6CPvnPnFq1Er6Fs8fbrreXWehvdgk=";

  return (
    <>
      <Header isHomePage={false} />

      <Box sx={{ display: "flex", margin: "1rem" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={
            movieDetails.poster_path
              ? `${import.meta.env.VITE_MOVIEDB_IMG_BASE_URI}/${
                  movieDetails.poster_path
                }`
              : FALLBACK_MOVIE_IMG
          }
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
              ).getFullYear()} | ${minutesToHHMM(movieDetails.runtime)} | ${
                movieDetails?.production_companies[0]?.name
              }`}
            </Typography>

            <Box>
              Casts:
              {movieCasts.slice(0, 3).map((cast, i) => {
                return (
                  <Typography variant="subtitle1" component="span" key={i}>
                    {` ${cast.original_name},`}
                  </Typography>
                );
              })}
            </Box>

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
