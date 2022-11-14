/// <reference types="react-scripts" />
import "@mui/material/styles";

declare module "@mui/material/styles" {
  type Palette = {
    white: Palette["primary"];
  };
  type PaletteOptions = {
    white: PaletteOptions["primary"];
  };
}

declare module "@mui/material/Button" {
  type ButtonPropsColorOverrides = {
    white: true;
  };
}

declare module "@mui/material/IconButton" {
  type IconButtonPropsColorOverrides = {
    white: true;
  };
}
