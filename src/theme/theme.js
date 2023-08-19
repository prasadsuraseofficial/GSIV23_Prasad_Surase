import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F25C00", // Orange
    },
    background: {
      default: "#FFFFFF", // White
    },
    text: {
      primary: "#4A4A4A", // Gray
    },
    danger: {
      main: "#CF3721", //red
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F25C00", // Orange
    },
    background: {
      default: "#4A4A4A", // Gray for dark mode background
    },
    text: {
      primary: "#FFFFFF", // White text for dark mode
    },
    danger: {
      main: "#F25C00", //orange
    },
  },
});

export { lightTheme, darkTheme };
