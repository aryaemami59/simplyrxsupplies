import { ThemeProvider } from "@mui/material/styles";
import { createContext, FC, memo, ReactNode, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../shared/themes";
import useLocalStorage from "../customHooks/useLocalStorage";

type Props = {
  children: ReactNode;
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  theme: lightTheme,
});

const ColorModeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [val, setVal] = useLocalStorage("theme", theme.palette.mode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme));
        setVal((prev: "dark" | "light") =>
          prev === "light" ? "dark" : "light"
        );
      },
      theme,
    }),
    [setVal, theme]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default memo<Props>(ColorModeProvider);
