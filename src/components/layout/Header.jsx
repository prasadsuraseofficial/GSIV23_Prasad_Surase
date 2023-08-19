import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { NightsStay, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "../../features/theme/themeSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    maxWidth: "90%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
}));

function Header({ isHomePage, handleSearch }) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.themeSlice.mode);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isHomePage ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                fullWidth={true}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Search>
          ) : (
            <Typography variant="h6">Movie Details</Typography>
          )}

          <Box>
            <IconButton onClick={() => dispatch(toggleThemeMode())}>
              {theme === "light" ? <NightsStay /> : <LightMode />}
            </IconButton>

            <Link to="/">
              <IconButton>
                <HomeIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  isHomePage: propTypes.bool.isRequired,
  handleSearch: propTypes.func,
};

export default Header;
