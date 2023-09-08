import grey from "@mui/material/colors/grey";
import createTheme from "@mui/material/styles/createTheme";

import {
  DARK_MODE_PAPER_BG,
  DARK_MODE_SELECTED_BG,
  LIGHT_MODE_SELECTED_BG,
  MAIN_COLOR,
  PRIMARY_TEXT,
} from "./styles";

export const lightTheme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            backgroundColor: LIGHT_MODE_SELECTED_BG,
          },
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: MAIN_COLOR,
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
            backgroundColor: DARK_MODE_SELECTED_BG,
          },
        },
      },
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: DARK_MODE_PAPER_BG,
      paper: DARK_MODE_PAPER_BG,
    },
    primary: {
      main: MAIN_COLOR,
    },
    text: {
      primary: PRIMARY_TEXT,
      secondary: grey[500],
    },
  },
});
