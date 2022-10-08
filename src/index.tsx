import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { whyDidYouUpdate } from "why-did-you-update";
import App from "./App";
import "./index.css";
import { store } from "./Redux/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// if (process.env.NODE_ENV !== "production") {
// const { whyDidYouUpdate } = require("why-did-you-update");
// whyDidYouUpdate(React);
// }

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0071dc",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    white: {
      main: "white",
    },
  },
});

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
// whyDidYouUpdate(React);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
