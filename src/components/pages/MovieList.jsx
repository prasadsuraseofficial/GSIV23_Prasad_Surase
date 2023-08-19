import { Box } from "@mui/material";
import MovieCard from "../common/MovieCard";
import Header from "../layout/Header";

const MovieList = () => {
  return (
    <>
      <Header isHomePage={true} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          margin: "1rem",
          justifyContent: "center",
        }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <MovieCard key={i} />
        ))}
      </Box>
    </>
  );
};

export default MovieList;
