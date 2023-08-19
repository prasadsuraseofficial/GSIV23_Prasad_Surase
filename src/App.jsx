import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Bars } from "react-loader-spinner";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./theme/theme";
import "./App.css";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

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
  const theme = useSelector((state) => state.themeSlice.mode);

  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Suspense
        fallback={
          <StyledSpinnerContainer>
            <Bars />
          </StyledSpinnerContainer>
        }>
        <CssBaseline enableColorScheme />

        {routing}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
