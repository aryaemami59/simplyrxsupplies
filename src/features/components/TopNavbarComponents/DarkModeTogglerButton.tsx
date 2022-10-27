import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { FC, memo, useMemo } from "react";
import useColorMode from "../../customHooks/useColorMode";
import { darkTheme } from "../../shared/themes";

const DarkModeTogglerButton: FC = () => {
  const { theme, toggleColorMode } = useColorMode();
  const icon = useMemo(
    () => (theme === darkTheme ? <Brightness7Icon /> : <Brightness4Icon />),
    [theme]
  );

  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit">
      {icon}
    </IconButton>
  );
};

export default memo(DarkModeTogglerButton);
