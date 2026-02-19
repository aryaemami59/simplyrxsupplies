import { useState } from "react"
import { darkTheme, lightTheme } from "../shared/themes.js"

const getCurrentTheme = () => {
  const valueFromStorage = localStorage.getItem("theme")

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

export const useLocalStorageTheme = () => useState(getCurrentTheme)
