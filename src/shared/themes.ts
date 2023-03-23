import { createTheme } from "@mui/material";
import grey from "@mui/material/colors/grey";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0071dc",
    },
    // white: {
    //   main: "#fff",
    // },
    background: {
      default: "rgb(255, 255, 255)",
      paper: "rgb(255, 255, 255)",
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#0071dc",
    },
    // white: {
    //   main: "#fff",
    // },
    background: {
      default: "rgb(21, 32, 43)",
      paper: "rgb(21, 32, 43)",
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
    mode: "dark",
  },
});
