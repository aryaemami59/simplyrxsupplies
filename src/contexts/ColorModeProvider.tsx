import type { Theme } from "@mui/material/styles"
import { ThemeProvider } from "@mui/material/styles"
import { createContext, useMemo } from "react"
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme.js"
import { darkTheme, lightTheme } from "../shared/themes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren

export type ColorModeContextType = {
  /**
   * The currently active MUI theme. Defaults to {@linkcode lightTheme} when no
   * preference has been stored.
   *
   * @default lightTheme
   */
  theme: Theme

  /**
   * Toggles the active theme between {@linkcode lightTheme} and
   * {@linkcode darkTheme}, persisting the choice to {@linkcode localStorage}
   * under the `"theme"` key.
   *
   * @default () => {}
   */
  toggleColorMode: () => void
}

/**
 * React context that provides the active MUI theme and a toggle callback to
 * its subtree. The context value is typed via
 * {@linkcode ColorModeContextType}.
 *
 * @see {@linkcode ColorModeContextType}
 */
export const ColorModeContext = createContext<ColorModeContextType>({
  theme: lightTheme,
  toggleColorMode: () => {
    /* no-op */
  },
} satisfies ColorModeContextType)

/**
 * Provides the active MUI theme and a toggle callback via
 * {@linkcode ColorModeContext}. Wraps its children with MUI's
 * {@linkcode ThemeProvider} so that the resolved theme is available to all
 * MUI components in the tree.
 *
 * @param children - The component subtree that will receive the theme context.
 */
export const ColorModeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorageTheme()

  const colorMode = useMemo<ColorModeContextType>(
    () =>
      ({
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
      }) satisfies ColorModeContextType,
    [setTheme, theme],
  )

  return (
    <ColorModeContext value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext>
  )
}
