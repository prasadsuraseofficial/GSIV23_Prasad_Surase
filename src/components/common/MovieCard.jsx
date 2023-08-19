import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const FALLBACK_MOVIE_IMG =
  "https://media.gettyimages.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=gi&k=20&c=8ClshQC50T-wPj6CPvnPnFq1Er6Fs8fbrreXWehvdgk=";

const MovieCard = ({ title, desc, popularity, poster_path, movieId }) => {
  return (
    <Link to={`movie-details/${movieId}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          borderRadius: "10px",
          width: { sm: "100%", md: "350px" },
        }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            src={
              poster_path
                ? `${import.meta.env.VITE_MOVIEDB_IMG_BASE_URI}/${poster_path}`
                : FALLBACK_MOVIE_IMG
            }
            alt="movie poster"
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography variant="h5" sx={{ fontSize: "120%" }} gutterBottom>
                {title.substring(0, 25)}
              </Typography>
              <Typography variant="div" gutterBottom>
                ({Number(popularity).toFixed(2)})
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {desc
                ? desc.substring(0, 85)
                : "There is no official description available for the above movie"}
              ...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  title: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
  popularity: propTypes.number.isRequired,
  poster_path: propTypes.string,
  movieId: propTypes.number.isRequired,
};

export default MovieCard;
