import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MovieThumbnail from "../../assets/images/movie_thumbnail.png";
import styled from "@emotion/styled";

// Util function to get movie image URL
const getMovieImg = (posterPath) => {
  return posterPath
    ? `${import.meta.env.VITE_MOVIEDB_IMG_BASE_URI}/${posterPath}`
    : MovieThumbnail;
};

const CardContentRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const MovieCard = ({ title, desc, popularity, poster_path, movieId }) => {
  const truncatedTitle = title.substring(0, 25);
  const truncatedDesc = desc
    ? desc.substring(0, 85)
    : "There is no official description available for the above movie";

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
            src={getMovieImg(poster_path)}
            alt="movie poster"
          />
          <CardContent>
            <CardContentRow>
              <Typography variant="h5" sx={{ fontSize: "120%" }} gutterBottom>
                {truncatedTitle}
              </Typography>
              <Typography variant="div" gutterBottom>
                ({Number(popularity).toFixed(2)})
              </Typography>
            </CardContentRow>
            <Typography variant="body2" color="text.secondary">
              {truncatedDesc}...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  poster_path: PropTypes.string,
  movieId: PropTypes.number.isRequired,
};

export default MovieCard;
