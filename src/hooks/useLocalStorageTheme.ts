import type { Theme } from "@mui/material/styles"
import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"
import { darkTheme, lightTheme } from "../shared/themes.js"

const getCurrentTheme = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const valueFromStorage = localStorage?.getItem?.("theme")

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const preferredMode = window?.matchMedia?.("(prefers-color-scheme: dark)")
    .matches
    ? darkTheme
    : lightTheme

  switch (valueFromStorage) {
    case "dark": {
      return darkTheme
    }
    case "light": {
      return lightTheme
    }
    case null: {
      return preferredMode
    }
    default: {
      return lightTheme
    }
  }
}

export const useLocalStorageTheme = (): readonly [
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>,
] => {
  const [theme, setTheme] = useState(getCurrentTheme)

  return [theme, setTheme] as const
}
