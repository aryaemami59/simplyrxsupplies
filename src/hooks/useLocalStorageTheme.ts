import { useState } from "react";

import { darkTheme, lightTheme } from "../shared/themes";

const currentTheme: "dark" | "light" = localStorage.getItem("theme")
  ? (localStorage.getItem("theme") as "dark" | "light")
  : lightTheme.palette.mode;

const currentThemeObject = currentTheme === "light" ? lightTheme : darkTheme;

const useLocalStorageTheme = () => useState(currentThemeObject);

export default useLocalStorageTheme;
