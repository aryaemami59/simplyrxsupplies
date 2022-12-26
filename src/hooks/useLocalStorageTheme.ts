import { useState } from "react";
import { darkTheme, lightTheme } from "../shared/themes";

const currentTheme: "dark" | "light" = localStorage.getItem("theme")
  ? (localStorage.getItem("theme") as "dark" | "light")
  : lightTheme.palette.mode;

const currentThemeObj = currentTheme === "light" ? lightTheme : darkTheme;

const useLocalStorageTheme = () => useState(currentThemeObj);

export default useLocalStorageTheme;
