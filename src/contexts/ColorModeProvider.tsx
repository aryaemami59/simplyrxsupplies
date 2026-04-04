import { ThemeProvider } from "@mui/material/styles"
import { createContext, useMemo } from "react"
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme.js"
import { darkTheme, lightTheme } from "../shared/themes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren

export const ColorModeContext = createContext({
  /**
   * @default lightTheme
   */
  theme: lightTheme,

  toggleColorMode: () => {
    /* no-op */
  },
})

export const ColorModeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorageTheme()

  const colorMode = useMemo(
    () => ({
      theme,
      toggleColorMode: () => {
        setTheme(previousTheme => {
          const currentTheme =
            previousTheme === lightTheme ? darkTheme : lightTheme

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          localStorage?.setItem?.("theme", currentTheme.palette.mode)

          return currentTheme
        })
      },
    }),
    [setTheme, theme],
  )

  return (
    <ColorModeContext value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext>
  )
}
