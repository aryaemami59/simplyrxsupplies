import grey from "@mui/material/colors/grey";
import createTheme from "@mui/material/styles/createTheme";

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
    // white: {
    //   main: "#fff",
    // },
    background: {
      // default: "rgb(230, 241, 252)",
      // default: "rgb(255, 255, 255)",
      // paper: "rgb(230, 241, 252)",
      // paper: "rgb(255, 255, 255)",
    },

    mode: "light",
    // action: {
    //   active: "rgb(230, 241, 252)",
    //   selected: "rgb(230, 241, 252)",
    // },
    primary: {
      main: "#0071dc",
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
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
    // white: {
    //   main: "#fff",
    // },
    background: {
      default: "rgb(21, 32, 43)",
      paper: "rgb(21, 32, 43)",
    },

    mode: "dark",
    primary: {
      main: "#0071dc",
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});
