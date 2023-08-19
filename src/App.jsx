import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MovieList from "./components/pages/MovieList";
import "./App.css";
import MovieDetails from "./components/pages/MovieDetails";

const routes = [
  {
    path: "/",
    element: <MovieList />,
  },
  {
    path: "/movie-details",
    element: <MovieDetails />,
  },
];

const App = () => {
  const routing = useRoutes(routes);

  return (
    <>
      <CssBaseline enableColorScheme />

      {routing}
    </>
  );
};

export default App;
