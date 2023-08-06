import ThemeProvider from "@mui/material/styles/ThemeProvider";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, memo, useMemo } from "react";

import useLocalStorageTheme from "../hooks/useLocalStorageTheme";
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

ColorModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo<Props>(ColorModeProvider);
