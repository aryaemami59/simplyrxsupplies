import { common, grey } from "@mui/material/colors"
import type { BreakpointsOptions } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import {
  DARK_MODE_PAPER_BG,
  DARK_MODE_SELECTED_BG,
  LIGHT_MODE_SELECTED_BG,
  MAIN_COLOR,
} from "./styles.js"

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

const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
} as const satisfies BreakpointsOptions

export const lightTheme = createTheme({
  breakpoints,
  colorSchemes: {
    light: true,
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
  breakpoints,
  colorSchemes: {
    dark: true,
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
      primary: common.white,
      secondary: grey[500],
    },
  },
})
