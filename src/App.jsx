import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Bars } from "react-loader-spinner";
import "./App.css";
import styled from "@emotion/styled";

const MovieList = lazy(() => import("./components/pages/MovieList"));
const MovieDetails = lazy(() => import("./components/pages/MovieDetails"));

const routes = [
  {
    path: "/",
    element: <MovieList />,
  },
  {
    path: "/movie-details/:movieId",
    element: <MovieDetails />,
  },
];

const StyledSpinnerContainer = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <StyledSpinnerContainer>
          <Bars />
        </StyledSpinnerContainer>
      }>
      <CssBaseline enableColorScheme />

      {routing}
    </Suspense>
  );
};

export default App;
