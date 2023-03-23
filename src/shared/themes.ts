import { createTheme } from "@mui/material";
import grey from "@mui/material/colors/grey";

const selectedLightModeBG = "rgb(230, 241, 252)";
const selectedDarkModeBG = "rgb(0, 30, 60)";

export const lightTheme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            backgroundColor: selectedLightModeBG,
          },
        },
      },
    },
  },

  palette: {
    // action: {
    //   active: "rgb(230, 241, 252)",
    //   selected: "rgb(230, 241, 252)",
    // },
    primary: {
      main: "#0071dc",
    },
    // white: {
    //   main: "#fff",
    // },
    background: {
      // default: "rgb(230, 241, 252)",
      // default: "rgb(255, 255, 255)",
      // paper: "rgb(230, 241, 252)",
      // paper: "rgb(255, 255, 255)",
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    mode: "light",
  },
});

export const darkTheme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            backgroundColor: selectedDarkModeBG,
          },
        },
      },
    },
  },
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
