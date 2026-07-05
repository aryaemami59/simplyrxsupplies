import type { Theme } from "@mui/material/styles"
import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"
import { darkTheme, lightTheme } from "../shared/themes.js"

/**
 * Resolves the initial MUI theme by reading the value persisted in
 * {@linkcode localStorage} under the `"theme"` key. Falls back to the
 * OS-level `prefers-color-scheme` media query when no stored value exists,
 * and ultimately defaults to {@linkcode lightTheme} when the media query
 * is unavailable.
 *
 * Priority order:
 * 1. Stored value in {@linkcode localStorage} (`"dark"` or `"light"`).
 * 2. OS preference via `window.matchMedia("(prefers-color-scheme: dark)")`.
 * 3. {@linkcode lightTheme} as the final fallback.
 *
 * @returns The resolved {@linkcode Theme} object.
 */
const getCurrentTheme = (): Theme => {
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

/**
 * Initializes and persists the active MUI {@linkcode Theme} in React state.
 * The initial theme is resolved via {@linkcode getCurrentTheme()}. Changes to
 * the theme are written back to {@linkcode localStorage} by
 * {@linkcode ColorModeProvider}.
 *
 * @returns A readonly tuple of the current {@linkcode Theme} and its setter.
 */
export const useLocalStorageTheme = (): readonly [
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>,
] => {
  const [theme, setTheme] = useState(getCurrentTheme)

  return [theme, setTheme] as const
}
