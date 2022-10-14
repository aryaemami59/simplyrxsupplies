import { ThemeProvider } from "@mui/material/styles";
import { createContext, FC, memo, ReactNode, useMemo } from "react";
import useLocalStorageTheme from "../customHooks/useLocalStorageTheme";
import { darkTheme, lightTheme } from "../shared/themes";

type Props = {
  children: ReactNode;
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  theme: lightTheme,
});

const ColorModeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorageTheme();
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme(prev => {
          const currentTheme = prev === lightTheme ? darkTheme : lightTheme;
          localStorage.setItem("theme", currentTheme.palette.mode);
          return currentTheme;
        });
      },
      theme,
    }),
    [setTheme, theme]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default memo<Props>(ColorModeProvider);
