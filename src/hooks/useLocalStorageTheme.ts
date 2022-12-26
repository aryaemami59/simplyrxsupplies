import type { Theme } from "@mui/material/styles/createTheme";
import { darkTheme, lightTheme } from "../shared/themes";
import useLocalStorage from "./useLocalStorage";

const currentTheme: "dark" | "light" = localStorage.getItem("theme")
  ? (localStorage.getItem("theme") as "dark" | "light")
  : lightTheme.palette.mode;

const currentThemeObj = currentTheme === "light" ? lightTheme : darkTheme;

const themeObjStr = JSON.stringify(currentThemeObj);

const useLocalStorageTheme = () => useLocalStorage<Theme>("theme", themeObjStr);
// const useLocalStorageTheme = () => useState(currentThemeObj);

export default useLocalStorageTheme;
