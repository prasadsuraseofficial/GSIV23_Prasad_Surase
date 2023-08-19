import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

const MovieDetails = () => {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState({
    production_companies: [],
  });
  const [movieCasts, setMovieCasts] = useState([]);

  useEffect(() => {
    const fetchMovieAndCasts = async () => {
      try {
        const [movieInfo, castsInfo] = await Promise.all([
          axiosInstance.get(`movie/${movieId}?language=en-US`),
          axiosInstance.get(`/movie/${movieId}/credits?language=en-US`),
        ]);

        setMovieDetails(await movieInfo.data);
        setMovieCasts(await castsInfo.data.cast);
      } catch (error) {
        console.log("error", error);
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
              {movieDetails.title}
            </Typography>

            <Typography variant="subtitle1" component="p">
              {`${new Date(movieDetails.release_date).getFullYear()} | ${
                movieDetails.runtime
              } Minutes | ${movieDetails?.production_companies[0]?.name}`}
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
