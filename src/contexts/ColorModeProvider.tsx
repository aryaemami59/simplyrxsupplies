import { ThemeProvider } from "@mui/material/styles"
import { createContext, useMemo } from "react"
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme.js"
import { darkTheme, lightTheme } from "../shared/themes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren

export const ColorModeContext = createContext({
  toggleColorMode: () => {
    /* no-op */
  },

  /**
   * @default lightTheme
   */
  theme: lightTheme,
})

export const ColorModeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorageTheme()

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme(previousTheme => {
          const currentTheme =
            previousTheme === lightTheme ? darkTheme : lightTheme

          localStorage.setItem("theme", currentTheme.palette.mode)

          return currentTheme
        })
      },
      theme,
    }),
    [setTheme, theme],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
