import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { FC, memo } from "react";
import useColorMode from "../../customHooks/useColorMode";
import { darkTheme } from "../../shared/themes";

const DarkModeTogglerButton: FC = () => {
  const { theme, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit">
      {theme === darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default memo(DarkModeTogglerButton);
