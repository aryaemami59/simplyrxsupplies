import { useState } from "react"
import { darkTheme, lightTheme } from "../shared/themes"

const getCurrentTheme = () => {
  const valueFromStorage = localStorage.getItem("theme")

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const preferredMode = window?.matchMedia?.("(prefers-color-scheme: dark)")
    .matches
    ? darkTheme
    : lightTheme
  switch (valueFromStorage) {
    case null: {
      return preferredMode
    }
    case "light": {
      return lightTheme
    }
    case "dark": {
      return darkTheme
    }
    default: {
      return lightTheme
    }
  }
}

export const useLocalStorageTheme = () => useState(getCurrentTheme)
