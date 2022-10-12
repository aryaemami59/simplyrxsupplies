import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ColorModeContext, DarkModeContext } from "../../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DarkModeTogglerButton: FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  // const { setDarkTheme, darkTheme } = useContext(DarkModeContext);
  // const [mode, setMode] = useState<'light' | 'dark'>('light');
  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //     },
  //   }),
  //   [],
  // );

  // const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
  //   setDarkTheme(prev => {
  //     !prev
  //       ? localStorage.setItem("theme", (!prev).toString())
  //       : localStorage.removeItem("theme");
  //     return !prev;
  //   });
  // }, [setDarkTheme]);

  // const inverse = darkTheme ? true : false;

  return (
    <IconButton
      // sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit">
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
    // <Button
    //   onClick={colorMode.toggleColorMode}
    //   variant="contained">
    //   <FontAwesomeIcon
    //     size="lg"
    //     pull="right"
    //     key={`FontAwesomeIcon-NavbarComponent`}
    //     icon={faCircleHalfStroke}
    //   />
    // </Button>
  );
};

export default memo(DarkModeTogglerButton);
