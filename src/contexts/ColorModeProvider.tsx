import { ThemeProvider } from "@mui/material/styles"
import type { FC } from "react"
import { createContext, memo, useMemo } from "react"
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme"
import { darkTheme, lightTheme } from "../shared/themes"
import type { PropsWithRequiredChildren } from "../types/tsHelpers"

type Props = PropsWithRequiredChildren

export const ColorModeContext = createContext({
  toggleColorMode: () => {
    /* no-op */
  },
  theme: lightTheme,
})

const ColorModeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorageTheme()
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme(prev => {
          const currentTheme = prev === lightTheme ? darkTheme : lightTheme
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

export default memo<Props>(ColorModeProvider)
