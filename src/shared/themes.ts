import grey from "@mui/material/colors/grey"
import { createTheme } from "@mui/material/styles"

import {
  DARK_MODE_PAPER_BG,
  DARK_MODE_SELECTED_BG,
  LIGHT_MODE_SELECTED_BG,
  MAIN_COLOR,
  PRIMARY_TEXT,
} from "./styles"

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
    // mobile: true;
    // tablet: true;
    // laptop: true;
    // desktop: true;
  }
}

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
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
})

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
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
})
