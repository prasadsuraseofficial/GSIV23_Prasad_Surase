import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Header from "../layout/Header";

const MovieDetails = () => {
  return (
    <>
      <Header isHomePage={false} />

      <Box sx={{ display: "flex", margin: "1rem" }}>
        <CardMedia
          component="img"
          sx={{ width: 151, height: "100%" }}
          image="https://m.media-amazon.com/images/M/MV5BNzQxNzQxNjk5NV5BMl5BanBnXkFtZTgwNTI4MTU0MzE@._V1_.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              Live From Space
            </Typography>

            <Typography variant="subtitle1" component="p">
              2019 | 75Mins | Director
            </Typography>
            <Typography variant="subtitle1" component="p">
              Cast: Actor 1, Actor 2... N
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              ullam architecto assumenda error nam consectetur atque saepe.
              Dolorum asperiores voluptates error maiores unde enim illo fugiat,
              possimus amet quasi vero in temporibus neque facilis quibusdam
              officia, nisi corporis perspiciatis atque repellat perferendis
              incidunt. Voluptatibus culpa explicabo praesentium excepturi
              molestiae aperiam eum corporis, ex consequuntur tenetur nisi
              deserunt accusantium fuga perferendis! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Similique facilis vel molestiae
              quidem nihistinctio quis labore magni, quia ipsum rerum asperiores
              natus exercitationem saepe temporibus quasi quidem. Recusandae,
              vel doloremque nihil iusto veniam quasi officiis eius repellendus,
              ducimus fugit pariatur?
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
