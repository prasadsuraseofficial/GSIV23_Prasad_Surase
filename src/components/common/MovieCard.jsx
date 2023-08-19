import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = () => {
  return (
    <Link to={"movie-details"} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          // width: "350px",
          borderRadius: "10px",
          width: { md: "100%", lg: "350px" },
        }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            src="https://media.gettyimages.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=gi&k=20&c=8ClshQC50T-wPj6CPvnPnFq1Er6Fs8fbrreXWehvdgk="
            alt="lgoo"
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography variant="h5" sx={{ fontSize: "120%" }} gutterBottom>
                MovieCard
              </Typography>
              <Typography variant="div" gutterBottom>
                (Rating)
              </Typography>
            </Box>
            <Typography
              variant="body2"
              //   sx={{ textAlign: "justify" }}
              color="text.secondary">
              Lorem ipsum dolor sit amet elit repellendus, eum! Lorem ips...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default MovieCard;
